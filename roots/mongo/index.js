import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import user_model from './models/User.js';

export default async function (app, opts) {
    app.post("/register-user", (req, res) => {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new user_model({
                name: req.body.name,
                password: hash
            });
            user.save().then((response) => {
                res.code(201).send({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.code(500).send({
                    error: error
                });
            });
        });
    });

    app.get("/users", (req, res) => {
        user_model.find((error, response) => {
            if (error) {
                res.code(500).send({
                    error: error
                });
            } else {
                res.code(200).send(response)
            }
        })
    })

    app.post("/signin", (req, res) => {
        let user_found;
        user_model.findOne({
            name: req.body.name
        }).then(user => {
            if (!user) {
                return res.code(401).send({
                    message: "Authentication failed"
                });
            }
            user_found = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(response => {
            if (!response) {
                return res.code(401).send({
                    message: "Authentication failed"
                });
            }
            let jwtToken = jwt.sign({
                name: user_found.name,
                userId: user_found._id
            }, process.env.SECRET, {
                expiresIn: "1m"
            });
            res.code(200).send({
                token: jwtToken,
                expiresIn: 3600,
                msg: user_found
            });
        }).catch(err => {
            return res.code(401).send({
                message: "Authentication failed"
            });
        });
    });

};