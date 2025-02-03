import { Router } from "express";
import { check } from "express-validator";
import { login,register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail, esRoleValido } from "../helpers/db-validator.js";
 
const router = Router();
 
router.post(
    '/login',
    [
        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login
);
 
router.post(
    '/register',
    [
        check('nombre','nombre obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min:6 }),
        check('correo', 'Este no es un correo valido').isEmail(),
        check('correo').custom(existenteEmail),
        check('role').custom(esRoleValido),
        check('phone' , 'El telefono debe tener 8 números').isLength({ min:8, max:8}),
    ],
    register
)
 
export default router;