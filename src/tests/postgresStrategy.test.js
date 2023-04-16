const assert = require('assert')
const Postgres = require('../db/strategys/postgres')
const Context = require('../db/strategys/base/contextStrategy')
const { stringify } = require('querystring')

const context = new Context(new Postgres())
const HEROI_CADASTRAR = {
    nome: "Gavião Negro",
    poder: "Flexas"
}

const HEROI_EDITAR = {
    nome: "Naruto",
    poder: "Conversar"
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async ()=>{
        await context.connect()
        await context.create(HEROI_EDITAR)
    })

    it('Connection PostgresSQL  Test', async () => {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('Postgres CREATE Test', async () => {

        const result = await context.create(HEROI_CADASTRAR)
        delete result.id

        assert.deepEqual(result, HEROI_CADASTRAR)

    })
    it('Postgres READ Test', async () => {

        const [result] = await context.read({nome:HEROI_CADASTRAR.nome})
        delete result.id 

        assert.deepEqual(result, HEROI_CADASTRAR)
    })
    it.only('Postgres UPDATE Test', async () => {
        const [dataAtualizar] = await context.read({nome:HEROI_EDITAR.nome})

        const novoItem = {
           ...dataAtualizar,
           nome: 'Goku',
        }
        console.log('Atualizar',dataAtualizar) 
        console.log('NovoItem',novoItem) 
        const result = await context.update(novoItem, dataAtualizar.id)
        console.log(result)
        
        assert.equal(result, 1)
    })
    // it('Postgres DELETE Test', async () => {
    //     const result = await context.delete()
    //     assert.equal(result, true)
    // })

})