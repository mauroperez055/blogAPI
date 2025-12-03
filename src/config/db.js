/**
 * Configuración de la conexión a la base de datos MongoDB
 * Autor: Perez Mauro
 */

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado');
    } catch {
        console.error('Error al conectar a MongoDB');
        process.exit(1);
    }
}