"use client"

import axios from "axios"

const SERVERS = [
  {
    name: 'mc_goonville',
  },
  {
    name: 'mc_tittletown',
  }
]

export default function Home() {
  function handleStart(containerName) {
    axios.post(`/api/server/${containerName}/start`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  function handleStop(containerName) {
    axios.post(`/api/server/${containerName}/stop`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  function handleStatus(containerName) {
    axios.post(`/api/server/${containerName}/status`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className='p-8'>
      <h1 className="mt-8 font-semibold text-3xl text-center">Minecraft Server List</h1>

      <div className="flex flex-col gap-4 mt-12">
        {SERVERS.map(server => (
          <div className="flex justify-between items-center gap-4 bg-zinc-900 p-2 border border-zinc-800 rounded-lg">
            <h2 className="bg-zinc-800 px-2 py-1 rounded-md">{server.name}</h2>

            <div className="flex gap-2">
              <button onClick={() => handleStart(server.name)} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
                Start
              </button>

              <button onClick={() => handleStop(server.name)} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
                Stop
              </button>

              <button onClick={() => handleStatus(server.name)} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
                Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
