import { Router } from "express";
import { check } from "express-validator";
import { saveAppointment, getAppointments, getAppointmentById, deleteAppointment, updateAppointment } from "./appointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("petId", "No es un ID válido de mascota").isMongoId(),
        check("date", "La fecha es requerida").not().isEmpty(),
        check("reason", "La razón es requerida").not().isEmpty(),
        check("veterinarianName", "El nombre del veterinario es requerido").not().isEmpty(),
        check("status", "El estado es inválido").optional().isIn(['pendiente', 'completada', 'cancelada']),
        validarCampos
    ],
    saveAppointment
);

router.get("/", getAppointments);

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    getAppointmentById
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deleteAppointment
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("petId", "No es un ID válido de mascota").isMongoId(),
        check("date", "La fecha es requerida").not().isEmpty(),
        check("reason", "La razón es requerida").not().isEmpty(),
        check("veterinarianName", "El nombre del veterinario es requerido").not().isEmpty(),
        check("status", "El estado es inválido").optional().isIn(['pendiente', 'completada', 'cancelada']),
        validarCampos
    ],
    updateAppointment
);

export default router;
