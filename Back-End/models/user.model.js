import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name must be required'],
        trim: true,
        minlength: [2,'Name must be at least 2 characters'],
        maxlength: [50,'Name must not exceed 50 characters']
    },
    userName: {
        type: String,
        required: [true,'userName must be required'],
        trim:true,
        lowercase: true,
        unique: true,
        ///match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],

    },
    password: {
        type: String,
        required: [true,'Password must be required'],
        minlength: [8,'Password must be at least 8 characters'],
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lasLogin: {
        type: Date,
        default: null,
    },
    assistantName: {
        type: String,
        default: 'Jarvis',
        trim: true
    },
    assistantImage: {
        type: String,
        default: "",
    },
    history: {
        type: [],
    }
},{timestamps: true})


const User = mongoose.model('User',userSchema);
export default User;