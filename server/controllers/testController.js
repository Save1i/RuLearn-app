const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY);

const uuid = require("uuid");
const path = require("path");

const { Test } = require("../modules/modules");
const ApiError = require("../error/apiError");

class TestController {
  async create(req, res, next) {
    try {
      const { name, text_q, options, correct_answer, taskId, img, audio_q} = req.body;
    
      const test = await Test.create({
        name,
        text_q,
        options,
        correct_answer,
        img,
        audio_q,
        taskId,
      });

      return res.json(test);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { taskId } = req.params;
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 1;
    let offset = page * limit - limit;
    let test;

    if (taskId) {
      test = await Test.findAndCountAll({ where: { taskId }, limit, offset });
    }

    if (!taskId) {
      return res.status(404).json({ error: "Тест не найден" });
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