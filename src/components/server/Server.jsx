"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function Server({ name }) {
  const [status, setStatus] = useState('fetching')

  useEffect(() => {
    const data = handleStatus(name)
    if (data) setStatus(data.Running ? 'started' : 'stopped')
  }, [])

  function handleStart(containerName) {
    setStatus('starting')
    
    axios.post(`/api/server/${containerName}/start`)
      .then(async (res) => {
        while (true) {
          const data = handleStatus(containerName)
          
          if (data.Running === true) {
            setStatus('started')
            break
          }

          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      })
      .catch(err => console.log(err))
  }

  function handleStop(containerName) {
    axios.post(`/api/server/${containerName}/stop`)
      .then(res => setStatus('stopped'))
      .catch(err => console.log(err))
  }

  function handleStatus(containerName) {
    axios.post(`/api/server/${containerName}/status`)
      .then(res => { return res.data.status })
      .catch(err => console.log(err))
  }

  return (
    <div className="flex justify-between items-center gap-4 bg-zinc-900 p-2 border border-zinc-800 rounded-lg">
      <h2 className="bg-zinc-800 px-2 py-1 rounded-md">{name}</h2>
      <p>{status}</p>

      <div className="flex gap-2">
        <button onClick={() => handleStart(name)} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
          Start
        </button>

        <button onClick={() => handleStop(name)} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
          Stop
        </button>

        <button onClick={() => handleStatus(name)} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
          Status
        </button>
      </div>
    </div>
  )
}