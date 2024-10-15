import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import cartModel from "../../../Database/models/cart.model.js";
import productModel from "../../../Database/models/product.model.js";
import orderModel from "../../../Database/models/order.model.js";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Q9vGDGgm2zKD6DvJ6NYmCiJxGEwwl2pr0iUMAOWSWx7HmGkIq4ts4bxeo7zCT3SYPgZuh5UJPmrsia55Vt0DUxp00L8wVYMxJ');

export const createCashOrder = handleError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  if (order) {
    let options = cart.cartItems.map((ele) => ({
      updateOne: {
        filter: {
          _id: ele.product,
        },
        update: {
          $inc: { quantity: -ele.quantity, sold: ele.quantity },
        },
      },
    }));

    await productModel.bulkWrite(options);
    await order.save();
  } else {
    return next(new AppError("Error occured", 409))
  }

  await cartModel.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: "Done", order });
});

export const getUserOrders = handleError(async (req, res, next) => {
  let orders = await orderModel.find({user: req.user._id}).populate("cartItems.product")
  if(!orders)
    return next(new AppError("No orders found", 404))

  res.status(200).json({message: "Done", orders})
});

export const onlinePayment = handleError(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);

  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  
  
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name : req.user.name
          }
        },
        quantity: 1,
      }
    ],
    mode: "payment",
    success_url: "https://route-comm.netlify.app/#/",
    cancel_url: "https://route-comm.netlify.app/#/cart",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress
  })


  res.status(200).json({message : "Done", session})
});
