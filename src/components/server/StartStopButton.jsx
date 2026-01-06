export default function StartStopButton({
  handleStart,
  handleStop,
  status,
}) {
  const isStarted = status === 'started'

  return (
    <button onClick={isStarted ? handleStop() : handleStart()} className='bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md cursor-pointer'>
      {isStarted ? 'Stop' : 'Start'}
    </button>
  )
}