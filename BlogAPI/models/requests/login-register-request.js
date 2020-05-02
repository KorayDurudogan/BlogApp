const ApiRequest = require('./api-request').ApiRequest;

//A request type that ideal for register and login transactions with email and password attributes.
class LoginRegisterRequest extends ApiRequest {
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }
}

module.exports = { LoginRegisterRequest }