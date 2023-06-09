import products from "../models/products.model.js";

export default new class Show {
    async showPage(req, res) {
        let id = req.params.id;
        let show = await products.findById(id);
        const data = await products.find();

        if (show) {
            return res.render("main/detail", {show, data} );
        }

        return res.json("Error 500");
    }
    async total_cost(req, res) {
        var productId = req.body.id;
        const data = await products.findById(productId);
        const quantity = parseInt(req.body.quantity);
        if(quantity) {
          return res.json({total: data.buy_cost * quantity});
        }else {
          return res.redirect('#');
        }
    
      }
}