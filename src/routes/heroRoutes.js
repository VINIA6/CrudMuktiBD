const express = require('express');
const Context = require('.././db/strategys/base/contextStrategy');
const MongoDb = require('.././db/strategys/mongodb/mongodb');
const HeroiSchema = require('.././db/strategys/mongodb/schemas/heroisSchema');
const { object } = require('joi');
const Joi = require('joi');


const router = express.Router();
const connection = MongoDb.connect();
const context = new Context(new MongoDb(connection, HeroiSchema));
context.isConnected();

function ValidateQuery(query){
    const schema = Joi.object({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
    })

    return schema.validate(query);
}

router.post('/herois', express.json(), async (req, res) => {
    try {
        const data = await context.create(req.body);
        res.json(data);

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

router.get('/:nome', async (req, res) => {
    try {
        const { nome } = req.params

        const data = await context.read({ nome: nome });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados!');
    }
})


router.get('/herois', async (req, res) => {
    try {
        const { skip, limit } = ValidateQuery(req.query);
        const data = await context.read({}, parseInt(skip), parseInt(limit));
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados!');
    }
})

router.put('/herois/:nome', express.json(), async (req, res) => {
    try {
        const { nome } = req.params;
        let data = await context.read({ nome: nome });

        if (!data) {
            throw ('Usuário não encontrado.');
        }

        let dataUpdate = req.body;

        await context.update(data._id, dataUpdate);

        res.send('Atualização feita com sucesso!');

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro na atualização!');
    }
})

router.delete('/herois/:nome',  express.json(), async (req, res) => {
    try {
        const { nome } = req.params;
        await context.delete(nome);
        res.send('Deletado com sucesso!');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar!');
    }
})

module.exports = router;