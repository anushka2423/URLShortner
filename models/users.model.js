import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL"
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);