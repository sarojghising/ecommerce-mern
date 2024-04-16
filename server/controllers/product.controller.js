import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { Product } from '../models/product.model.js';
import ApiFeatures from '../utils/apiFeatures.js';
import ErrorHandler from '../utils/errorhandler.js';




const getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8;
    const totalProducts = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        totalProducts
    });
});


const createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(200).json({
        message: "Product created.",
        product
    });

});


const updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found.", 404));

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({
        success: true,
        product,
        message: "Product updated."
    });


});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found.", 404));

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted."
    });


});


const getProductDetails = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found.", 404));


    res.status(200).json({
        success: true,
        product,
        message: "Product retrive."
    });
});

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
}