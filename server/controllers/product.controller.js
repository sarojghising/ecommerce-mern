import {Product} from '../models/product.model.js';


const getAllProducts = async (req,res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    }) 
}

const createProduct = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.status(200).json({
        message: "Product created.", 
        product
    });

}

const updateProduct = async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product) return res.status(500).json({success: false, message: "Product not found."});

    product = await Product.findByIdAndUpdate(req.params.id,req.body, { new:true, runValidators: true, useFindAndModify: false});

    res.status(200).json({
        success: true, 
        product,
        message: "Product updated."
    })
    
    
}

const deleteProduct = async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product) return res.status(500).json({success: false, message: "Product not found."});

    await product.deleteOne();

    res.status(200).json({
        success: true, 
        message: "Product deleted."
    })


}

const getProductDetails = async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product) return res.status(500).json({success: false, message: "Product not found."});


    res.status(200).json({
        success: true, 
        product,
        message: "Product retrive."
    })
}

export {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
}