import express from 'express'
import { forgotPassword, login, logout, register, resetPassword } from '../controllers/user.controller.js';


const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);




export default router;