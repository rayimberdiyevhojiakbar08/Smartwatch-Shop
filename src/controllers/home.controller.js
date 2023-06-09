import Products from "../models/products.model.js"

export default new class Home {
    async homePage(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
      
        try {
          const totalDocs = await Products.countDocuments({});
          const totalPages = Math.ceil(totalDocs / limit);
      
          let data;
          if (page === 1) {
            data = await Products.find({})
              .sort({ _id: -1 })
              .limit(limit)
              .exec();
          } else if (page === 2) {
            data = await Products.find({})
              .sort({ _id: -1 })
              .skip(limit)
              .limit(1)
              .exec();
          } else if (page > 2 && page <= totalPages) {
            data = await Products.find({})
              .sort({ _id: -1 })
              .skip(limit * (page - 1))
              .limit(limit)
              .exec();
          } else {
            const adjustedPage = Math.max(1, totalPages);
            data = await Products.find({})
              .sort({ _id: -1 })
              .skip(limit * (adjustedPage - 1))
              .limit(limit)
              .exec();
          }
      
          res.render('main/home', { data, page, totalPages });
        } catch (err) {
          console.error('Error retrieving data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async filterBuy_Cost(req, res) {
        const { color, minCost, maxCost } = req.query;

        let query = {};

        if (color) {
            query.color = color;
        }

        if (minCost && maxCost) {
            query.buy_cost = { $gte: minCost, $lte: maxCost };
        } else if (minCost) {
            query.buy_cost = { $gte: minCost };
        } else if (maxCost) {
            query.buy_cost = { $lte: maxCost };
        }

        await Products.find(query)
            .then(function(products) {
            res.json(products);
            })
            .catch(function(error) {
            console.error('Error retrieving data from MongoDB', error);
            res.status(500).send('Internal Server Error');
            });
        }
        async addCart(req, res) {
          const { id } = req.body;
          const quantity = parseInt(req.body.quantity) || 1;
          const data = await Products.findById(id);
            if (!req.session.cart) {
                req.session.cart = [];
            }  
            const existingItem = req.session.cart.find((item) => item.data._id === id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                req.session.cart.push({ data, quantity });
            } 
            res.json(req.session.cart);
        }
        async searchResults(req, res) {
            let search = req.body.title;
            if(search) {
                let regexForTitle= new RegExp(search, "i");
                let result = await Products.find({ title: { $regex:regexForTitle }});
                if (result.length !== 0) {
                    res.render("main/searchresult", {data:result});
                } else {
                    res.render("main/searchresult", {data:0});
                }
            }else {
                res.redirect('/');
            }

        }

}