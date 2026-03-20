import http from 'http'

const server = http.createServer((req, res) => {
    res.end('Hello World')
})

const PORT = 3333

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});