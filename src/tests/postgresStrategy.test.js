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
        await context.delete()
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
    it('Postgres UPDATE Test', async () => {
        const [dataAtualizar] = await context.read({nome:HEROI_EDITAR.nome})

        const novoItem = {
           ...dataAtualizar,
           nome: 'Goku',
        }
        
        const [result] = await context.update(novoItem, dataAtualizar.id)
        const [itemAtualizado] = await context.read({id:novoItem.id})

        //Dess forma eu garanto que a função seja rodada e a mudança verificada
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome,novoItem.nome) 
    })
    it('Postgres DELETE Test', async () => {
        const [remove] = await context.read({})
        const result = await context.delete(remove.id)
        assert.deepEqual(result, 1)
    })

})