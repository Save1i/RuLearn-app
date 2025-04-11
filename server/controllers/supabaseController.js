const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY);

const uuid = require("uuid");
const { Section } = require("../modules/modules");
const ApiError = require("../error/apiError");

class SupabaseController {
  async create(req, res, next) {
    try {
      const file = req.files.file;  // Получаем файл
      console.log(file);

      const fileName = uuid.v4() + ".png";
      const supabases = await Section.create({name: fileName});

      // Загружаем файл в Supabase
      const { data, error } = await supabase
        .storage
        .from('static')
        .upload(fileName, Buffer.from(file.data), {
          upsert: false,
          contentType: file.mimetype
        });

      if (error) {
        console.error("Error uploading file to Supabase:", error);
        return next(ApiError.badRequest("Ошибка загрузки файла на Supabase"));
      }

      console.log("File successfully uploaded to Supabase:", data);
      return res.json(supabases); 
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params; 

      const file = await Section.findOne({ where: { id } });

      if (!file) {
        return res.status(404).json({ error: "Тест не найден" });
      }

      return res.json(file);
    } catch (error) {
      console.error("Error in getOne:", error);
      next(error);
    }
  }
}


module.exports = new SupabaseController()