const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product
        .find()
        .exec()
        .then(products => {
            const response = {
                count: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        productImage: product.productImage
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(error => {
            next(error);
        });
};

exports.getOneProduct = (req, res, next) => {
    const id = req.params.productId;
    Product
        .findById(id)
        .select(' _id name price productImage')
        .exec()
        .then(product => {
            if(product){
                res.status(200).json(product);
            } else {
                res.status(404).json({
                    message: 'Product not found'
                });
            }
        })
        .catch(error => {
            next(error);
        });
};

exports.createOneProduct = (req, res, next) => {
    const product = createProduct(req);
    console.log('product created');
    product
        .save()
        .then(product => {
            res.status(200).json({
                message: 'Product created successfully',
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    productImage: product.productImage
                }
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.updateOneProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product
        .update({ _id: productId }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated product sucessfully',
                result: result
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.deleteOneProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product
        .remove({ _id: productId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted product successfully',
                result: result
            });
        })
        .catch(error => {
            next(error);
        });
};

function createProduct(req){
    return new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
}