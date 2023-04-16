const assert = require('assert')
const Postgres = require('../db/strategys/postgres')
const Context = require('../db/strategys/base/contextStrategy')

const context = new Context(new Postgres())


describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    it('PostgresSQL Connection Test',async ()=>{
        const result = await context.isConnected()
        assert.equal(result,true)
    })
    
})