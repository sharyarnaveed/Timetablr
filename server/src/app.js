import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true
    })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ limit: "100kb", extended: true }));
app.use(cookieParser());


// routes import 

import userroutes from "./routes/user.routes.js"
import adminroutes from "./routes/admin.routes.js"


app.use("/api/user",userroutes)
app.use("/api/admin",adminroutes)

export {app}