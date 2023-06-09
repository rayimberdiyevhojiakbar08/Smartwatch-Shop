import { Router } from "express";
import checkoutController from "../controllers/checkout.controller.js";
const checkoutrouter = new Router();

checkoutrouter.get('/checkout', checkoutController.checkoutPage);

checkoutrouter.post('/create_order', checkoutController.createOrder);

export default checkoutrouter
