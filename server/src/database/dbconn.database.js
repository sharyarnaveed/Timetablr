import mysql from "mysql2/promise";
import {DATBASE_NAME} from "../constants.js"



const connectdb=async()=>
{
    try {
        const conn=await mysql.createPool({
            host:`${process.env.HOST_NAME}`,
            user:`${process.env.USER}`,
            password:"",
            database:DATBASE_NAME
        })
        // console.log(DATBASE_NAME);
return conn

    } catch (error) {
        console.log("error in connecting db",error);
        throw error
    }
}

export default connectdb