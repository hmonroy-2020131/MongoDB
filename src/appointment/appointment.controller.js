import Pet from '../pet/pet.model.js';
import Appointment from './appointment.model.js';  

export const saveAppointment = async (req, res) => {
    try {
        const { petId, date, reason, veterinarianName, status = 'pendiente' } = req.body; // Añadir estado con valor por defecto

        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({
                success: false,
                message: 'Mascota no encontrada'
            });
        }

        const appointment = new Appointment({
            pet: pet._id,
            date,
            reason,
            veterinarianName,
            status 
        });

        await appointment.save();

        res.status(200).json({
            success: true,
            appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar la cita',
            error
        });
    }
};

export const getAppointments = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;

    try {
        const appointments = await Appointment.find()
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Appointment.countDocuments();

        res.status(200).json({
            success: true,
            total,
            appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las citas',
            error
        });
    }
};

export const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id).populate('pet');

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la cita',
            error
        });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        await Appointment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Cita eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la cita',
            error
        });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { petId, date, reason, veterinarianName, status } = req.body;

    try {
        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Cita no encontrada'
            });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { pet: petId, date, reason, veterinarianName, status }, // Aquí actualizamos el estado también
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Cita actualizada correctamente',
            appointment: updatedAppointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la cita',
            error
        });
    }
};
