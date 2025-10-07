const UserService = require('../services/usuario.service')
const service = new UserService()

async function login(req,res,next) {
    try {
        const data = req.body
        const result = await service.login(data)
        res.send(result)
    }catch (error){
        next(error)
    }
}

async function createUser(req,res,next) {
    try {
        const data = req.body
        const token = req.headers.authorization
        const result = await service.createUser(data,token)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    createUser
}