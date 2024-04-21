import express from 'express'
import { fetchSingleUser, forgotPassword, getAllUsers, getUserDetails, login, logout, register, resetPassword, updatePassword, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated,authorizeRoles } from '../middleware/auth.js';


const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated,getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRoles("admin"), fetchSingleUser);





export default router;