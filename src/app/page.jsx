import Server from '@/components/server/Server'

export const SERVERS = ['mc_goonville', 'mc_tittletown']

export default function Home() {
  return (
    <div className='p-8'>
      <h1 className="mt-8 font-semibold text-3xl text-center">Minecraft Server List</h1>

      <div className="flex flex-col items-center gap-4 mt-12">
        {SERVERS.map((containerName, index) => (
          <Server key={index} containerName={containerName} />
        ))}
      </div>
    </div>
  )
}
