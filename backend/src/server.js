const express = require('express')
const routes = require('./routes.js')
const cors = require('cors')
const app = express()

const port = 3000

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
})
