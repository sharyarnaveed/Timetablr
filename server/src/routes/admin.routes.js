import { Router } from "express";

import { addprogram, getprogram } from "../controllers/admin.controllers.js";

const router=Router();



router.route("/addprogram").post(addprogram)
router.route("/getprogramfromdb").get(getprogram)

export default router