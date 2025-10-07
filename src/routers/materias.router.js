const express = require('express')
const { 
    getMaterias, 
    getMateriasPId, 
    postMateria, 
    putMateria, 
    deleteMateria 
} = require('../controllers/materia.controller')
const { validatorHandler } = require('../middlewares/validator.handler')
const { paramIdSchema, postMateriaSchema } = require('../schemas/schema')
const { 
    isAdmin,
    isAdminOrCoord,
} = require('../middlewares/secure')

const materiasRouter = express.Router()

materiasRouter.use(express.json())

materiasRouter.get('/', 
    isAdminOrCoord(),
    getMaterias)

materiasRouter.get('/:id', 
    isAdminOrCoord(),
    validatorHandler(paramIdSchema, 'params'),
    getMateriasPId)

materiasRouter.post('/', 
    isAdmin(),
    validatorHandler(postMateriaSchema, 'body'),
    postMateria)

materiasRouter.put('/:id', 
    isAdmin(),
    validatorHandler(paramIdSchema, 'params'),
    validatorHandler(postMateriaSchema, 'body'),
    putMateria)

materiasRouter.delete('/:id', 
    isAdmin(),
    validatorHandler(paramIdSchema, 'params'),
    deleteMateria)

module.exports = materiasRouter