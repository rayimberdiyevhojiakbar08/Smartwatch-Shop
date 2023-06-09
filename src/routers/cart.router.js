import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
const cartrouter = new Router();

cartrouter.get('/cart', cartController.cartPage);

cartrouter.post('/add-to-cart', cartController.addItem)
cartrouter.post('/cart/remove', cartController.removeItem)

// cartrouter.post("/total_cart", cartController.total_cart);
export default cartrouter
