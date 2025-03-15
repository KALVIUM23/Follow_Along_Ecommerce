const Cart = require("../model/cartModel");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Add product to cart
exports.addProductToCart = catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity, price } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
    } else {
        cart.products.push({ productId, quantity, price });
    }

    await cart.save();

    res.status(200).json({ success: true, cart });
});

// Get user's cart
exports.getCart = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("products.productId");

    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    res.status(200).json({ success: true, cart });
});

// Remove product from cart
exports.removeProductFromCart = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    await cart.save();

    res.status(200).json({ success: true, cart });
});