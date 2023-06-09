import { Router } from "express";
import homeController from "../controllers/home.controller.js";
const router = new Router();

router.get('/', homeController.homePage)
router.get('/products', homeController.filterBuy_Cost);

router.post('/add-to-cart', homeController.addCart);
router.post('/search-product', homeController.searchResults);

export default router
