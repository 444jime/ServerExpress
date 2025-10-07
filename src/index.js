const express = require('express')
const alumnosRouter = require('./routers/alumno.router')
const inscripcionesRouter = require('./routers/inscripciones.router')
const usuariosRouter = require('./routers/usuarios.router')
const materiasRouter = require('./routers/materias.router')
const { errorHandler, logError } = require('./middlewares/error.handler')
require('dotenv').config()

const app = express()

app.use('/usuario', usuariosRouter)
app.use('/alumnos',alumnosRouter)
app.use('/materias', materiasRouter)
app.use('/inscripciones', inscripcionesRouter)

app.use(logError)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`)
}) 
