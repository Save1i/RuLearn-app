const {Section} =require('../modules/modules')
const ApiError = require('../error/apiError')

class SectionController {
    async create(req, res) {
        const {name} = req.body

        const section = await Section.create({name})
        return res.json(section) 
    }

    async getAll(req, res) {
        const sections = await Section.findAll()
        return res.json(sections)
    }

    async getOne(req, res) {
        
    }

}

module.exports = new SectionController()