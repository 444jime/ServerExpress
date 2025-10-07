const AlumnoService = require('../services/alumno.service')
const service = new AlumnoService()

async function getAlumnos(req,res,next) {
    try {
        const alumnos = await service.getAlumnos()
        res.send(alumnos)
    } catch (error){
        next(error)
    }
}

async function getAlumnosPId(req,res,next) {
    try {
        const id = req.params.id
        const alumno = await service.getAlumnosPId(id)
        res.send(alumno)
    } catch (error) {
        next(error)
    }
}

async function postAlumno(req,res,next) {
    try {
        const data = req.body
        const token = req.headers.authorization
        const result = await service.postAlumno(data,token)
        res.send(result)
    } catch (error) {
        next(error)
    }
    
}

async function putAlumno(req,res,next) {
    try {
        const data = req.body
        const id = req.params.id
        const token = req.headers.authorization
        const result = await service.putAlumno(data,id,token)
        res.send(result)
    } catch (error) {
        next(error)
    }    
}

async function deleteAlumno(req,res,next) {
    try {
        const token = req.headers.authorization
        const id = req.params.id
        const result = await service.deleteAlumno(id,token)
        res.send(result)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAlumnos,
    getAlumnosPId,
    postAlumno,
    putAlumno,
    deleteAlumno
}