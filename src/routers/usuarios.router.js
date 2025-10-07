const express = require('express')
const { login, createUser } = require('../controllers/usuario.controller')
const { validatorHandler } = require('../middlewares/validator.handler')
const { loginSchema, createUserSchema } = require('../schemas/schema')
const { isAdmin } = require('../middlewares/secure')

const usuariosRouter = express.Router() 

usuariosRouter.use(express.json())

usuariosRouter.post('/', 
    isAdmin(),
    validatorHandler(createUserSchema,'body'),
    createUser)

usuariosRouter.post('/login', 
    validatorHandler(loginSchema,'body'),
    login)

module.exports = usuariosRouter