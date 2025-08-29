import mysql, {Pool} from 'mysql2/promise'
import dotenv from 'dotenv'
import appConf from "../../app-config/app-config.json";

export interface AppConfig {
    port:number,
    skipRoutes:string[],
    pathRoles: Record<string, string[]>,
    checkIdRoutes:string[],
    pool: Pool,
    mongoUri:string,
    jwt:{
        secret:string,
        exp:string|number
    }

}
//export const PORT=3500;
//export const MONGO_URI = 'mongodb+srv://konspirin:lEUH2CDZKqCvxdCx@cluster0.chmbb0u.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0'
dotenv.config();

export const configuration:AppConfig = {
    ...appConf,
    pool: mysql.createPool({
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }),
    mongoUri: process.env.MONGO_URI || "dev db address",
    jwt:{
        secret: process.env.JWT_SECRET || "super-secret",
        exp: process.env.JWT_EXP || "1h"
    }
}


