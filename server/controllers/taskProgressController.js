const {Task_progress} =require('../modules/modules')
const {Test_progress} =require('../modules/modules')
const {Test} =require('../modules/modules')
const {Task} =require('../modules/modules')
const ApiError = require('../error/apiError')

class TaskProgressController {
    async update(req, res, next) {
        try {
            const { userId, taskId } = req.query;
    
            if (!userId || !taskId) {
                return res.status(400).json({ error: "userId и taskId обязательны" });
            }
    
            // пройдены ли все тесты для этой задачи
            const totalTests = await Test.count({ where: { taskId } });
            const completedTests = await Test_progress.count({
                where: { userId, completed: true },
                include: [{ model: Test, where: { taskId } }]
            });
    
            if (totalTests === completedTests) {

                let existingRecord = await Task_progress.findOne({ where: { userId, taskId } });
    
            if (!existingRecord) {
                // создание записи
                existingRecord = await Task_progress.create({
                    userId,
                    taskId,
                    status: 'learned',
                    learned: true
                });
    
                return res.status(201).json({ message: "Запись создана", status: "learned" });
            }
                // если все тесты пройдены, обновляется
                const [updatedRows] = await Task_progress.update(
                    { status: 'learned', learned: true },
                    { where: { userId, taskId }, returning: true, individualHooks: true }
                );
    
                if (updatedRows > 0) {
                    return res.json({ message: "Задача обновлена", status: "learned" });
                }
            }
    
            return res.json({ message: "Не все тесты пройдены, статус не изменен" });
    
        } catch (error) {
            next(error);
        }
    }
    
    async getAll(req, res, next) {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({ error: "userId is required" });
            }

            const tasks = await Task.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Task_progress,
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
            
            

            const result = tasks.map(task => ({
                task_id: task.id,
                task_name: task.name,
                progress_status: task.progress.length > 0 ? task.progress[0].status : 'not_started'
            }));
            
            

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res) {
        
    }

}

module.exports = new TaskProgressController()