import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet, updatePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js"
import { existePetById } from "../helpers/db-validator.js"
import { validarJWT } from "../middlewares/validar-jwt.js"
 
const router = Router();
 
router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    savePet
)
 
router.get("/", getPets)
 
router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    searchPet
)
 
router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deletePet
)

router.put(
    "/:id",
    [
        validarJWT, 
        check("id", "No es un ID válido").isMongoId(), 
        check("id").custom(existePetById), 
        validarCampos 
    ],
    updatePet 
);

 
export default router;