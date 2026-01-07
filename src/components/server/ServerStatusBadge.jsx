const COLOR_MAP = {
  stopped: 'bg-red-600',
  started: 'bg-green-600',
  loading: 'bg-amber-500',
}

export default function ServerStatusBadge({ status }) {
  const backgroundColor = COLOR_MAP[status]

  return (
    <div className={`rounded-full size-3 ${backgroundColor}`} />
  )
}