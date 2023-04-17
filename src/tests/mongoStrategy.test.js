const assert = require('assert')
const MongoDb = require('../db/strategys/mongodb')
const Context = require('../db/strategys/base/contextStrategy')

const context = new Context(new MongoDb())

const HEROI_CADASTRAR = {
    nome: "Gavião Negro",
    poder: "Flexas"
}

const HEROI_EDITAR = {
    nome: "Naruto",
    poder: "Conversar"
}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async ()=>{
        await context.connect()
        // await context.delete()
        // await context.create(HEROI_EDITAR) 
    })

    it('Connection MongoDb Test', async () => {
        const result = await context.isConnected()
        console.log(result)  
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })

})