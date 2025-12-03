/**
 * Modelo de Usuario
 * Autor: Perez Mauro
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        // Si no se especifica, el rol por defecto es 'User'
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    }
})

export default mongoose.model('User', userSchema);