import express from 'express'
import { registerUser ,login, logout, getMyProfile , allCreator} from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/verifyJwt.js';


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(verifyJwt,logout)
router.route("/my-profile").get(verifyJwt,getMyProfile);
router.route("/allCreator").get(allCreator)



export default router;