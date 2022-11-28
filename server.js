const express = require('express')
const mongoose = require('mongoose')
const Entrada = require('./modelos/entrada')
const entradasRouter = require('./rutas/entradas')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://127.0.0.1/proy', { 
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
   const entradas = await Entrada.find()
    res.render('entradas/index', { entradas: entradas})
})

app.use('/entradas', entradasRouter)

app.listen(5000)