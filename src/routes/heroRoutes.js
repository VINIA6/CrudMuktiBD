const express = require('express');
const Context = require('.././db/strategys/base/contextStrategy');
const MongoDb = require('.././db/strategys/mongodb/mongodb');
const HeroiSchema = require('.././db/strategys/mongodb/schemas/heroisSchema');


const router = express.Router();
const connection = MongoDb.connect();
const context = new Context(new MongoDb(connection, HeroiSchema));
context.isConnected();


router.post('/herois',express.json() ,async (req, res) => {
    try {
        
        const data = await context.create(req.body)
        res.json(data)

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no cadastro.');
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await context.read();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados!');
    }
})


router.get('/herois', async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const data = await context.read({}, parseInt(skip), parseInt(limit));
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados!');
    }
})

// router.post('/herois/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         let data = await context.read({ nome: id });

//         if (!data) {
//             res.status(404).send('Usuário não encontrado.');
//             return;
//         }

//         console.log(data)

//         let data_update = req.body;

//         console.log(data_update);

//         // res.send(data_update);

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Erro na atualização do dado!');
//     }
// })

module.exports = router;