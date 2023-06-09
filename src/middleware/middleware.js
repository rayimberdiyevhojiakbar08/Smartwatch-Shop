import express from 'express'
import layout from 'express-ejs-layouts'
import session from 'express-session';
import { connect } from 'mongoose'
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import homerouter from '../routers/home.router.js';
import cartrouter from '../routers/cart.router.js';
import checkoutrouter from '../routers/checkout.router.js';
import authrouter from '../../account/router/auth.router.js';
import showrouter from '../routers/show.router.js';
import adminrouter from '../../admin/routers/admin.router.js';
const app = new express()

const __dirname = dirname(fileURLToPath(import.meta.url));

export default  function middleware(app) {
    app.set('view engine', 'ejs');
    app.set('views', './src/views')
    connect("mongodb://localhost/smartwatch-shop", { useNewUrlParser:true, useUnifiedTopology:true });

    app.use(express.static('public'));
    app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(layout)
    app.use(session({
        secret: "213sf345fgg234fgwsdgt324",
        cookie: {maxAge: 1000 * 60 * 60 * 24},
        saveUninitialized:false,
        resave:false
    }));
    app.use((req, res, next) => {
        res.locals.cart = req.session.cart || [];
        res.locals.count_of_items = req.session.cart?.length || 0
        res.locals.summaCost = 0
        res.locals.deliver_code = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        res.locals.deliver_code += characters.charAt(randomIndex);
        }

    next();
    });
    app.use(homerouter);
    app.use(cartrouter);
    app.use(checkoutrouter);
    app.use(authrouter);
    app.use(showrouter);
    app.use(adminrouter);
    app.use((req, res) => {
        const publicDirPath = path.join(__dirname, '../..')
        //console.log(__dirname)
        res.status(404).sendFile(publicDirPath + '/public/404.html')
    });
}
