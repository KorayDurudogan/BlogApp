const jwt = require('jsonwebtoken');

//Checks the token of request.
module.exports = function TokenAuthentication(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'rapsodo_api');
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}