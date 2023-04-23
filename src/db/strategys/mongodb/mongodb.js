const ICrud = require('../interfaces/InterfaceCrud')
const Mongoose = require('mongoose')

const Status = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}

class MongoDB extends ICrud {

    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {
        const state = Status[this._connection.readyState]

        if (state === 'Conectado') return state
        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return Status[this._connection.readyState]
    }

    static connect() {
        try {
            Mongoose.connect(
                'mongodb://vinia6:senha@localhost:27017/herois',
                { useNewUrlParser: true }
            )
        } catch (error) {
            handleError('Falha na conexão', error)
        }

        const connection =  Mongoose.connection
        connection.once('open', () => console.log('Database running...'))
       
        return connection
    }

    

    create(item) {    
        return  this._schema.create(item)
    }


    async read(item) {
        return await this._schema.find(item)
    }

    async update(id, item) {
        return await this._schema.updateOne({_id: id},{$set:item})
    }

    // async delete(id) {
    //     return await this._schema.deleteOne({ _id:id })
    // }
}

module.exports = MongoDB