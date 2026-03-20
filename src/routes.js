import { randomUUID } from "crypto"

import { Dadabase } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Dadabase()

export const routes = [
    {
        path: buildRoutePath('/tasks'),
        method: 'POST',
        handler: async (req, res) => {
            const task = {
                id: randomUUID(),
                title: req.body.title,
                description: req.body.description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }

            await database.insert('tasks', task)

            res.writeHead(201)
            res.end('Criação de usuário')
        }
    },
    {
        path: buildRoutePath('/tasks'),
        method: 'GET',
        handler: async (req, res) => {
            const tasks = await database.select('tasks')
            res.writeHead(200)
            res.end(JSON.stringify(tasks))
        }
    },
    {
        path: buildRoutePath('/tasks/:id'),
        method: 'PUT',
        handler: async (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            await database.update('tasks', id, { title, description })

            res.writeHead(204).end()
        }
    },
    {
        path: buildRoutePath('/tasks/:id'),
        method: 'DELETE',
        handler: (req, res) => {
            const { id } = req.params

            database.delete('tasks', id)
            res.writeHead(204).end()
        }
    },
    {
        path: buildRoutePath('/tasks/:id/completea'),
        method: 'PATCH',
        handler: (req, res) => {
            const { id } = req.params

            database.update_completea('tasks', id)

            res.writeHead(204).end()
        }
    },
]