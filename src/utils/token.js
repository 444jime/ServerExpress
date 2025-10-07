const jwtoken = require('jsonwebtoken')

function generateToken(data){
    return jwtoken.sign(data,process.env.JWT_SECRET)
}

function getToken(auth){
    if(auth.indexOf('Bearer') == -1){
        const error = new Error("Formato del token invalido")
        error.status = 400
        throw error
    }
    return auth.replace('Bearer ', '')
}

function decode(auth){
    const token = getToken(auth)
    const decode = jwtoken.verify(token, process.env.JWT_SECRET)
    return decode
}

module.exports = {
    getToken,
    generateToken,
    decode
}