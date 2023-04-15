const ICrud = require('./interfaces/InterfaceCrud')
class Postgres extends ICrud{
    constructor(){
        super()
    }
    isConnected(){
        
    }
    create(item){
        console.log("O item foi salvo no Postgres")
    }
    read(item){
        console.log("Os items do Postgres estão a seguir")
    }
    update(id,item){
        console.log("O item foi alterado no Postgres")
    }
    delete(id){
        console.log("O item foi deletado no Postgres")
    }
}

module.exports = Postgres