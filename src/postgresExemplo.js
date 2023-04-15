//npm install sequelize ph-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {

    //Tabela Herois
    const Herois = driver.define('heroes', {
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


    //Sincronizando com tabela Heoris
    await Herois.sync()

    //Realizando consulta
    const result = await Herois.findAll({ raw: true })
    console.log('result', result)
}

main()