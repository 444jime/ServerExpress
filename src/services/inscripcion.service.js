const getConnection = require('../database/mysql')
const { decode } = require('../utils/token')

class InscripcionService{
    async getMaterias(id){
        const connection = await getConnection()

        const checkAlumno = `SELECT Id FROM usuario 
                     WHERE Id = ? 
                     AND IdRol = 3 
                     AND FechaBaja IS NULL`
        const alumnoResult = await connection.query(checkAlumno, [id])
        if (!alumnoResult) {
            const error = new Error(`El alumno con id ${id} no existe o está dado de baja`)
            error.status = 404
            throw error
        }

        const query = `SELECT usuario.Nombre AS NombreAlumno,
                        materia.Nombre AS NombreMateria,
                        inscripcion.FechaAlta AS FechaInscripcion
                        FROM inscripcion
                        INNER JOIN usuario on inscripcion.IdAlumno = usuario.Id 
                        INNER JOIN materia on inscripcion.IdMateria = materia.Id
                        WHERE usuario.Id = ?
                        AND usuario.IdRol = 3
                        AND usuario.FechaBaja IS NULL
                        AND inscripcion.FechaBaja IS NULL`
        const data = await connection.query(query, [id])
        if(!data[0]) {
            const error = new Error(`El alumno con id ${id} no esta inscripto a materias`)
            error.status = 404
            throw error
        }
        return data
    }

    async getAlumnos(id){
        const connection = await getConnection()
        const checkMateria = `SELECT Id FROM materia 
                      WHERE Id = ? 
                      AND FechaBaja IS NULL`
        const materiaResult = await connection.query(checkMateria, [id])
        if (!materiaResult) {
            const error = new Error(`La materia con id ${id} no existe o está dada de baja`)
            error.status = 404
            throw error
        }

        const query = `SELECT materia.Nombre AS NombreMateria,
                        usuario.Nombre AS NombreAlumno,
                        inscripcion.FechaAlta AS FechaInscripcion
                        FROM inscripcion
                        INNER JOIN usuario on inscripcion.IdAlumno = usuario.Id 
                        INNER JOIN materia on inscripcion.IdMateria = materia.Id
                        WHERE materia.Id = ?
                        AND usuario.FechaBaja IS NULL
                        AND inscripcion.FechaBaja IS NULL`
        const data = await connection.query(query, [id])
        if(!data[0]) {
            const error = new Error(`La materia con id ${id} no tiene inscripciones`)
            error.status = 404
            throw error
        }
        return data
    }

    async postInscripcion(newRegistration,token){
        const connection = await getConnection()
        
        const checkMateria = `SELECT Id FROM materia 
                            WHERE Id = ?
                            AND FechaBaja IS NULL`
        const materiaResult = await connection.query(checkMateria, [newRegistration.idMateria])
        if (!materiaResult) {
            const error = new Error(`La materia con id ${newRegistration.idMateria} no existe o está dada de baja`)
            error.status = 404
            throw error
        }

        const checkQuery = `SELECT Id FROM inscripcion 
                            WHERE IdAlumno = ? 
                            AND IdMateria = ? 
                            AND FechaBaja IS NULL`
        const values = [newRegistration.idAlumno, newRegistration.idMateria]
        const checkResult = await connection.query(checkQuery, values)
        if (checkResult) {
            const error = new Error(`El alumno ya está inscripto a esta materia`)
            error.status = 400
            throw error
        }

        const rol = decode(token)
        const query = `INSERT INTO inscripcion 
                        (IdAlumno, IdMateria, FechaAlta, UsuarioAlta) VALUES
                        (?, ?, NOW(), ? )`
        const valuesInsert = [newRegistration.idAlumno, newRegistration.idMateria, rol.id]
        const result = await connection.query(query, valuesInsert)
        const newId = result.insertId
        return { newId, ...newRegistration }
    }
    
    async deleteInscripciones(idAlumno,idMateria,token) {
        const connection = await getConnection()
        const checkAlumno = `SELECT Id FROM usuario 
                     WHERE Id = ? 
                     AND IdRol = 3 
                     AND FechaBaja IS NULL`
        const alumnoResult = await connection.query(checkAlumno, [idAlumno])
        if (!alumnoResult) {
            const error = new Error(`El alumno con id ${idAlumno} no existe o está dado de baja`)
            error.status = 404
            throw error
        }

        const checkMateria = `SELECT Id FROM materia 
                            WHERE Id = ? 
                            AND FechaBaja IS NULL`
        const materiaResult = await connection.query(checkMateria, [idMateria])
        if (!materiaResult) {
            const error = new Error(`La materia con id ${idMateria} no existe o está dada de baja`)
            error.status = 404
            throw error
        }

        const rol = decode(token)
        const query = `UPDATE inscripcion
                        SET FechaBaja = NOW(),
                        UsuarioBaja = ?
                        WHERE IdAlumno = ?
                        AND IdMateria = ?
                        AND FechaBaja IS NULL`
        const valuesQuery = [rol.id, idAlumno, idMateria]
        const result = await connection.query(query, valuesQuery)
        if (result.affectedRows === 0) {
            throw new Error("No se encontró inscripcion activa")
        }
        return { idAlumno, idMateria, message: "Inscripcion dada de baja"
        }
    } 
}

module.exports = InscripcionService