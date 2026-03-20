import { table } from 'node:console'
import { readFile, writeFile } from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Dadabase {
    #database = {}

    constructor() {
        this.#load()
    }

    async #load() {
        try {
            const data = await readFile(databasePath, 'utf-8')
            this.#database = JSON.parse(data)
        } catch {
            this.#database = {} // Garante que começa como objeto se o arquivo não existir
            await this.#persist()
        }
    }

    async #persist() {
        await writeFile(databasePath, JSON.stringify(this.#database))
    }

    async insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            // Se a tabela já existe (é um array), adiciona o item
            this.#database[table].push(data)
        } else {
            // Se não existe, cria a chave da tabela e coloca o primeiro item num array
            this.#database[table] = [data]
        }

        await this.#persist()
    }

    select(table) {
        this.#load()
        return this.#database[table] ?? []
    }

    async update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            await this.#persist()
        }
    }

    async update_completea(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            const currentData = this.#database[table][rowIndex]
            const completed_at = new Date()

            this.#database[table][rowIndex] = {
                ...currentData,
                completed_at,
                id
            }
            await this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}