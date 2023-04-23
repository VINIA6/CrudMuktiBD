const { connection } = require('mongoose')
const ICrud = require('../interfaces/InterfaceCrud')
const Sequelize = require('sequelize')
class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('Fail!', error)
            return false
        }
    }

    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )
        await model.sync()

        return model
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'vinia6',
            'senha',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false, 
                logging:false
            }
        )
        return connection
    }

    
    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._schema.findAll({ where: item, raw: true })
    }

    async update(item, id) {
        const result = await this._schema.update({ nome: item.nome, poder: item.poder }, { where: { id: id } })
        return result
    }

    async delete(id) {
        const query = id ? { id: id } : {}
        const result = await this._schema.destroy({ where: query })
        return result
    }
}

module.exports = Postgres