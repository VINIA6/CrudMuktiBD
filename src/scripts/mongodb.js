// docker ps 
// docker exec -it f195b20d7589 mongo -u vinia6 -p senha --authenticationDatabase herois
// db.herois.insert({ nome: 'Flash', poder: 'Velocidade', dataNascimento: '1997-01-01' })
// show collections
// db.herois.find()
// db.herois.find().pretty()

// for (let i=0; i <= 10000; i++) {
//     db.herois.insert({ 
//         nome: `Clone-${i}`, 
//         poder: `Velocidade-${i}`, 
//         dataNascimento: '1997-01-01' 
//     })
// }
// db.herois.count()
// db.herois.findOne()
// db.herois.find().limit(1000).sort({nome:-1})

//create
db.herois.insert({ 
    nome: 'Flash', 
    poder: 'Velocidade', 
    dataNascimento: '1997-01-01' 
})

//read
db.herois.find()

//update
db.herois.find()
db.herois.update({_id:ObjectId("643d3f2ce61e0e13eb05d83f")},
    {nome:'Goku'}
)
db.herois.update({_id:ObjectId("643d4098e61e0e13eb05d840")},
    {$set:{nome:'Lanterna Verde'}}
)
//delete
db.herois.remove({_id:ObjectId("643d3f2ce61e0e13eb05d83f")})