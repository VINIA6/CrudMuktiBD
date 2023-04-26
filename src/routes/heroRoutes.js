const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
class HeroRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:'/herois',
            method:'GET',
            
            handler:(req,res)=>{

                try {
                    const {skip,limit,nome} = req.query
                    // Validando
                    let query = nome ? { nome:nome } : {}
                    
                    return this.db.read(query,parseInt(skip),parseInt(limit))
                } catch (error) {
                    console.log("Deu ruim", error)
                    return "Error interno no servidor"
                }
                
            },
            // config: {
            //     validate: {
            //         //payload -> bory
            //         //headers -> header
            //         //params -> na URL :id
            //         //query -> ?skip=10
            //         // failAction: (request,headers,erro) => {
            //         //     throw erro;
            //         // },

            //         query:{
            //             skip: Joi.number().integer().default(0),
            //             limit: Joi.number().integer().default(10),
            //             nome: Joi.string().min(3).max(100)
            //         }
            //     }
            // },
        }
    }
}

module.exports = HeroRoutes