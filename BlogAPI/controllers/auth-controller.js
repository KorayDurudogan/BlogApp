const express = require('express');
const router = express.Router();
const mongoDb = require('../mongo-db');
const jwt = require('jsonwebtoken');
const hashData = require('../shared/hash-data');
const LoginRegisterRequest = require('../models/requests/login-register-request').LoginRegisterRequest;

//Logins an user. Returns a token if process has been successful. Endpoint is post since password is a sensitive data.
router.post('/login', function (req, res) {
    let loginRequest = new LoginRegisterRequest(req.body.email, req.body.password);
    if (!loginRequest.email || !loginRequest.password) {
        return res.status(404).send({
            message: 'Email and password can not be empty !'
        });
    }
    else {
        //checking if login successful.
        mongoDb.getDb().collection('users').findOne({ email: loginRequest.email, password: hashData(loginRequest.password) })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'Login failed ! Check your email and password please.'
                    });
                }

                //creating token
                const token = jwt.sign(
                    {
                        _uid: user._id,
                        _email: user.email,
                        _password: user.password
                    },
                    'rapsodo_api',
                    {
                        expiresIn: "2h"
                    }
                );
                res.status(200).send({ message: 'success', token: token });
            })
            .catch((error) => res.status(400).send(error));
    }
});

//registers an user.
router.post('/register', function (req, res) {
    let registerRequest = new LoginRegisterRequest(req.body.email, req.body.password);
    if (!registerRequest.email || !registerRequest.password) {
        return res.status(404).send({
            message: 'Email and password can not be empty !'
        });
    }
    else {
        mongoDb.getDb().collection('users').insertOne({ email: registerRequest.email, password: hashData(registerRequest.password) })
            .then(() => {
                return res.status(200).send({ message: 'success' });
            })
            .catch((error) => {
                return res.status(400).send(error)
            });
    }
});

module.exports = { router }