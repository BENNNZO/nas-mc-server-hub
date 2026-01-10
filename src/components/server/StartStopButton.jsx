import AnimatedSwap from "../AnimatedSwap"

const ICON_MAP = {
  stopped: { src: '/icons/play.svg', label: 'Start server' },
  started: { src: '/icons/stop.svg', label: 'Stop server' },
  loading: { src: '/icons/load.svg', label: 'Loading' },
}

export default function StartStopButton({
  handleStart,
  handleStop,
  status,
}) {
  const isStarted = status === 'started'
  const isLoading = status === 'loading'
  const icon = ICON_MAP[status]

  function handleClick() {
    if (isStarted) {
      handleStop()
    } else {
      handleStart()
    }
  }

  return (
    <button
      className={`p-2 rounded-md cursor-pointer duration-150 ${isLoading ? 'cursor-progress' : 'hover:bg-zinc-700'}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      title={icon.label}
    >
      <AnimatedSwap swapKey={icon.src}>
        <img src={icon.src} alt={icon.label} className="size-6 invert opacity-75" />
      </AnimatedSwap>
    </button>
  )
}