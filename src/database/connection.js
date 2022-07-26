import sql from 'mssql'
import config from '../config'

config()

const dbsetting = {
    user: config.dbUser ,
    password: config.dbPassword, 
    server: config.dbServer,
    database: config.dbDatabase,
    options:{
        encrypt: false,
        trustServerCertificate:true
    }
}

export async function getConnection(){
    try {
        const pool = await sql.connect(dbsetting)
        return pool
    } catch (error) {
        console.error(error)
    }
}

 export {sql}