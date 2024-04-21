import express from 'express'
import { forgotPassword, getUserDetails, login, logout, register, resetPassword, updatePassword } from '../controllers/user.controller.js';
import { isAuthenticated,authorizeRoles } from '../middleware/auth.js';


const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated,getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);




export default router;