import Stripe from "stripe";
import dotenv from "dotenv";
import OrderModel from "../models/orderModel.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createSessionController = async (req, res) => {
  try {
    const { products, userId } = req.body;

    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/orders/success`,
      cancel_url: "http://localhost:3000/dashboard/user",
    });

    // Save the order manually in MongoDB
    const order = new OrderModel({
      products: products.map((p) => p._id),
      buyer: userId,
      payment: {}, // Will be updated after payment via admin or webhook (optional)
      status: "Not Processed",
    });

    await order.save();

    res.json({
      id: session.id,
      message: "Order created and session initialized.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Stripe session and saving order",
      error,
    });
  }
};
