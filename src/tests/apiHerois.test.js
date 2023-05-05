const assert = require('assert')
const api = require('./../api')
const MongoDB = require('./../db/strategys/mongodb/mongodb')
const Context = require('./../db/strategys/base/contextStrategy')
const HeroiSchema = require('./../db/strategys/mongodb/schemas/heroisSchema')
const { isNull } = require('util')



describe('API Suite de testes', function () {
    this.beforeAll(async ()=>{
        app = await api
    })
    
    it.only('Listar /herois', async () => {
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=0`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode,200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar /herois retornar n registros', async () => {

        const TAMANHO_LIMIT = 3

        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode,200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })
    it('Listar /herois retornar n registros', async () => {

        const TAMANHO_LIMIT = 3

        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode,200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })

    it('Listar /herois retorna um item', async () => {

        const TAMANHO_LIMIT = 1000
        const NOME_DEFAULT = 'Goku'

        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMIT}&nome=${NOME_DEFAULT}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode,200)
        assert.ok(dados[0].nome === NOME_DEFAULT)
    })
    
})