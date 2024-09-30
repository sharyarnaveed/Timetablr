import { Router } from "express";

import { addprogram, adminsigin, getprogram, logout, timatble } from "../controllers/admin.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { adminverifyjwt } from "../middlewares/adminauth.middleware.js";

const router=Router();



router.route("/addprogram").post(adminverifyjwt,addprogram)
router.route("/getprogramfromdb").get(getprogram)
router.route("/adminlogin").post(adminsigin)
router.route("/adminlogut").post(adminverifyjwt,logout)
router.route("/timetable").post(timatble)
export default router