import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    numSalleId: {
        type: String,
        required: true
    },
    dateDebutReservation: {
        type: Date,
        default: Date.now //optionnel
    },
    dateFinReservation: {
        type: Date,
    },
}, {timestamps: true});

export default mongoose.model('Reservation', reservationSchema);

