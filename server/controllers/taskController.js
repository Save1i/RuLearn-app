const { Task } = require("../modules/modules");
const ApiError = require("../error/apiError");

class TaskController {
  async create(req, res) {
      try {
        const { name, type, duration, sectionId } = req.body;
    
        // Попробуйте создать задачу
        const task = await Task.create({ name, type, duration, sectionId });
        
        // Возвращаем созданную задачу
        return res.json(task);  // Статус 201 - задача успешно создана
    } 
    catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Обрабатываем ошибку дублирования уникального значения
        console.log('Задача с таким именем уже существует');
        return res.status(400).json({ message: 'Задача с таким именем уже существует' });
      } else {
        // Обрабатываем все другие ошибки
        console.error(error);
        return res.status(500).json({ message: 'Произошла ошибка при создании задачи' });
      }
    }
  }

  async getAll(req, res) {
    const task = await Task.findAll();

    return res.json(task);
  }

  async getOne(req, res) {}
}

module.exports = new TaskController();
