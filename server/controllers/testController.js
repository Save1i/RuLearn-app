const { createClient } = require('@supabase/supabase-js');
const uuid = require("uuid");
const path = require("path");
const { Test } = require("../modules/modules");
const ApiError = require("../error/apiError");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

class TestController {
  async create(req, res, next) {
    try {
      const { name, text_q, options, correct_answer, taskId } = req.body;
      
      if (!req.files?.img) {
        return next(ApiError.badRequest("No image file provided"));
      }

      const img = req.files.img;
      let fileName = uuid.v4() + path.extname(img.name);

      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('static')
        .upload(fileName, img.data, {
          contentType: img.mimetype,
          upsert: false
        });

      if (uploadError) {
        return next(ApiError.badRequest(uploadError.message));
      }

      // Handle audio file if present
      let audioFileName = null;
      if (req.files?.audio_q) {
        const audio = req.files.audio_q;
        audioFileName = uuid.v4() + path.extname(audio.name);
        
        const { error: audioError } = await supabase
          .storage
          .from('static')
          .upload(audioFileName, audio.data, {
            contentType: audio.mimetype
          });
          
        if (audioError) {
          return next(ApiError.badRequest(audioError.message));
        }
      }

      // Create database record - ensure RLS policies allow this
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