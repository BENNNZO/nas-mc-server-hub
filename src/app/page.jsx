"use client"

import axios from "axios"

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

  return (
    <div className='p-8'>
      <h1 className="mt-8 font-semibold text-3xl text-center">Minecraft Server List</h1>

      <div className="flex flex-col gap-2 mt-5">
        <button onClick={() => handleStart('mc_goonille')} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
          Start
        </button>

        <button onClick={() => handleStop('mc_goonville')} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
          Stop
        </button>
      </div>
    </div>
  )
}
