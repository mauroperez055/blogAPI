/**
 * Modelo de Blog
 * Autor: Perez Mauro
 */

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        // Hace referencia al modelo User
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

export default mongoose.model('Blog', blogSchema);