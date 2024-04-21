import express from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductDetails,
    updateProduct
} from '../controllers/product.controller.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';
import { createOrUpdateReview } from '../controllers/product.reviews.controller.js';


const router = express.Router();



router.route("/products").get(getAllProducts);

router.route("/admin/product/create").post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuthenticated, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createOrUpdateReview);







export default router;