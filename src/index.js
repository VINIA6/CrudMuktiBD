const ContextStrategy = require('./db/strategys/base/contextStrategy')
const MongoDB = require('./db/strategys/mongodb')
const Postgres = require('./db/strategys/postgres')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()
contextMongo.delete()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
