const ICrud = require('./interfaces/InterfaceCrud')

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

module.exports = MongoDB