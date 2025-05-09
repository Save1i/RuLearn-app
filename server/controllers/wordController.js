const { Word, Dictionary, Library, WordProgress } = require('../modules/modules');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');

class WordController {
  async create(req, res) {
    try {
      const { word_source, word_target, dictionaryId } = req.body;

      if (!dictionaryId) {
        return res.status(400).json({ message: "dictionaryId обязателен" });
      }

      const word = await Word.create({
        word_source: word_source || 'CHS',
        word_target: word_target || 'RU',
        dictionaryId,
      });

      res.json(word);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при создании слова" });
    }
  }

  async getAll(req, res, next) {
    try {
      let {userId, limit, page} = req.query;

      page = page || 1;
      limit = limit || 1;
      let offset = page * limit - limit;
      let word;

      const libraries = await Library.findAll({
        where: { userId }     
      });
      const dictionaryIds = libraries.map(lib => lib.dictionaryId);
      
      word = await Word.findAndCountAll(
        {where: {
          dictionaryId: {
            [Op.in]: dictionaryIds,
          },
        }, limit, offset});

      if (!word) {
        return res.status(404).json({ message: "Слово не найдено" });
      }

      res.json(word);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении слова" });
    }
  }

  async getAllNew(req, res, next) {
    try {
      let {userId} = req.query;
      let word;

      const libraries = await Library.findAll({
        where: { userId }     
      });
      const dictionaryIds = libraries.map(lib => lib.dictionaryId);
      const allword = await Word.findAll(
        {where: {
          dictionaryId: {
            [Op.in]: dictionaryIds,
          },
        }});
        const allWordsId = allword.map(word => word.id);

      const dueWords = await WordProgress.findAll({
        where: {
          userId,
        }
      })
      const learnedWordIds = dueWords.map(word => word.wordId);

      const lId = new Set(learnedWordIds)
      const wordIds = allWordsId.filter((e) => !lId.has(e))

      word = await Word.findAll(
        {where: {
          id: {
            [Op.in]: wordIds,
          },
        }});

      if (!word) {
        return res.status(404).json({ message: "Слово не найдено" });
      }

      res.json(word);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении слова(" });
    }
  }

  async getNewWord(req, res, next) {
    try {
      let {userId, limit, page} = req.query;

      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;
      let word;

      const libraries = await Library.findAll({
        where: { userId }     
      });
      const dictionaryIds = libraries.map(lib => lib.dictionaryId);
      const allword = await Word.findAll(
        {where: {
          dictionaryId: {
            [Op.in]: dictionaryIds,
          },
        }});
        const allWordsId = allword.map(word => word.id);

      const dueWords = await WordProgress.findAll({
        where: {
          userId,
        }
      })
      const learnedWordIds = dueWords.map(word => word.wordId);

      const lId = new Set(learnedWordIds)
      const wordIds = allWordsId.filter((e) => !lId.has(e))

      word = await Word.findAndCountAll(
        {where: {
          id: {
            [Op.in]: wordIds,
          },
        }, limit, offset});

      if (!word) {
        return res.status(404).json({ message: "Слово не найдено" });
      }

      res.json(word);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении слова(" });
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      
      const word = await Word.findByPk(id);

      if (!word) {
        return res.status(404).json({ message: "Слово не найдено" });
      }

      res.json(word);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении слова" });
    }
  }
  
}

module.exports = new WordController();
