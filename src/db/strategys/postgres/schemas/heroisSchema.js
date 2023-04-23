const Sequelize = require('sequelize')
const HeroiSchema = {
    name:'herois',
    schema: {
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
    options: {

        tableName: 'TB_HEROES',
        freezTableName: false,
        timestamps: false

    }
}

module.exports = HeroiSchema