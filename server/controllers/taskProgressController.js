const { Task_progress, Test_progress, Test, Task } = require("../modules/modules");
const ApiError = require("../error/apiError");

class TaskProgressController {
  async update(req, res, next) {
    try {
      const { userId, taskId } = req.body;

      if (!userId || !taskId) {
        return res.status(400).json({ error: "userId и taskId обязательны" });
      }

      // Проверка, есть ли тесты вообще
      const totalTests = await Test.count({ where: { taskId } });
      if (totalTests === 0) {
        return res.status(400).json({ error: "У этой задачи нет тестов" });
      }

      let existingRecord = await Task_progress.findOne({ where: { userId, taskId } });

      if (!existingRecord) {
        await Task_progress.create({
          userId,
          taskId,
          status: "learned",
          learned: true,
        });

        return res.status(201).json({ message: "Запись создана", status: "learned" });
      }

      await existingRecord.update({ status: "learned", learned: true });

      return res.json({ message: "Задача обновлена", status: "learned" });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      let { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const tasks = await Task.findAll({
        attributes: ["id", "name", "type", "duration", "sectionId", "availability"],
        include: [
          {
            model: Task_progress,
            as: "progress",
            attributes: ["learned"],
            where: { userId },
            required: false,
            order: [["createdAt", "DESC"]],
            limit: 1,
          },
        ],
      });

      const result = tasks.map((task) => ({
        id: task.id,
        name: task.name,
        type: task.type,
        duration: task.duration,
        sectionId: task.sectionId,
        learned: task.progress && task.progress.length > 0 ? task.progress[0].learned : false,
        availability: task.availability
      }));

      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id: taskId } = req.params;
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const task = await Task.findOne({
        where: { id: taskId },
        include: [
          {
            model: Task_progress,
            as: "progress",
            where: { userId },
            attributes: ["status", "learned"],
            required: false,
          },
        ],
      });

      if (!task) {
        return res.status(404).json({ error: "Задание не найдено" });
      }

      const progress = task.progress && task.progress.length > 0 ? task.progress[0] : null;

      return res.json({
        task_id: task.id,
        task_name: task.name,
        progress_status: progress ? progress.status : "not_started",
        learned: progress ? progress.learned : false,
      });
    } catch (error) {
      console.error("Error in getOne:", error);
      next(error);
    }
  }
}

module.exports = new TaskProgressController();
