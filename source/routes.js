const express = require('express')
const routes = express.Router()

const teachers = require('./control/teachers.js')
const cursos = require('./control/cursos.js')
const lessons = require('./control/lessons.js')

routes.get('/', cursos.listAll)

routes.get('/teachers', teachers.listThemAll)
routes.post('/teachers', teachers.create)
routes.delete('/teachers/:id', teachers.delete)
routes.put('/teachers/:id', teachers.update)
routes.get('/teachers/:id', teachers.getById)

routes.get('/cursos', cursos.listThemAll)
routes.post('/cursos', cursos.create)
routes.delete('/cursos/:id', cursos.delete)
routes.put('/cursos/:id', cursos.update)
routes.get('/cursos/:id', cursos.getById)

routes.get('/lessons', lessons.listThemAll)
routes.post('/lessons', lessons.create)
routes.delete('/lessons/:id', lessons.delete)
routes.put('/lessons/:id', lessons.update)
routes.get('/lessons/:id', lessons.getById)

module.exports = routes
