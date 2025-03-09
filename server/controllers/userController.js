const {User} =require('../modules/modules')
const ApiError = require("../error/apiError")

class UserController {
    async registration(req, res) {
        const {email, password} = req.body
        
        const user = await User.create({email, password})
        return res.json(user) 
    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const {id} = req.query
        if(!id) {
            return next(ApiError.badRequest("Не задан ID"))
        }
        res.json(id)
    }
}

module.exports = new UserController()