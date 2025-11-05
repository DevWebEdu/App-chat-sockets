import mongoose from "mongoose";
import colors from 'colors';

export const dbConnection = async () => {
    try{
        // Al final va el nombre de la bd si no existe en tu cluster se crea sola
        const {connection} = await mongoose.connect(process.env.URL_DB)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.cyan.bold(`MongoDB Conectado en ${url}`))
    }catch(error){
        console.log(colors.bgRed.white.bold(error.message))
        process.exit(1)
    }
}
