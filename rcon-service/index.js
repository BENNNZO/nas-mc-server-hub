import { WebSocketServer } from 'ws'
import { Rcon } from 'rcon-client'

const PORT = process.env.RCON_SERVICE_PORT || 3001

// RCON configuration for each server
// Format: { serverName: { host, port, password } }
const SERVERS = JSON.parse(process.env.RCON_SERVERS || '{}')

// Active RCON connections
const rconConnections = new Map()

// Get or create RCON connection for a server
async function getRconConnection(serverName) {
  if (rconConnections.has(serverName)) {
    const rcon = rconConnections.get(serverName)
    if (rcon.authenticated) {
      return rcon
    }
    // Connection lost, remove it
    rconConnections.delete(serverName)
  }

  const config = SERVERS[serverName]
  if (!config) {
    throw new Error(`Unknown server: ${serverName}`)
  }

  const rcon = new Rcon({
    host: config.host,
    port: config.port,
    password: config.password,
    timeout: 5000
  })

  rcon.on('error', (err) => {
    console.error(`[${serverName}] RCON error:`, err.message)
    rconConnections.delete(serverName)
  })

  rcon.on('end', () => {
    console.log(`[${serverName}] RCON connection closed`)
    rconConnections.delete(serverName)
  })

  await rcon.connect()
  console.log(`[${serverName}] RCON connected`)
  rconConnections.set(serverName, rcon)
  return rcon
}

// WebSocket server
const wss = new WebSocketServer({ port: PORT })

wss.on('connection', (ws) => {
  console.log('Client connected')
  let currentServer = null

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString())

      switch (message.type) {
        case 'connect': {
          // Connect to a specific server's RCON
          const { server } = message
          if (!SERVERS[server]) {
            ws.send(JSON.stringify({
              type: 'error',
              message: `Unknown server: ${server}`
            }))
            return
          }

          try {
            await getRconConnection(server)
            currentServer = server
            ws.send(JSON.stringify({
              type: 'connected',
              server
            }))
          } catch (err) {
            ws.send(JSON.stringify({
              type: 'error',
              message: `Failed to connect to ${server}: ${err.message}`
            }))
          }
          break
        }

        case 'command': {
          // Send a command to the connected server
          const { command } = message
          if (!currentServer) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Not connected to a server. Send a connect message first.'
            }))
            return
          }

          try {
            const rcon = await getRconConnection(currentServer)
            const response = await rcon.send(command)
            ws.send(JSON.stringify({
              type: 'response',
              command,
              response
            }))
          } catch (err) {
            ws.send(JSON.stringify({
              type: 'error',
              message: `Command failed: ${err.message}`
            }))
          }
          break
        }

        case 'disconnect': {
          currentServer = null
          ws.send(JSON.stringify({
            type: 'disconnected'
          }))
          break
        }

        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: `Unknown message type: ${message.type}`
          }))
      }
    } catch (err) {
      ws.send(JSON.stringify({
        type: 'error',
        message: `Invalid message: ${err.message}`
      }))
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log(`RCON WebSocket service running on port ${PORT}`)

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down...')
  for (const [name, rcon] of rconConnections) {
    console.log(`Closing RCON connection to ${name}`)
    await rcon.end()
  }
  wss.close()
  process.exit(0)
})
