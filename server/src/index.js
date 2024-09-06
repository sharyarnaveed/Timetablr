import connectdb from "./database/dbconn.database.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})



connectdb()
.then(()=>
{
    app.listen(process.env.PORT||8000,()=>
    {
        console.log("server is running on", `${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(error, "error in db");

})