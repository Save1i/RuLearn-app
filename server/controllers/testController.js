const uuid = require('uuid')
const path = require('path')

const {Test} =require('../modules/modules')
const ApiError = require('../error/apiError')

class TestController {
    async create(req, res, next) {
        try {
        const {name, text_q, options, correct_answer, completed} = req.body
        
        const {img} = req.files
        let fileName = uuid.v4() + ".png"
        img.mv(path.resolve(__dirname, "..", "static", fileName))
        
        const {audio_q} = req.files
        let audioFileName = uuid.v4() + ".mp3"
        audio_q.mv(path.resolve(__dirname, "..", "static", audioFileName))

        const test = await Test.create({name, text_q, options, correct_answer, img: fileName, audio_q: audioFileName, completed})
        return res.json(test) 
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
   
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

}

module.exports = new TestController()