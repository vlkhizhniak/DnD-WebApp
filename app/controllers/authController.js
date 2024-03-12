const crypto = require("crypto");
const User = require("../models/userModel");
const Token = require("../models/tokenModel")

module.exports = {
    indexlogin: (req, res) => {
        res.render('auth/login')
    },
    indexsignup: (req, res) => {
        res.render('auth/signup')
    },
    signup: async (req, res) => {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.render('auth/signup', { uniqueEmailError: true });
        } else {
            user = new User({
                email: req.body.email,
                password: req.body.password
            });
            await user.save();

            let token = new Token({
                userId: user._id,
                token: crypto.randomBytes(48).toString("hex")
            });
            await token.save();
        }
        res.redirect('/')
    },
    login: async (req, res) => {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.render('auth/login', { loginError: true })
        }
    }
}