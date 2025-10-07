const getConnection = require('../database/mysql')
const bcrypt = require('bcrypt')
const { generateToken, decode } = require('../utils/token')

class UsuariosService {
    async login(data){
        const connection = await getConnection()
        const query = `SELECT Id AS id, 
                    Nombre AS nombre,
                    Usuario AS usuario, 
                    Mail, 
                    Contrasena AS pass, 
                    IdRol AS idRol 
                    FROM Usuario 
                    WHERE usuario = ? and 
                    FechaBaja is NULL `
        const result = await connection.query(query,[data.usuario])
        if(result[0]){
            const { id, nombre, usuario, idRol, pass } = result[0]
            return bcrypt.compare(data.pass, pass).then(iguales => {

                if (iguales) {
                    const token = { token: generateToken({ id, nombre, usuario, idRol }) }
                    return { login: true, usuario, ...token }
                    }else {
                        const error = new Error('Datos de login incorrectos')
                        error.status = 401
                        throw error
                    }
                })
        }else {
            const error = new Error('Datos de login incorrectos')
            error.status = 401
            throw error
        }
    }

    async createUser(newUser,token){
        const connection = await getConnection()

        const hash = await bcrypt.hash(newUser.pass, 10)
        const rol = decode(token)
        const insert = `INSERT INTO Usuario 
                        (Nombre, Mail, Usuario, Contrasena, IdRol, FechaAlta, UsuarioAlta) 
                        VALUES
                        (?, ?, ?, ?, ?, NOW(), ?)`
        const valuesInsert = [newUser.nombre, newUser.mail, newUser.usuario, hash, newUser.rol, rol.id]
        const result = await connection.query(insert, valuesInsert)
        const newId = result.insertId;
        return { newId, ...newUser}
    }
}

module.exports = UsuariosService