const express = require('express');
const router = express.Router();
const Context = require('.././db/strategys/base/contextStrategy')
const MongoDb = require('.././db/strategys/mongodb/mongodb')
const HeroiSchema = require('.././db/strategys/mongodb/schemas/heroisSchema')

const connection = MongoDb.connect()
const context = new Context(new MongoDb(connection, HeroiSchema))
context.isConnected()

router.get('/', async (req, res) => {
    try {
        const data = await context.read()
        res.json(data)
    } catch (error) {
        console.error(err);
        res.status(500).send('Erro ao buscar dados!');
    }
})

module.exports = router;