const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { Query } = require('mongoose');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5,desde = 0} = req.query;
    const query = { estado : true}
    // const usuarios = await Usuario.find({query})
    //     .skip (Number(desde))
    //     .limit(Number(limite));

    //const total = await Usuario.count({query});

    // Estas son dos formas de hacer la misma cosa , pero la funcion no comentada es mucho mas rapida 
    // debido a que las dos funciones de usuarios y total se ejecutan simultaneamente
    
    const [total,usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async (req, res = response) => {

    const{nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    const existeEmail = await Usuario.findOne({ correo });

    if(existeEmail){
        return res.status(400).json({
            msg:'Ese correo ya esta registrado'
        });
    }
    // encripta contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    usuario.save();
    res.json({
        msg: 'post API - usuariosPost',
       usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const {password,google,correo,...resto} = req.body;

    if(password)
    {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put API - usuariosPut',
       usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id,{ estado : false} );

    res.json( usuario );
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}