const assert = require('assert')
const api = require('./../api')
const MongoDB = require('../db/strategys/mongodb/mongodb')
const Context = require('../db/strategys/base/contextStrategy')
const HeroiSchema = require('./../db/strategys/mongodb/schemas/heroisSchema')



describe('API Suite de testes', function () {
    this.beforeAll(async ()=>{
        app = await api
    })
    
    it('Listar /herois', async () => {
        const result = await app.inject({
            method:'GET',
            url:'/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode,200)
        assert.ok(Array.isArray(dados))
    })
    
})