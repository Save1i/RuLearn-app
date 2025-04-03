const { Task } = require("../modules/modules");
const ApiError = require("../error/apiError");

class TaskController {
  async create(req, res) {
    try {
    const { name, type, duration, sectionId } = req.body;

    const task = await Task.create({ name, type, duration, sectionId});
    return res.json(task);
    } 
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          // Обработать ошибку дублирования
          console.log('Задача с таким именем уже существует');
        } else {
          // Обработать другие ошибки
          console.log(error);
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
