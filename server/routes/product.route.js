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



router.route("/products").get(getAllProducts);
router.route("/product/create").post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthenticated, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails);







export default router;