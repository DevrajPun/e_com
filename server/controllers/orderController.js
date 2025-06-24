import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { stripe } from "../app.js";



export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: User not logged in",
      });
    }

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Order items are required",
      });
    }

    // Create order
    await orderModel.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice: parseFloat(itemPrice),
      tax: parseFloat(tax),
      shippingCharges: parseFloat(shippingCharges),
      totalAmount: parseFloat(totalAmount),
    });

    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Order API",
      error: error.message || error,
    });
  }
};

////===========================================

export const getMyOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id })
        if (!orders) {
            return res.status(404).send({
                success: false,
                message: "User Not Found "
            })
        }

        return res.status(200).send({
            success: true,
            message: " Get MY Orders SuccessFully",
            totalOrder: orders.length,
            orders,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Get MY Order API "
        })
    }

}

////==================================================

export const singleOrderController = async (req, res) => {

    try {
        const order = await orderModel.findById(req.params.id)
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "order Not Found "
            })
        }

        return res.status(200).send({
            success: true,
            message: " Get MY Orders SuccessFully",
            order,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error Get MY Order API "
        })
    }

}

////========================================================

export const paymentController = async (req, res) => {
    try {
        const { totalAmount } = req.body;

        if (!totalAmount) {
            return res.status(400).send({
                success: false,
                message: "Total amount is required",
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(totalAmount),
            currency: 'usd',
        });

        return res.status(200).send({
            success: true,
            message: "PaymentIntent created successfully",
            client_secret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Payment creation failed",
            error: error.message,
        });
    }
};

/// getAll Orders 

export const getAllOrdersController = async (req , res ) => {
    try {
        const getall = await orderModel.find({})
        if (!getall) {
            res.status(404).send({
                success: false,
                message: "Error GetAll  User "
            })
        }
        res.status(200).send({
            success: true,
            message: "Get ALL Users Successfully "
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success: false,
            message: "Error Get All Order API Founding "
        })

    }
}



// Update order status controller
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};

