const { WordProgress, Word } = require('../modules/modules');
const ApiError = require("../error/apiError");

class WordProgressController {
  async create(req, res, next) {
    console.log('req.body:', req.body);  // Проверяем, что приходит в теле запроса
    try {
      const { wordId, userId, remembered } = req.body;
  
      if (!wordId || !userId || remembered === undefined) {
        return next(ApiError.badRequest("wordId, userId и remembered обязательны"));
      }
  
      let progress = await WordProgress.findOne({ where: { wordId, userId } });
      const today = new Date();
  
      if (!progress) {
        // Создание записи прогресса
        const nextReview = remembered ? addDays(today, 1) : today;
  
        progress = await WordProgress.create({
          wordId,
          userId,
          last_seen: today,
          next_review: nextReview,
          interval: remembered ? 1 : 0,
          repetition: remembered ? 1 : 0,
          ease_factor: 2.5,
          status: "learning",
        });
  
        return res.json(progress);
      }
  
      // Обновление существующего прогресса
      if (!remembered) {
        progress.interval = 1;
        progress.repetition = 0;
        progress.ease_factor = 2.5;
        progress.next_review = addDays(today, 1);
        progress.last_seen = today;
        progress.status = "learning";
      } else {
        progress.repetition += 1;
        progress.ease_factor = Math.max(1.3, progress.ease_factor - 0.2);
        progress.interval = calculateInterval(progress.repetition, progress.ease_factor);
        progress.next_review = addDays(today, progress.interval);
        progress.last_seen = today;
        progress.status = "learning";
      }
  
      await progress.save();
      return res.json(progress);
    } catch (error) {
      next(ApiError.internal("Ошибка при обновлении прогресса слова"));
    }
  }
  

  // Обновление прогресса по слову (вспомнил / не вспомнил)
async update(req, res, next) {
    try {
      const { wordId, userId, remembered } = req.body;
  
      if (typeof remembered !== "boolean" || wordId === undefined || userId === undefined) {
        return next(ApiError.badRequest("Нужно передать userId, wordId и remembered (boolean)"));
      }
  
      const progress = await WordProgress.findOne({ where: { wordId, userId } });
      if (!progress) {
        return next(ApiError.badRequest("Прогресс по слову не найден"));
      }
  
      let { repetition, ease_factor, interval } = progress;
      const today = new Date();
  
      if (!remembered) {
        // Если не вспомнил — сбрасываем всё
        repetition = 0;
        interval = 1;
        ease_factor = 2.5;
      } else {
        // Если вспомнил — увеличиваем интервалы
        if (repetition === 0) {
          interval = 1;
        } else if (repetition === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * ease_factor);
        }
  
        repetition += 1;
  
        // Немного уменьшаем ease_factor при каждой итерации, чтобы был реалистичный рост
        ease_factor = Math.max(1.3, ease_factor - 0.05);
      }
  
      const next_review = new Date(today);
      next_review.setDate(today.getDate() + interval);
  
      progress.repetition = repetition;
      progress.ease_factor = ease_factor;
      progress.interval = interval;
      progress.last_seen = today;
      progress.next_review = next_review;
  
      await progress.save();
      return res.json(progress);
  
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  

  // Получение слов, которые нужно повторить
  async getDueWords(req, res, next) {
    try {
      const { userId } = req.query;

      if (!userId) {
        return next(ApiError.badRequest("Нужен userId"));
      }

      const today = new Date()

      const dueWords = await WordProgress.findAll({
        where: {
          userId,
          next_review: {
            [require("sequelize").Op.lte]: today,
          },
        },
        include: [Word],
      });

      res.json(dueWords);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

// 📌 Вспомогательные функции
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  function calculateInterval(repetition, easeFactor) {
    if (repetition === 1) return 1;
    if (repetition === 2) return 6;
    return Math.round((calculateInterval(repetition - 1, easeFactor)) * easeFactor);
  }

module.exports = new WordProgressController();
