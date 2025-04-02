const { createClient } = require("@supabase/supabase-js");
const { Test } = require("../modules/modules");
const ApiError = require("../error/apiError");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

class TestController {
    async create(req, res, next) {
        try {
            const { name, text_q, options, correct_answer, taskId } = req.body;
            if (!name || !text_q || !options || !correct_answer || !taskId) {
                return next(ApiError.badRequest("Заполните все обязательные поля"));
            }

            let imgUrl = null;
            if (req.files && req.files.img) {
                const img = req.files.img;
                const filePath = `uploads/${Date.now()}_${img.name}`;

                // Загружаем файл в Supabase
                const { error } = await supabase.storage
                    .from("test-images")
                    .upload(filePath, img.data, {
                        contentType: img.mimetype,
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (error) throw error;

                // Получаем публичный URL
                imgUrl = supabase.storage
                    .from("test-images")
                    .getPublicUrl(filePath);
            }

            const test = await Test.create({
                name,
                text_q,
                options,
                correct_answer,
                img: imgUrl,
                taskId,
            });

            return res.json(test);
        } catch (e) {
            console.error("Ошибка в create:", e);
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TestController();
