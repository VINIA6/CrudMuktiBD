// npm install mongoose
const { default: mongoose } = require('mongoose')
const Mongoose = require('mongoose')

try {
    Mongoose.connect(
        'mongodb://vinia6:senha@localhost:27017/herois',
        { useNewUrlParser: true })
} catch (error) {
    handleError('Falha na conexão', error)
}


const connection = Mongoose.connection
connection.on('open',() => console.log('Database running...'))
    // setTimeout(()=>{
    //     const state = connection.readyState
    //     console.log(state)
    // },1000)

// Modelo de validação
const heoriSchema = new Mongoose.Schema({
    nome:{
        type: String,
        required:true
    },
    poder:{
        type: String,
        required:true
    },
    insertedAt:{
        type: Date,
        default: new Date()
    }
})

const model = mongoose.model('herois',heoriSchema)

async function main() {
    const resultCadastrar = await model.create(
        {
            nome:'Batman',
            poder:'Dinheiro'
        }
    )
    console.log('Result Cadastrar: ',resultCadastrar)

    const listItens = await model.find()
    console.log('Items',listItens)
    
}

main()