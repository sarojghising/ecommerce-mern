import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Product } from "../models/product.model.js";

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


export {
    createOrUpdateReview
}