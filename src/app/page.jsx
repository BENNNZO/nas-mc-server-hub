import Server from '@/components/server/Server'
import PageHeader from '@/components/PageHeader'

const SERVERS = [
  {
    containerName: 'mc_goonville',
    displayName: 'Goonville',
    minecraftVersion: '1.5.2',
    serverAddress: 'goonville.benphillips.tech'
  },
  {
    containerName: 'mc_tittletown',
    displayName: 'Tittletown',
    minecraftVersion: '1.21.11',
    serverAddress: 'tittletown.benphillips.tech'
  },
]

export default function Home() {
  return (
    <div className='p-8'>
      <PageHeader />

      <div className="flex flex-col items-center gap-4">
        {SERVERS.map((info, index) => (
          <Server key={index} info={info} />
        ))}
      </div>
    </div>
  )
}
