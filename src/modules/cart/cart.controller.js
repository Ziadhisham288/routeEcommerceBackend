import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import cartModel from "../../../Database/models/cart.model.js";
import productModel from "./../../../Database/models/product.model.js";
import couponModel from './../../../Database/models/coupon.model.js';
import { deleteOne } from './../handlers/apiHandler.js';

function calcPrice(cart) {
  let totalPrice = 0;

  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });

  cart.totalPrice = totalPrice;
}

export const addToCart = handleError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  req.body.price = product.price;

  let hasCart = await cartModel.findOne({ user: req.user._id });

  if (!hasCart) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "Cart created", cart });
  }

  let item = hasCart.cartItems.find((ele) => ele.product == req.body.product);

  if (item) {
    item.quantity += 1;
  } else {
    hasCart.cartItems.push(req.body);
  }

  calcPrice(hasCart);

  if (hasCart.discount)
    hasCart.totalPriceAfterDiscount =
      hasCart.totalPrice - (hasCart.totalPrice * hasCart.discount) / 100;

  await hasCart.save();
  res.json({ message: "done", cart:  hasCart });
});

export const getUserCart = handleError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) return next(new AppError("No cart found", 404));

  res.status(200).json({ message: "Done", cart });
});

export const removeCartItem = handleError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        cartItems: { _id: req.params.id },
      },
    },
    { new: true }
  );

  if (!cart) return next(new AppError("No cart found", 404));

  calcPrice(cart);
  cart.save();
  res.status(200).json({ message: "Done", cart });
});

export const updateCart = handleError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  req.body.price = product.price;

  let hasCart = await cartModel.findOne({ user: req.user._id });

  let item = hasCart.cartItems.find((ele) => ele.product == req.body.product);

  if (!item) {
    return next(new AppError("Item not found", 404));
  }

  item.quantity = req.body.quantity;
  calcPrice(hasCart);
  await hasCart.save();
  res.json({ message: "done", hasCart });
});

export const applyCoupon = handleError(async (req, res, next) => {
 let code = await couponModel.findOne({code: req.params.code})
 
 if(!code)
  return next(new AppError("Coupon not found", 404))

 let cart = await cartModel.findOne({user: req.user._id})

 if(!cart)
  return next(new AppError("Cart not found", 404))

 
 cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100;
 cart.discount = code.discount
 await cart.save()
 res.status(200).json({message : "Done", cart})
});

export const deleteCart = deleteOne(cartModel)