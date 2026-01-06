export default function StartStopButton({
  handleStart,
  handleStop,
  status,
}) {
  const isStarted = status === 'started'

  return (
    <button onClick={isStarted ? handleStop() : handleStart()} className='bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md cursor-pointer'>
      {isStarted
        ? <img src="/icons/stop.svg" alt="stop icon" className="size-6 invert opacity-75" />
        : <img src="/icons/play.svg" alt="play icon" className="size-6 invert opacity-75" />
      }
    </button>
  )
}