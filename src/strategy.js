// Interface
class NotImplementedException extends Error {
    constructor(){
        super("Not Implemented Exception")
    }
}

class ICrud{
    create(item){
        throw new NotImplementedException()
    }
    read(query){
        throw new NotImplementedException()
    }
    update(id,item){
        throw new NotImplementedException()
    }
    delete(id){
        throw new NotImplementedException()
    }
}

// Classes a baixo são onde será implementada os métodos 
class MongoDB extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("O item foi salvo no MongoDB")
    }
    read(item){
        console.log("Os items do MongoDB estão a seguir")
    }
    update(id,item){
        console.log("O item foi alterado no MongoDB")
    }
    delete(id){
        console.log("O item foi deletado no MongoDB")
    }
}

class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log("O item doi salvo no Postgres")
    }
}

// Classe abstrata de acordo como foi chamada pelo construtor 
class ContextStrategy {
    constructor(strategy){
        this._database = strategy
    }
    create(item){
        return this._database.create(item)
    }
    read(item){
        return this._database.create(item)
    }
    update(id,item){
        return this._database.create(id,item)
    }
    delete(id){
        return this._database.delete(id)
    }
}

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()
contextMongo.delete()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
