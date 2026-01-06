import { AnimatePresence, motion } from "framer-motion"

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
      className={`bg-zinc-800 p-2 rounded-md cursor-pointer duration-150 ${isLoading ? 'scale-95 cursor-progress' : 'hover:bg-zinc-700'}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      title={icon.label}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={icon.src}
        >
          <img src={icon.src} alt={icon.label} className="size-6 invert opacity-75" />
        </motion.div>
      </AnimatePresence>
    </button>
  )
}