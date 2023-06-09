import { Router } from "express";
import authController from "../controller/auth.controller.js";

const authrouter = new Router();

authrouter.get('/signin', authController.authPage);
authrouter.get('/signup', authController.authPage);
authrouter.post('/signin', authController.signIn);
authrouter.post('/signup', authController.signUp);

export default authrouter
