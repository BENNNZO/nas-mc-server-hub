"use client"

import { useState, useEffect } from "react"
import axios from "axios"

import StartStopButton from "./StartStopButton"

export default function Server({ containerName }) {
  // ( loading | started | stopped )
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    async function getInitialStatus() {
      const data = await getStatus(containerName)
      if (data) setStatus(data.Running ? 'started' : 'stopped')
    }

    getInitialStatus()
  }, [])

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
    <div className="flex justify-between items-center gap-4 bg-zinc-900 p-2 border border-zinc-800 rounded-lg">
      <h2 className="bg-zinc-800 px-2 py-1 rounded-md">{containerName}</h2>

      <StartStopButton
        handleStart={handleStart}
        handleStop={handleStop}
        status={status}
      />
    </div>
  )
}