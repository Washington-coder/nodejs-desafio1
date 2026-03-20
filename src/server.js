import http from 'http'
import { routes } from './routes.js';
import { json } from './middlewares/json.js';

const server = http.createServer(async (req, res) => {
    const { url, method } = req

    await json(req, res)

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