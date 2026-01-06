import { startServer } from '@/utils/docker'

export async function POST(req, { params }) {
    try {
        const { id } = await params
        
        await startServer(id)
        
        return Response.json({ ok: true })
    } catch (err) {
        return Response.json({ ok: false, error: err.message }, { status: 500 })
    }
}