import http from 'http'
import { routes } from './routes.js';

const server = http.createServer((req, res) => {
    const { url, method } = req

    const route = routes.find((route) => {
        return route.path === url && route.method === method
    })

    if (route) {
        return route.handler(req, res)
    }

    res.writeHead(404)
    res.end('Rota não encontrada');
})

const PORT = 3333

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});