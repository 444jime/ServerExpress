const getConnection = require('../database/mysql')
const { decode } = require('../utils/token')

class MateriaService{
    async getMaterias(){
        const connection = await getConnection()
        const query = `SELECT Id,
                        Nombre,
                        IdCarrera,
                        FechaAlta,
                        UsuarioAlta
                        FROM materia
                        WHERE FechaBaja IS NULL`
        const result = await connection.query(query)
        return result
    }

    async getMateriasPId(id){
        const connection = await getConnection()
        const query = `SELECT Id,
                        Nombre,
                        IdCarrera,
                        FechaAlta,
                        UsuarioAlta
                        FROM materia
                        WHERE Id = ?
                        AND FechaBaja IS NULL`
        const data = await connection.query(query, id)
        if(!data[0]) {
            const error = new Error(`La materia con id ${id} no existe`)
            error.status = 404
            throw error
        }
        return data
    }

    async postMateria(newMateria, idUsuario){
        const connection = await getConnection()
        
        const checkQuery = `SELECT Id FROM materia WHERE Nombre = ? AND FechaBaja IS NULL`
        const checkResult = await connection.query(checkQuery, [newMateria.nombre])
        if (checkResult[0]) {
            const error = new Error(`Ya existe una materia activa con el nombre "${newMateria.nombre}"`)
            error.status = 400
            throw error
        }

        const query = `INSERT INTO materia 
                        (Nombre, IdCarrera, FechaAlta, UsuarioAlta)
                        VALUES
                        (?, ?, NOW(), ?)`
        
        const valuesQuery = [newMateria.nombre, newMateria.idCarrera, idUsuario]
        const result = await connection.query(query,valuesQuery)
        const newId = result.insertId
        return { newId, ...newMateria }
    }
    
    async putMateria(newMateria, id, token){
        const connection = await getConnection()
        const rol = decode(token)
        const query = `UPDATE materia
                        SET Nombre = ?,
                        IdCarrera = ?,
                        FechaModificacion = NOW(),
                        UsuarioModificacion = ?
                        WHERE Id = ?`
        const valuesQuery = [newMateria.nombre, newMateria.idCarrera, rol.id, id]
        const result = await connection.query(query, valuesQuery)
        if (result.affectedRows === 0) {
            throw new Error("No se encontro la materia para editar")
        }
        return newMateria
    }

    async deleteMateria(id, token){
        const connection = await getConnection()
        const rol = decode(token)
        const query = `UPDATE materia
                        SET FechaBaja = NOW(),
                        UsuarioBaja = ?
                        WHERE Id = ? 
                        AND FechaBaja IS NULL`
        const valuesDelete = [rol.id, id]
        const result = await connection.query(query,valuesDelete)
        if (result.affectedRows === 0) {
            throw new Error("No se encontro la materia")
        }
        return {id, message : "Materia dada de baja"}
    }
}

module.exports = MateriaService