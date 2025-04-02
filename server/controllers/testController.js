const { createClient } = require("@supabase/supabase-js");
const { Test } = require("../modules/modules");
const ApiError = require("../error/apiError");
const path = require("path");
const fs = require("fs");

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
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
                const { data, error } = await supabase.storage
                    .from("test-images")
                    .upload(filePath, img.data, { contentType: img.mimetype });

                if (error) throw error;
                imgUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/test-images/${filePath}`;
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
