import { Router } from "express";
import multer from 'multer';
import adminController from "../controllers/admin.controller.js";
const adminrouter = new Router();


adminrouter.post('/admin_router', adminController.adminEnter);
adminrouter.post('/edit_product/:id', adminController.edit);

adminrouter.get('/delete/:id', adminController.delete);
adminrouter.get('/edit/:id', adminController.editPage);
adminrouter.get('/search_by_deliver_code', adminController.searchByDeliverCode);
adminrouter.get('/delivered_true/:id', adminController.deliverTrue);

adminrouter.post('/new', multer({dest: 'public/image'}).single('img'), adminController.addNew);
export default adminrouter
