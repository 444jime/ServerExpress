const express = require('express')
const { 
    getAlumnos, 
    getAlumnosPId, 
    postAlumno, 
    putAlumno, 
    deleteAlumno 
} = require('../controllers/alumno.controller')
const { paramIdSchema, alumnoSchema } = require('../schemas/schema')
const { validatorHandler } = require('../middlewares/validator.handler')
const { 
    isAdmin,
    isAdminOrSelf,
    isAdminOrCoord,
    isAdminCoordOrSelf
} = require('../middlewares/secure')

const alumnoRouter = express.Router()

alumnoRouter.use(express.json())

alumnoRouter.get('/', 
    isAdminOrCoord(),
    getAlumnos)

alumnoRouter.get('/:id', 
    isAdminCoordOrSelf(),
    validatorHandler(paramIdSchema, 'params'),
    getAlumnosPId)

alumnoRouter.post('/', 
    isAdmin(),
    validatorHandler(alumnoSchema, 'body'),
    postAlumno)

alumnoRouter.put('/:id',
    isAdminOrSelf(),
    validatorHandler(paramIdSchema, 'params'),
    validatorHandler(alumnoSchema, 'body'),
    putAlumno)

alumnoRouter.delete('/:id', 
    isAdmin(),
    validatorHandler(paramIdSchema, 'params'),
    deleteAlumno)

module.exports = alumnoRouter