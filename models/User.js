import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Please provide ,name']
    },
    email: {
        type: String,
        required: [true , 'Please provide email']
    },
    password: {
        type: String,
        require : [true]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model('User', UserSchema);
