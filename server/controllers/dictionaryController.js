const { Dictionary, Word } = require('../modules/modules');
const ApiError = require('../error/apiError');

class DictionaryController {
    async create(req, res) {
        try {
            const { name, source_language, target_language } = req.body;

            if (!name ) {
                return res.status(400).json({ message: "Имя словаря обязательно" });
            }

            const dictionary = await Dictionary.create({
                name,
                source_language: source_language || 'CHS',
                target_language: target_language || 'RU',
            });

            return res.json(dictionary);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ message: 'Словарь с таким именем уже существует' });
            }
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при создании словаря' });
        }
    }

    async getAll(req, res) {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({ message: "Не указан userId" });
            }

            const dictionaries = await Dictionary.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']]
            });

            return res.json(dictionaries);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении словарей' });
        }
    }
    async getOne(req, res) {
        try {
            const { dictionaryId } = req.query;
      
            if (!dictionaryId) {
              return res.status(400).json({ message: "Не указан dictionaryId" });
            }
      
            const words = await Word.findAll({
              where: { dictionaryId },
              order: [['createdAt', 'ASC']]
            });
      
            res.json(words);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Ошибка при получении слов" });
          }
        }
}

module.exports = new DictionaryController();
