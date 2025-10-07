const { decode } = require('../utils/token')
 
function getToken(req,next) {
    const authHeader = req.headers.authorization
        if(!authHeader) {
            const error = new Error('No se encontró el token')
            error.status = 401
            return next(error)
        }
        
        const data = decode(authHeader)
        if (!data) {
            const error = new Error('Token invalido')
            error.status = 401
            return next(error)
        }
        return data
}

function isAdmin() {
    return(req,res,next) => {
        const data = getToken(req,next)
        if (!data) return

        const esAdmin = data.idRol === 1
        if (!esAdmin) {
            const error = new Error('Privilegios insuficientes')
            error.status = 403
            return next(error)
        }

        req.authData = { id: data.id }
        return next()
    } 
}

function isAdminOrCoord() {
    return(req,res,next) => {
        const data = getToken(req,next)
        if (!data) return
        
        const esAdmin = data.idRol === 1
        const esCoord = data.idRol === 2
        if (!esAdmin && !esCoord) {
            const error = new Error('Privilegios insuficientes')
            error.status = 403
            return next(error)
        }
        return next()
    } 
}

function isAdminOrSelf() {
    return(req,res,next) => {
        const data = getToken(req,next)
        if (!data) return
        
        let idAlumnoParam = parseInt(req.params.id)
        if (isNaN(idAlumnoParam)){
            idAlumnoParam = parseInt(req.body.id)
        }

        const esAdmin = data.idRol === 1
        const esAlumnoSelf = data.idRol === 3 && data.id === idAlumnoParam

        if(!esAdmin && !esAlumnoSelf){
            const error = new Error('Privilegios insuficientes')
            error.status = 403
            return next(error)
        }
        return next()
    } 
}

function isAdminCoordOrSelf() {
    return(req,res,next) => {
        const data = getToken(req,next)
        if (!data) return

        let idAlumnoParam = parseInt(req.params.id)
        if (isNaN(idAlumnoParam)){
            idAlumnoParam = parseInt(req.body.id)
        }

        const esAdmin = data.idRol === 1
        const esCoord = data.idRol === 2
        const esAlumnoSelf = data.idRol === 3 && data.id === idAlumnoParam
        if(!esAdmin && !esCoord && !esAlumnoSelf){
            const error = new Error('Privilegios insuficientes')
            error.status = 403
            return next(error)
        }

        return next()
    } 
}

module.exports = {
    isAdmin,
    isAdminOrCoord,
    isAdminOrSelf,
    isAdminCoordOrSelf
}