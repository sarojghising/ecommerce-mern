import express from 'express'
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductDetails,
    updateProduct
} from '../controllers/product.controller.js';
import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();



router.route("/products").get(getAllProducts);
router.route("/product/create").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);







export default router;