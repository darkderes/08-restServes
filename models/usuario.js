const { Schema,model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require:[true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require:[true,'El correo es obligatorio'],
        unique:true
    }
    ,
    password:{
        type: String,
        require:[true,'El contraseña es obligatorio'],
        unique:true
    }
    ,
    img:{
        type: String
    }
    ,
    rol:{
        type: String,
        unique:true,
        enum:['ADMIN_ROLE','USER_ROLE'] 
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }
});

UsuarioSchema.methods.toJSON = function()
{
    const {__v,password,...usuario} = this.toObject();
    return usuario;

}

module.exports = model('Usuario',UsuarioSchema);