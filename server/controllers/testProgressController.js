const uuid = require('uuid')
const path = require('path')

const {Test_progress} =require('../modules/modules')
const {Test} =require('../modules/modules')
const ApiError = require('../error/apiError')

class TestProgressController {
    async update(req, res, next) {
        try {
            const { userId, testId } = req.query; 
    
            if (!userId || !testId) {
                return res.status(400).json({ error: "userId и testId обязательны" });
            }
    
            // проверка на запись
            let existingRecord = await Test_progress.findOne({ where: { userId, testId } });
    
            if (!existingRecord) {
                // создание записи
                existingRecord = await Test_progress.create({
                    userId,
                    testId,
                    status: 'learned',
                    completed: true
                });
    
                return res.status(201).json({ message: "Запись создана", status: "learned" });
            }
    
            // обновление записи
            await existingRecord.update({ status: 'learned', completed: true });
    
            return res.json({ message: "Задача обновлена", status: "learned" });
    
        } catch (error) {
            next(error);
        }
    }    

    async getAll(req, res) {
    
    }

    async getOne(req, res) {
        
    }

}

module.exports = new TestProgressController()