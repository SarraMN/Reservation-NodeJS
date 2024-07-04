import mongoose from "mongoose";

const salleReunionSchema = new mongoose.Schema({
    numSalle: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model('SalleReunion', salleReunionSchema);

