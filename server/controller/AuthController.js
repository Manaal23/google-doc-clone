const AuthServices = require("../services/AuthServices");

class AuthController {
    async login (req, res) {
        const response = await AuthServices.login(req, res);
        res.status(response.error ? 400 : 201).send(response)
    }
}

module.exports = new AuthController()