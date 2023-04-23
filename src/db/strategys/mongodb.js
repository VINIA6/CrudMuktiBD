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
        this._model = null
        this._driver = null
    }

    async isConnected() {
        const state = Status[this._driver.readyState]

        if (state === 'Conectado') return state
        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

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

        const connection =  Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('Database running...'))
        await this.defineModel() 
        
    }

    async defineModel() {
    
        const heroiSchema = new Mongoose.Schema({
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

        Mongoose.models = {}
        this._model =  Mongoose.model('herois', heroiSchema)

    }

    create(item) {    
        return  this._model.create(item)
    }


    async read(item) {
        return await this._model.find(item)
    }

    async update(id, item) {
        return await this._model.updateOne({_id: id},{$set:item})
    }

    async delete(id) {
        return await this._model.deleteOne({ _id:id })
    }
}

module.exports = MongoDB