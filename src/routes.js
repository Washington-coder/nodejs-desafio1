import { randomUUID } from "crypto"

import { Dadabase } from "./database.js"

const database = new Dadabase()

export const routes = [
    {
        path: '/tasks',
        method: 'POST',
        handler: async (req, res) => {
            const task = {
                id: randomUUID(),
                name: req.body.name,
                description: req.body.description
            }

            await database.insert('tasks', task)

            res.writeHead(201)
            res.end('Criação de usuário')
        }
    },
    {
        path: '/tasks',
        method: 'GET',
        handler: (req, res) => {
            res.end('Lista todas as tarefas existentes')
        }
    },
    {
        path: '/tasks/:id',
        method: 'PUT',
        handler: (req, res) => {
            res.end('Atualiza uma tarefa específica pelo id')
        }
    },
    {
        path: '/tasks/:id',
        method: 'DELETE',
        handler: (req, res) => {
            res.end('Remove uma tarefa específica pelo id')
        }
    },
    {
        path: '/tasks/:id/completea',
        method: 'PATCH',
        handler: (req, res) => {
            res.end('Altera o status da tarefa entre completa e não completa')
        }
    },
]