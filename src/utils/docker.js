import axios from 'axios'

const docker = axios.create({
    socketPath: process.env.SOCKET_PATH,
    baseURL: 'http://docker'
})

export function startServer(containerName) {
    return docker.post(`/containers/${containerName}/start`)
}

export function stopServer(containerName) {
    return docker.post(`/containers/${containerName}/stop`)
}

export async function getContainerStatus(containerName) {
    const res = await docker.get(`/containers/${containerName}/json`)
    return res.data.State
}