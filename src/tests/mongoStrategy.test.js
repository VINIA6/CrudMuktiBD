const assert = require('assert')
const MongoDB = require('../db/strategys/mongodb')
const Context = require('../db/strategys/base/contextStrategy')
const { DELETE } = require('sequelize/types/query-types')

const context = new Context(new MongoDB())

const HEROI_CADASTRAR = {
    nome: "Gavião Negro",
    poder: "Flexas"
}

const HEROI_EDITAR = {
    nome: "Naruto",
    poder: "Conversar"
}
let EDITAR_ID =''

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async ()=>{
        await context.connect()
        // await context.delete()
        // await context.create(HEROI_EDITAR) 
        const result = await context.create(HEROI_CADASTRAR)
        EDITAR_ID = result._id
    })

    it('Connection MongoDb Test', async () => {
        const result = await context.isConnected()  
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })

    it('Mongodb CREATE Test', async ()=>{
        const {nome,poder} = await context.create(HEROI_CADASTRAR)
        assert.deepEqual({nome:nome,poder:poder},HEROI_CADASTRAR)
    })

    it('Mongodb READ Test',async ()=>{
        const [{nome,poder}] = await context.read({nome:HEROI_CADASTRAR.nome})
        assert.deepEqual({nome:nome,poder:poder},HEROI_CADASTRAR)
    })

    it('Mongodb UPDATE Test',async ()=>{
        const result = await context.update(EDITAR_ID,{nome:'Naruto'})
        console.log(result)
        assert.deepEqual(result.modifiedCount,1)
    })

    it('Mongodb DELETE Test', async ()=>{
        const result = await context.delete(EDITAR_ID)
        console.log(result)
        assert.deepEqual(result.n,1)
    })
})