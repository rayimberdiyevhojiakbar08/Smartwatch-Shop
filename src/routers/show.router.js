import { Router } from "express";
import showController from "../controllers/show.controller.js";
const showrouter = new Router();

showrouter.get('/show/:id', showController.showPage);
showrouter.post("/total_cost", showController.total_cost);


export default showrouter
