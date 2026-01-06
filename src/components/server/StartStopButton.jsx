export default function StartStopButton({
  handleStart,
  handleStop,
  status,
}) {
  return (
    <button onClick={(status === 'started' && status !== 'loading') ? handleStop() : handleStart()} className='bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md cursor-pointer'>
      {status === 'started' && <img src="/icons/stop.svg" alt="stop icon" className="size-6 invert opacity-75" />}
      {status === 'stopped' && <img src="/icons/play.svg" alt="play icon" className="size-6 invert opacity-75" />}
      {status === 'loading' && <img src="/icons/load.svg" alt="load icon" className="size-6 invert opacity-75" />}
    </button>
  )
}