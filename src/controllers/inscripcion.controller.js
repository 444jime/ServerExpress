const InscripcionService = require('../services/inscripcion.service')
const service = new InscripcionService()

async function getMaterias(req,res,next) {
    try {
        const id = req.params.id
        const data = await service.getMaterias(id)
        res.send(data)
    } catch (error) {
        next(error)
    }
}

async function getAlumnos(req,res,next) {
    try {
        const id = req.params.id
        const data = await service.getAlumnos(id)
        res.send(data)
    } catch (error) {
        next(error)
    }
}

async function postInscripcion(req,res,next) {
    try {
        const data = req.body
        const token = req.headers.authorization
        const result = await service.postInscripcion(data,token)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function deleteInscripciones(req,res,next) {
    try {
        const idAlumno= req.params.idAlumno
        const idMateria = req.params.idMateria
        const token = req.headers.authorization
        const result = await service.deleteInscripciones(idAlumno,idMateria, token)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getMaterias,
    getAlumnos,
    postInscripcion,
    deleteInscripciones
}