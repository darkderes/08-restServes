const { response } = require("express")

const esAdminRole = (req,res =response,next) => {

    if(!req.usuario){

        return res.status(500).json({
            msg:'Se quiere verifiacr el rol sin validar el token pp¿rimero' 
        });
    }

    const { rol ,nombre } = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
           msg: 'no es administrador'      
        });
    }

    next();
}
const tieneRole= (...roles) => {

    return (req,res =response,next) => {
        
        if(!req.usuario){

            return res.status(500).json({
                msg:'Se quiere verifiacr el rol sin validar el token pp¿rimero' 
            });
        }

        if( !roles.includes( req.usuario.rol ))
        {
            return res.status(401).json({
                msg: 'El servicio requiere uno de estos roles soportados para borrar' 
            })
        }
        next();
    }

}




module.exports = {
    esAdminRole,tieneRole
}