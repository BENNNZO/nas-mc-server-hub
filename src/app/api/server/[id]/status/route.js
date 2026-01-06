import { getContainerStatus } from '@/utils/docker'

export async function POST(req, { params }) {
    try {
        const { id } = await params
        
        const status = await getContainerStatus(id)
        
        return Response.json({ ok: true, status })
    } catch (err) {
        return Response.json({ ok: false, error: err.message }, { status: 500 })
    }
}