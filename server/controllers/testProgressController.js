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

async getAll(req, res, next) {
    try {
        const { userId, taskId } = req.query;

        if (!userId || !taskId) {
            return res.status(400).json({ error: "userId or taskId is required" });
        }

        const tests = await Test.findAll({
            where: {taskId},
            attributes: ['id', 'name'],
            include: [
                {
                    model: Test_progress,
                    as: 'progress',
                    attributes: ['status'],
                    where: { userId },
                    required: false,
                    separate: true,
                    order: [['createdAt', 'DESC']], 
                    limit: 1
                }
            ]
        });

        const result = tests.map(test => ({
            testId: test.id,
            name: test.name,
            status: test.progress && test.progress.length > 0 ? test.progress[0].status : 'not_started'
        }));

        return res.json(result);
    } catch (error) {
        console.error("Error occurred in getAll method:", error);  // Логирование ошибки для отладки
        next(error);  // Передаем ошибку дальше
    }
}


async getOne(req, res, next) {
    try {
        const { id: testId } = req.params; // testId теперь берется из params
        const { userId } = req.query; // userId передается как query-параметр

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const test = await Test.findOne({
            where: { id: testId },
            include: [
                {
                    model: Test_progress,
                    as: 'progress',
                    where: { userId },
                    attributes: ['status', 'completed'],
                    required: false
                }
            ]
        });

        if (!test) {
            return res.status(404).json({ error: "Тест не найден" });
        }

        return res.json({
            test,
            progress_status: test.progress ? test.progress.status : 'not_started',
            completed: test.progress ? test.progress.completed : false
        });
    } catch (error) {
        console.error("Error in getOne:", error);
        next(error);
    }
}


}

module.exports = new TestProgressController()