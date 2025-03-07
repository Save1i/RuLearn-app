const {Task} =require('../modules/modules')
const ApiError = require('../error/apiError')

class TaskController {
    async create(req, res) {
        const {name, type, duration, completed} = req.body
        
        const task = await Task.create({name, type, duration, completed})
        return res.json(task) 
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

}

module.exports = new TaskController()