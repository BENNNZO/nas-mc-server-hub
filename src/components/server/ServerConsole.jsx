"use client"

import { useState, useRef, useEffect } from "react"

export default function ServerConsole({ serverName }) {
  const [logs, setLogs] = useState([])
  const [input, setInput] = useState('')
  const [connected, setConnected] = useState(false)
  const wsRef = useRef(null)
  const logsEndRef = useRef(null)

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.hostname}:3001`)
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'connect', server: serverName }))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === 'connected') {
        setConnected(true)
        appendConsoleLog({ type: 'system', text: `Connected to ${data.server}` })
      } else if (data.type === 'response') {
        appendConsoleLog({ type: 'response', text: data.response || '(no response)' })
      } else if (data.type === 'error') {
        appendConsoleLog({ type: 'error', text: data.message })
      }
    }

    ws.onclose = () => {
      setConnected(false)
      appendConsoleLog({ type: 'system', text: 'Disconnected' })
    }

    return () => ws.close()
  }, [serverName])

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || !connected) return

    appendConsoleLog({ type: 'command', text: `> ${input}`})
    wsRef.current.send(JSON.stringify({ type: 'command', command: input }))
    setInput('')
  }

  function appendConsoleLog({ type, text }) {
    setLogs(prev => [...prev, { type, text }])
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 max-w-xl w-full">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-zinc-400 text-sm">Console</span>
      </div>

      <div className="bg-black rounded p-2 h-48 overflow-y-auto font-mono text-sm">
        {logs.map((log, i) => (
          <div
            key={i}
            className={
              log.type === 'command' ? 'text-yellow-400' :
              log.type === 'error' ? 'text-red-400' :
              log.type === 'system' ? 'text-zinc-500' :
              'text-green-400'
            }
          >
            {log.text}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={connected ? "Enter command..." : "Connecting..."}
          disabled={!connected}
          className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:border-zinc-600 disabled:opacity-50"
        />
      </form>
    </div>
  )
}
