const Hapi = require('hapi')
const Context = require('./db/strategys/base/contextStrategy')
const MongoDb = require('./db/strategys/mongodb/mongodb')
const HeroiSchema = require('./db/strategys/mongodb/schemas/heroisSchema')
const ContextStrategy = require('./db/strategys/base/contextStrategy')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.server({
    port: 3000,
    host: 'localhost'
});

function mapRoutes(insta,methods) {  
    return methods.map(met => insta[met]())    
}

async function main(){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))
    
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())    
    ])

    await app.start()
    console.log('Servidor rodando na porta ', app.info.port)

    return app
}


module.exports  = main()