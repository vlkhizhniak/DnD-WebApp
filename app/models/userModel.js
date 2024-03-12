const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

User.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            res.send(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                res.send(err);
            }

            user.password = hash;
            next();
        });
    });
});

User.methods.generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.secretKey, { expiresIn: "24h" });
    return token;
}


module.exports = mongoose.model("User", User);