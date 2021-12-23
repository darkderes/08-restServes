
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

// const{ validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt.JS');
// const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');

const {validarCampos,validarJWT,tieneRole,esAdminRole } = require('../middlewares');


const { esRoleValido,emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[check('id','No es un Id valido').isMongoId(),
check('id').custom( existeUsuarioPorId)
,validarCampos], usuariosPut );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost );

router.delete('/:id',[

 
validarJWT, 
//esAdminRole,  
tieneRole('ADMIN_ROLE','VENTAS_ROLE'),    
check('id','No es un Id valido').isMongoId(),
check('id').custom( existeUsuarioPorId)
,validarCampos]
, usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;