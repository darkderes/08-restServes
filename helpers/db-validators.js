const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(! existeRol )
    {
        throw new Error("El rol no esta registrado en la BDD");
    }
}
const emailExiste = async ( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error('Ese correo ya esta registrado');
    }
}
const existeUsuarioPorId = async ( id ) => {
    const existeUsuario= await Usuario.findById({ id });
    if(!existeUsuario){
        throw new Error('El Id no existe');
    }
}
module.exports = {
    esRoleValido,
   emailExiste,
   existeUsuarioPorId
}