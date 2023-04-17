const ICrud = require('./interfaces/InterfaceCrud')
const Mongoose = require('mongoose')

const Status = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = Status[this._driver.readyState]

        if (state === 'Conectado') return state
        if (state !== 'Conectando') return state

        // await new Promise(resolve => setTimeout(resolve, 1000))

        return Status[this._driver.readyState]
    }

    async connect() {
        try {
            Mongoose.connect(
                'mongodb://vinia6:senha@localhost:27017/herois',
                { useNewUrlParser: true }
            )
        } catch (error) {
            handleError('Falha na conexão', error)
        }

        const connetion = Mongoose.connection
        this._driver = connetion
        connetion.on('open', () => console.log('Database running...'))
        
    }

    async defineModel() {
        heoriSchema= new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })

        this._herois = mongoose.model('herois', heoriSchema)
    }

    async create(item) {
        const resultCadastrar = await model.create(
            item
        )
        console.log('Result Cadastrar: ', resultCadastrar)
        console.log("O item foi salvo no MongoDB")
    }
    read(item) {
        console.log("Os items do MongoDB estão a seguir")
    }
    update(id, item) {
        console.log("O item foi alterado no MongoDB")
    }
    delete(id) {
        console.log("O item foi deletado no MongoDB")
    }
}

module.exports = MongoDB