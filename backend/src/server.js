const express = require('express')
require('dotenv').config()
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use('/api', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
