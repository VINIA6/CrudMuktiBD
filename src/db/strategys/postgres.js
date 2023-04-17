const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')
class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('Fail!', error)
            return false
        }
    }

    async defineModel() {
        this._herois = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.INTEGER,
                required: true
            },
            poder: {
                type: Sequelize.INTEGER,
                required: true
            }
        },
            {
                tableName: 'TB_HEROES',
                freezTableName: false,
                timestamps: false
            })
        await this._herois.sync()
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'vinia6',
            'senha',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel()
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async read(item = {}) {
        return this._herois.findAll({ where: item, raw: true })
    }

    async update(item, id) {
        const result = await this._herois.update({ nome: item.nome, poder: item.poder }, { where: { id: id } })
        return result
    }

    async delete(id) {
        const query = id ? { id: id } : {}
        const result = await this._herois.destroy({ where: query })
        return result
    }
}

module.exports = Postgres