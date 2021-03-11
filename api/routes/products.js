const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const ProductController = require('../controllers/products');

router.get('/', checkAuth, ProductController.getAllProducts);

router.post('/', checkAuth, upload.single('productimage'), ProductController.createOneProduct);

router.get('/:productId', checkAuth, ProductController.getOneProduct);

router.patch('/:productId', checkAuth, ProductController.updateOneProduct);

router.delete('/:productId', checkAuth, ProductController.deleteOneProduct);

module.exports = router;