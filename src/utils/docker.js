import axios from 'axios'

const docker = axios.create({
    socketPath: process.env.SOCKET_PATH,
    baseURL: 'http://docker'
})

export function startServer(containerName) {
    docker.post(`/containers/${containerName}/start`)
}

export function stopServer(containerName) {
    docker.post(`/containers/${containerName}/stop`)
}