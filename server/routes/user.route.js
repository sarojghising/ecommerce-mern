import express from 'express'
import { forgotPassword, login, logout, register } from '../controllers/user.controller.js';


const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);




export default router;