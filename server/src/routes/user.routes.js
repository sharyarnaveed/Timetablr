import { Router } from "express";
import { gethomedata, logout, signinuser, signupuser } from "../controllers/user.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router=Router();
router.route('/signup').post(signupuser)
router.route('/signin').post(signinuser)
router.route('/home').post(verifyjwt,gethomedata)
router.route('/logout').post(verifyjwt,logout)
export default router