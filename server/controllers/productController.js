import productModel from "../models/productModel.js"
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
import orderModel from "../models/orderModel.js";
import mongoose from "mongoose";
import  braintree from 'braintree'

import dotenv from 'dotenv';
dotenv.config();

/// payment gateway 

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});





export const getALLProductsController = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).send({
            success: true,
            message: " All Product fatched  Successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get  Products API "
        })
    }
};

////==========================================================================================

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            res.status(404).send({
                success: false,
                message: " Products  Not Found  "
            })
        }

        return res.status(200).send({
            success: true,
            message: "  Product fatched  Successfully By ID",
            product,
        })

    } catch (error) {
        console.log(error)
        if (error.name === "CastError") {
            return res.status(500).send({
                success: false,
                message: " Invalid  ID ",
            })
        }
    }
    res.status(500).send({
        success: false,
        message: "Error in Get  Products API "
    })
};

////============================================================================================

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body
        // Validation
        if (!name || !description || !price || !stock) {
            res.status(500).send({
                success: false,
                message: "Please  Provided All Field  "
            })
        }
        if (!req.file) {
            res.status(500).send({
                success: false,
                message: "Please Provide Product Images "
            })
        }
        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }
        await productModel.create({
            name, description, price, category, stock, image: [image]
        })

        res.status(201).send({
            success: true,
            message: " Product Created Successfully "
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error Create Product API "
        })
    }
};

////================================================================================================

export const updateProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    const { name, description, price, category, stock, shipping } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;
    if (shipping !== undefined) product.shipping = shipping;

    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
    });

  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    return res.status(500).send({
      success: false,
      message: "Error updating product",
    });
  }
};



// get photo

export const getProductImagesController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID format",
    });
  }

  try {
    const product = await productModel.findById(id).select("image");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      images: product.image,
    });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};




////===================================================================================================

export const updateProductImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product)
            res.status(404).send({
                success: false,
                message: " Product is not Found "
            })

        if (!req.file) {
            res.status(500).send({
                success: false,
                message: "Please Provide Product Images "
            })
        }
        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }

        product.image.push(image)
        await product.save();
        return res.status(200).send({
            success: true,
            message: "Product Image  Updated SucceessFully "
        })

    } catch (error) {
        console.log(error)
        if (error.name === "CastError") {
            return res.status(500).send({
                success: false,
                message: " Invalid  ID ",
            })
        }
    }
    res.status(500).send({
        success: false,
        message: "Error in Get  Products API "
    })
};

////======================================================================================================

export const deleteProductImageController = async (req, res) => {
  try {
    // find produtc
    const product = await productModel.findById(req.params.id);
    // validatin
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }
    // image id find
    const id = req.query.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "product image not found",
      });
    }
    let isExist = -1;
    product.image.forEach((item, index) => {
      if (item._id.toString() === id.toString()) isExist = index;
    });
    if (isExist < 0) {
      return res.status(404).send({
        success: false,
        message: "Image Not Found",
      });
    }
    // DELETE PRODUCT IMAGE
    await cloudinary.v2.uploader.destroy(product.image[isExist].public_id);
    product.image.splice(isExist, 1);
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Product Image Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get DELETE Product IMAGE API",
      error,
    });
  }
};

///======================================================================================================

export const deleteProductController = async(req , res) =>{
try {
 // find product
    const product = await productModel.findById(req.params.id);

 // validation
 if (!product) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
 // find and delete image cloudinary
    for (let index = 0; index < product.image.length; index++) {
      await cloudinary.v2.uploader.destroy(product.image[index].public_id);
    }
    await product.deleteOne();
    res.status(200).send({
      success: true,
      message: "PRoduct Deleted Successfully",
    });
} catch (error) {
 console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get DELETE Product IMAGE API",
      error,
    });
  }
}
///==========================================================================================================


export const productFiltersController = async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;

    let filter = {};

    // Filter by selected category IDs
    if (checked.length > 0) {
      filter.category = { $in: checked };
    }

    // Filter by selected price range
    if (radio.length === 2) {
      filter.price = {
        $gte: radio[0],
        $lte: radio[1],
      };
    }

    const products = await productModel
      .find(filter)
      .populate("category"); // optional: populates category data

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).send({
      success: false,
      message: "Error while filtering products",
      error: error.message,
    });
  }
};


///  payment   gateway api

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(response);
      }
    });
  } catch (error) {
    console.log('Unexpected error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

/// payment

export const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;

    let total = 0;
    cart.forEach(item => {
      total += item.price;
    });

    gateway.transaction.sale(
      {
        amount: total.toFixed(2), 
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (error) {
          console.error('Braintree error:', error);
          return res.status(500).json({ error: 'Transaction failed' });
        }

        if (result.success) {
          try {
            const order = new orderModel({
              products: cart,
              payment: result,
              user: req.user,
            });
            await order.save();
            return res.json({ ok: true });
          } catch (err) {
            console.error('Order saving error:', err);
            return res.status(500).json({ error: 'Failed to save order' });
          }
        } else {
          return res.status(400).json({ error: result.message || 'Transaction not successful' });
        }
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
