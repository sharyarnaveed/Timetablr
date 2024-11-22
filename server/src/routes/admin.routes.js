import { Router } from "express";

import { addprogram, adminsigin, getprogram, logout, timatble } from "../controllers/admin.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { adminverifyjwt } from "../middlewares/adminauth.middleware.js";
import { AddVenu, DeleteCourse, GetCoursesList, GetProgramInfo, GetVenu, submitCourses } from "../controllers/tableInfo.controller.js";
import { GetCoursesListForTeacher, saveteacher } from "../controllers/teacher.controller.js";
const router=Router();



router.route("/addprogram").post(adminverifyjwt,addprogram)
router.route("/getprogramfromdb").get(getprogram)
router.route("/adminlogin").post(adminsigin)
router.route("/adminlogut").post(adminverifyjwt,logout)
router.route("/timetable").post(adminverifyjwt,timatble)
router.route("/getprogram").post(adminverifyjwt,GetProgramInfo)
router.route("/savecourses").post(adminverifyjwt,submitCourses)
router.route("/getallcourses").post(adminverifyjwt,GetCoursesList)
router.route("/deletecourse").post(adminverifyjwt,DeleteCourse)
router.route("/getcourselist").post(adminverifyjwt,GetCoursesListForTeacher)
router.route("/addvenu").post(adminverifyjwt,AddVenu)
router.route("/getvenu").post(adminverifyjwt,GetVenu)
router.route("/saveteacher").post(adminverifyjwt,saveteacher)

export default router