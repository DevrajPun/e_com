import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController, braintreeTokenController, createProductController , deleteProductController, deleteProductImageController, getALLProductsController, getProductImagesController, getSingleProductController, productFiltersController, updateProductController, updateProductImageController } from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router()

// get-all 
router.get("/get-all", getALLProductsController);

// get by id 
router.get("/get-product/:id", getSingleProductController);

// create 
router.post("/create", singleUpload,  createProductController )

// update Product
router.put("/update-product/:id", updateProductController);


// find Product Image
router.get("/product-photo/:id",  singleUpload, getProductImagesController);


// update Product Image
router.put("/image/:id",  singleUpload, updateProductImageController);

// delete image 
router.delete("/delete-image/:id", deleteProductImageController );

/// delete product  
router.delete("/delete/:id",  deleteProductController ); 


router.post("/product-filters",  productFiltersController ); 

// payment token
router.get('/braintree/token', braintreeTokenController);
 
// payment 
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);

export default router;


