"use client"

import { useState, useEffect } from "react"
import axios from "axios"

import ServerStatusBadge from "./ServerStatusBadge"
import StartStopButton from "./StartStopButton"
import ServerName from "./ServerName"

export default function Server({ info }) {
  const { containerName, displayName, minecraftVersion } = info

  // ( loading | started | stopped )
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function setInitialStatus() {
      const data = await getStatus(containerName)
      if (data) setStatus(data.Running ? 'started' : 'stopped')
    }

    setInitialStatus()
  }, [setStatus])

  function handleStart() {
    setStatus('loading')

    axios.post(`/api/server/${containerName}/start`)
      .then(async (res) => {
        while (true) {
          const data = await getStatus(containerName)

          if (data?.Running === true) {
            setStatus('started')
            break
          }

          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      })
  }

  function handleStop() {
    setStatus('loading')

    axios.post(`/api/server/${containerName}/stop`)
      .then(async (res) => {
        while (true) {
          const data = await getStatus(containerName)

          if (data?.Running === false) {
            setStatus('stopped')
            break
          }

          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      })
  }

  async function getStatus() {
    try {
      const res = await axios.post(`/api/server/${containerName}/status`)
      return res.data.status
    } catch (err) {
      return null
    }
  }

  return (
    <div className="group flex justify-between items-center gap-4 bg-zinc-900 p-2 border border-zinc-800 rounded-lg max-w-lg w-full">
      <div className="flex gap-2 items-center">
        <ServerName name={displayName} />
        <p className="opacity-0 group-hover:opacity-50 duration-150 italic">version: {minecraftVersion}</p>
      </div>

      <div className="flex gap-4 items-center">
        <ServerStatusBadge status={status} />
        <StartStopButton
          handleStart={handleStart}
          handleStop={handleStop}
          status={status}
        />
      </div>
    </div>
  )
}