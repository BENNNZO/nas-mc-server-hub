import { stopServer } from '@/utils/docker'

export async function POST(req, { params }) {
    try {
        const { id } = await params
        
        await stopServer(id)
        
        return Response.json({ ok: true })
    } catch (err) {
        return Response.json({ ok: false, error: err.message }, { status: 500 })
    }
}