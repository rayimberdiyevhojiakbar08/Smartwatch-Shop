import adminModel from "../models/admin.model.js";
import products from "../../src/models/products.model.js";
import orders from "../../src/models/orders.model.js";
import auth from "../../account/model/auth.model.js";
import { extname, normalize } from "path";
import { renameSync } from "fs";
import { startOfDay, endOfDay } from 'date-fns'
export default new class Admin {
    constructor() {
        this.adminEnter = this.adminEnter.bind(this); // Bind the method to the class instance
    }
    async adminEnter(req, res) {
        try {
            const name = req.body.name;
            const admin = await adminModel.findOne({ name });
      
            if (!admin ) {
              res.redirect('/');
            } else {
              const { data, userdata, todayauth} = await this.statUser();
              const { order, totalSum, totalSumToday, todayOrders } = await this.statOrder()
              const { deliverFalse, deliverTrue } = await this.deliverTrueOrFalse()
              res.render('admin/admin', { data, userdata, todayauth, order, totalSum, totalSumToday, todayOrders, deliverFalse, deliverTrue });
            }
          } catch (error) {
            console.error(error);
            res.redirect('/');
          }
    }
    async addNew(req, res) {
        if(!req.file) {
            res.redirect('/admin_router');
        }
        const ext = extname(req.file.originalname).toLowerCase();
        const fileway = normalize(req.file.path);
        renameSync(fileway, fileway + ext);
        req.body.img = req.file.filename + ext;
        await products.create(req.body);
        res.redirect("/");
    }
    async statUser() {
        const data = await products.find();
        const userdata = await auth.find();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // set time to start of day
        const query = {
        createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // set time to end of day
        }
        };
        const todayauth = await auth.find(query);
        return { data, userdata, todayauth }; // Return the data as an object
    }
    async statOrder() {
         //total summa
         const orderStats = await orders.aggregate([
            {
              $group: {
                _id: null,
                totalSum: { $sum: {
                    $toDouble: { $substr: ["$total", 1, -1] }
                }}
              }
            }
          ]);
      
        let totalSum = orderStats.length > 0 ? orderStats[0].totalSum : 0;
        //Order length
        let order = await orders.find()
        //today total summa 
        const today = new Date();
        const startOfToday = startOfDay(today);
        const endOfToday = endOfDay(today);
    
        let todayOrderTotalSum = await orders.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfToday,
                $lte: endOfToday
              }
            }
          },
          {
            $group: {
              _id: null,
              totalSum: {
                $sum: {
                  $toDouble: { $substr: ["$total", 1, -1] }
                }
              }
            }
          }
        ]);
        let totalSumToday = todayOrderTotalSum.length > 0 ? todayOrderTotalSum[0].totalSum : 0;
        //totda added order
        let todayOrders = await orders.find({
          createdAt: {
            $gte: startOfToday,
            $lte: endOfToday
          }
        });
        return { totalSum, order, totalSumToday, todayOrders }
    }
    statDeliver() {

    }
    async delete(req, res) {
        const id = req.params.id
        await products.findByIdAndDelete(id)
        res.redirect('/')
    }
    async editPage(req, res) { //optomPage
        const _id = req.params.id;
        const data = await products.findById(_id);
        res.render('admin/edit', { data });
    }
    async edit(req, res) {   
        const id = req.params.id;
        const data = req.body;
        await products.findByIdAndUpdate(id, data);
        res.redirect('/');
    }
    async searchByDeliverCode(req, res) {
      const { code } = req.query;
      if(code) {
        let query = {};

        if (code) {
            query.code = code;
        }

        await orders.find(query)
            .then(function(order) {
            res.json(order);
            })
      }

    }
    async deliverTrue(req, res) {
        const id = req.params.id;
        await orders.findByIdAndUpdate(id, {deliver: "true" });
        res.redirect('/');
    }
    async deliverTrueOrFalse() {
        let deliverTrue = await orders.find({deliver: "true" })
        let deliverFalse = await orders.find({deliver: "false" })
        return {deliverFalse, deliverTrue}
    }
}
