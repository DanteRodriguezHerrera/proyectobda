const express = require('express')
const Entrada = require('./../modelos/entrada')
const router = express.Router()

router.get('/new', (req, res) =>{
    res.render('entradas/new', {entrada: new Entrada() })
})

router.get('/editar/:id', async (req, res) => {
    const entrada = await Entrada.findOneAndUpdate(req.params.id)
    res.render('entradas/editar', { entrada: entrada})
})

router.get('/:slug', async (req, res) => {
    const entrada = await Entrada.findOne( { slug: req.params.slug })
    if (entrada == null) res.redirect('/')
    res.render('entradas/show', { entrada: entrada})
})

router.post('/', async (req, res, next) => {
   req.entrada = new Entrada()
   next()
    }, guardarArticulo('new'))

router.put('/:id', async (req, res, next) => {
    req.entrada = await Entrada.findById(req.params.id)
    next()
}, guardarArticulo('editar'))

router.delete('/:id', async (req, res) => {
    await Entrada.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function guardarArticulo(path){
    return async (req, res) => {
        let entrada = req.entrada
        entrada.title = req.body.title
        entrada.descripcion = req.body.descripcion
        entrada.markdown = req.body.markdown
        try{
            entrada = await entrada.save()
            res.redirect(`/entradas/${entrada.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, {entrada: entrada })
        }
    }
}

module.exports = router