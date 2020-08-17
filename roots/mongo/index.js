import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import user_model from './models/User.js';

export default async function (app, opts) {
    app.post("/register-user", (req, res) => {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new userSchema({
                name: req.body.name,
                password: hash
            });
            user.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        });
    });

};