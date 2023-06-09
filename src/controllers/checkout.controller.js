import ordersModel from "../models/orders.model.js"
export default new class Checkout {
    async checkoutPage(req, res) {
        res.render('main/checkout')
    }
    async createOrder(req, res) {
        if(req.session.user) {
            await ordersModel.create(req.body)
            try {
                res.render('main/success', { code: req.body.code})
                
            } catch (error) {
                res.status(404)
            }
        }else {
            res.redirect('/signin')
        }

    }
}