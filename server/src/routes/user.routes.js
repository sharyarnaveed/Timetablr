import { Router } from "express";
import { changepassowrd, changeusername, gethomedata, logout, signinuser, signupuser } from "../controllers/user.controllers.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router=Router();
router.route('/signup').post(signupuser)
router.route('/signin').post(signinuser)
router.route('/home').post(verifyjwt,gethomedata)
router.route('/changepassword').post(verifyjwt,changepassowrd)
router.route('/changeusername').post(verifyjwt,changeusername)
router.route('/logout').post(verifyjwt,logout)
export default router