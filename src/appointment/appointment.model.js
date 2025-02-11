import { Schema, model } from "mongoose";

const AppointmentSchema = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    veterinarianName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'completada', 'cancelada'],
        default: 'pendiente',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Appointment', AppointmentSchema);
