const Joi = require('joi')

const id = Joi.number().min(1).required().messages({
    'any.required': 'El id es obligatorio',
    'number.min': 'El id debe ser mayor a {#limit}',
    'number.base': 'El id no debe ser un string'
})

const newId = Joi.any().forbidden().messages({
  'any.unknown': 'No se permite enviar el campo id'
})

const usuarioAlta = Joi.any().forbidden().messages({
  'any.unknown': 'No se permite enviar el campo idRol'
})

const nombre = Joi.string().min(3).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres'
})

const mail = Joi.string().email().required().messages({
    'string.base': 'El mail debe ser un texto',
    'string.email': 'El mail no tiene un formato valido',
    'any.required': 'El mail es obligatorio'
})

const usuario = Joi.string().alphanum().min(3).max(20).required().messages({
    'string.base': 'El usuario debe ser un texto',
    'string.alphanum': 'El usuario solo puede contener letras y numeros',
    'string.min': 'El usuario debe tener al menos {#limit} caracteres',
    'string.max': 'El usuario no puede tener más de {#limit} caracteres',
    'any.required': 'El usuario es obligatorio'
})

const contrasena = Joi.string().min(6).required().messages({
    'string.base': 'La contraseña debe ser un texto',
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'any.required': 'La contraseña es obligatorio'
})

const paramIdSchema = Joi.object({
    id: id.required()
})

const alumnoSchema = Joi.object({
    id: newId,
    nombre : nombre,
    mail : mail,
    usuario : usuario,
    pass : contrasena,
    idRol : usuarioAlta
})

const registrationSchema = Joi.object({
    id: newId,
    idAlumno : id,
    idMateria: id,
    idRol : usuarioAlta
})

const postMateriaSchema = Joi.object({
    id: newId,
    nombre: nombre,
    idCarrera : id
})

const createUserSchema = Joi.object({
    nombre: nombre,
    mail : mail,
    usuario : usuario,
    pass : contrasena,
    rol: id,
    idRol : usuarioAlta
})

const loginSchema = Joi.object({
    usuario : usuario,
    pass : contrasena
})

module.exports = { 
    paramIdSchema,
    alumnoSchema,
    registrationSchema,
    postMateriaSchema,
    createUserSchema,
    loginSchema
}