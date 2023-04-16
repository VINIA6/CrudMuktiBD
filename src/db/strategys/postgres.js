const ICrud = require('./interfaces/InterfaceCrud')
const Sequelize = require('sequelize')
class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this._connect()
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
        this._herois = driver.define('heroes', {
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
    }

    _connect() {
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
    }

    create(item) {
        console.log("O item foi salvo no Postgres")
    }

    read(item) {
        console.log("Os items do Postgres estão a seguir")
    }

    update(id, item) {
        console.log("O item foi alterado no Postgres")
    }

    delete(id) {
        console.log("O item foi deletado no Postgres")
    }
}

module.exports = Postgres