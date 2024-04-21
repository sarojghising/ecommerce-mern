import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Product } from "../models/product.model.js";
import ErrorHandler from "../utils/errorhandler.js";

const createOrUpdateReview = catchAsyncErrors(async (req, res, next) => {


    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                rev.comment = comment
            }

        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;


    await product.save({validateBeforeSave : false});

    res.status(200).json({
        success: true, 
        product
    });





});

const getProductReviews = catchAsyncErrors(async(req,res,next) => {

    const product = await Product.findById(req.query.productId);

    if(!product) return next(new ErrorHandler("product not found.",400));

    const reviews = product.reviews;

    res.status(200).json({
        success: true,
        reviews
    });

});

const deleteReview = catchAsyncErrors(async(req,res,next) => {


    const product = await Product.findById(req.query.productId);

    if(!product) return next(new ErrorHandler("product not found.",400));


    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString()); // remove review 

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;


    const numOfReviews = reviews.length;


    await Product.findByIdAndUpdate(req.query.productId, {reviews, ratings, numOfReviews}, {new: true, runValidators: true, useFindAndModify: false});



    
    res.status(200).json({
        success: true,
        message: "Delete Review"
    });


});





export {
    createOrUpdateReview,
    getProductReviews,
    deleteReview
}