import auth from "../model/auth.model.js";
import {hash, compare} from 'bcrypt';
export default new class Auth {
    authPage(req, res) {
        res.render('account/auth');
    }
    async signUp(req, res) {

        let existUser = await auth.find();

        if (existUser.length !== 0) {
            return res.redirect("/signup");
        } 

        req.body.password = await hash(req.body.password, 10);

        await auth.create(req.body);
        res.redirect("/signin");
    }

    // sign in qilish
    async signIn(req, res) {
        const { name, password } = req.body;

        let user = await auth.findOne({ name });

        if (!user) {
            return res.redirect("/signin");
        } else {
            let isMatch = await compare(password, user.password);

            if (isMatch) {
                req.session.user = user;
                return res.redirect("/");
            } else {
                return res.redirect("/signin");
            }
        }
    }

}