import express from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductDetails,
    updateProduct
} from '../controllers/product.controller.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';


const router = express.Router();



router.route("/products").get(isAuthenticated, authorizeRoles("admin"),getAllProducts);
router.route("/product/create").post(isAuthenticated,createProduct);
router.route("/product/:id").put(isAuthenticated,updateProduct).delete(isAuthenticated,deleteProduct).get(getProductDetails);







export default router;