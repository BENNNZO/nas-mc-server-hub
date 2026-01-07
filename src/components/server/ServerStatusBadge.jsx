import AnimatedSwap from "../AnimatedSwap"

const COLOR_MAP = {
  stopped: { text: 'text-red-400', border: 'border-red-700', background: 'bg-red-950' },
  started: { text: 'text-green-400', border: 'border-green-700', background: 'bg-green-950' },
  loading: { text: 'text-yellow-400', border: 'border-yellow-700', background: 'bg-yellow-950' },
}

export default function ServerStatusBadge({ status }) {
  const colors = COLOR_MAP[status]

  return (
    <AnimatedSwap swapKey={colors.text}>
      <div className={`px-2 py-1 border rounded-md font-semibold uppercase ${colors.text} ${colors.border} ${colors.background}`}>{status}</div>
    </AnimatedSwap>
  )
}