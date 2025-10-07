const express = require('express')
const { 
    getMaterias, 
    getAlumnos, 
    postInscripcion, 
    deleteInscripciones 
} = require('../controllers/inscripcion.controller')
const { paramIdSchema, registrationSchema } = require('../schemas/schema')
const { validatorHandler } = require('../middlewares/validator.handler')
const {
    isAdminOrCoord,
    isAdminOrSelf,
    isAdminCoordOrSelf
} = require('../middlewares/secure')

const inscripcionesRouter = express.Router()

inscripcionesRouter.use(express.json())

inscripcionesRouter.get('/alumnos/:id/materias', 
    isAdminCoordOrSelf(),
    validatorHandler(paramIdSchema, 'params'),
    getMaterias)

inscripcionesRouter.get('/materias/:id/alumnos', 
    isAdminOrCoord(),
    validatorHandler(paramIdSchema, 'params'),
    getAlumnos)

inscripcionesRouter.post('/', 
    isAdminOrSelf(),
    validatorHandler(registrationSchema,'body'),
    postInscripcion)

    inscripcionesRouter.delete('/:idAlumno/:idMateria', 
    isAdminOrSelf(),
    validatorHandler(registrationSchema,'params'),
    deleteInscripciones)
    
module.exports = inscripcionesRouter