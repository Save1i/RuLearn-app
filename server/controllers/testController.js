const uuid = require("uuid");
const path = require("path");

const { Test } = require("../modules/modules");
const ApiError = require("../error/apiError");

class TestController {
  async create(req, res, next) {
    try {
      const { name, text_q, options, correct_answer, taskId } = req.body;

      const { img } = req.files;
      let fileName = uuid.v4() + ".png";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const { audio_q } = req.files;
      let audioFileName = uuid.v4() + ".mp3";
      audio_q.mv(path.resolve(__dirname, "..", "static", audioFileName));

      const test = await Test.create({
        name,
        text_q,
        options,
        correct_answer,
        img: fileName,
        audio_q: audioFileName,
        taskId,
      });
      return res.json(test);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { taskId } = req.params;
    let test;

    if (taskId) {
      test = await Test.findAll({ where: { taskId } });
    }

    if (!taskId) {
      test = await Test.findAll();
    }

    return res.json(test);
  }

  async getOne(req, res, next) {
    try {
      const { id: testId } = req.params; // testId теперь берется из params

      const test = await Test.findOne({ where: { id: testId } });

      if (!test) {
        return res.status(404).json({ error: "Тест не найден" });
      }

      return res.json(test);
    } catch (error) {
      console.error("Error in getOne:", error);
      next(error);
    }
  }
}

module.exports = new TestController();
