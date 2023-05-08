const express = require('express')
const routes = require('./routes/heroRoutes')

async function main() {

    const app = express()
    const port = 5050

    app.use('/',routes)
    app.use('/herois',routes)
    app.use('/herois/:id',routes)

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })  

    return app
}

module.exports = main()