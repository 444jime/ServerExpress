const InscripcionService = require('../services/materia.service')
const service = new InscripcionService()

async function getMaterias(req,res,next) {
    try {
        const materias = await service.getMaterias()
        res.send(materias)
    } catch (error) {
        next(error)
    }
    
}

async function getMateriasPId(req,res,next) {
    try {
        const id = req.params.id
        const materia = await service.getMateriasPId(id)
        res.send(materia)
    } catch (error) {
        next(error)
    }
}

async function postMateria(req,res,next) {
    try {
        const data = req.body
         const idUsuario = req.authData.id
        const result = await service.postMateria(data,idUsuario)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function putMateria(req,res,next) {
    try {
        const data = req.body
        const id = req.params.id
        const token = req.headers.authorization
        const result = await service.putMateria(data, id, token)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function deleteMateria(req,res,next) {
    try {
        const id = req.params.id
        const token = req.headers.authorization
        const result = await service.deleteMateria(id,token)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getMaterias,
    getMateriasPId,
    postMateria,
    putMateria,
    deleteMateria
}