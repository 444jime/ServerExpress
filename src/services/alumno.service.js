const getConnection = require('../database/mysql')
const { decode } = require('../utils/token')
const bcrypt = require('bcrypt')

class AlumnosService{
    async getAlumnos(){
        const connection = await getConnection()
        const query = `SELECT Id,
                        Nombre,
                        Mail,
                        Usuario,
                        FechaAlta,
                        UsuarioAlta
                        FROM usuario
                        WHERE IdRol = 3
                        AND FechaBaja IS NULL`
        const result = await connection.query(query)
        return result
    }

    async getAlumnosPId(id){
        const connection = await getConnection()
        const query = `SELECT Nombre,
                        Mail,
                        Usuario,
                        FechaAlta,
                        UsuarioAlta
                        FROM usuario
                        WHERE Id = ?
                        AND IdRol = 3`
        const data = await connection.query(query, [id])
        if(!data[0]) {
            const error = new Error(`El alumno con id ${id} no existe`)
            error.status = 404
            throw error
        }
        return data
    }

    async postAlumno(newAlumno,token){
        const connection = await getConnection()
        const hash = await bcrypt.hash(newAlumno.pass, 10)
        const rol = decode(token)
        const query = `INSERT INTO usuario 
                       (Nombre, Mail, Usuario, Contrasena, IdRol, FechaAlta, UsuarioAlta) 
                       VALUES
                       (?, ?, ?, ?, 3, NOW(), ?)`
        const valuesInsert = [newAlumno.nombre, newAlumno.mail, newAlumno.usuario, hash, rol.id]
        const result = await connection.query(query, valuesInsert)
        const newId = result.insertId
        return { message : `Alumno nuevo con id ${newId} creado correctamente` }
    }

    async putAlumno(newAlumno,id, token){
        const connection = await getConnection()
        const hash = await bcrypt.hash(newAlumno.pass, 10)
        const rol = decode(token)
        const query = `UPDATE usuario 
                        SET Nombre = ?,
                        Mail = ?,
                        Usuario = ?,
                        Contrasena = ?,
                        FechaModificacion = NOW(),
                        UsuarioModificacion = ?
                        WHERE Id = ?`

        const valuesUpdate = [newAlumno.nombre, newAlumno.mail, newAlumno.usuario, hash, rol.id, id]
        const result = await connection.query(query, valuesUpdate)
        if (result.affectedRows === 0) {
            throw new Error("No se encontro el alumno para editar")
        }
        return {
            id: id,
            nombre: newAlumno.nombre,
            mail: newAlumno.mail,
            username: newAlumno.username
        }
    }

    async deleteAlumno(id,token){
        const connection = await getConnection()
        const rol = decode(token)
        const query = `UPDATE usuario
                        SET FechaBaja = NOW(),
                        UsuarioBaja = ?
                        WHERE Id = ? 
                        AND FechaBaja IS NULL`
        const valuesDelete = [rol.id, id]
        const result = await connection.query(query,valuesDelete)
        if (result.affectedRows === 0) {
            throw new Error("No se encontro el alumno")
        }
        return { message : `Alumno ${id} dado de baja` }
    }
}

module.exports = AlumnosService