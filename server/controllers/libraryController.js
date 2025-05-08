const {Library} = require('../modules/modules')
const { Dictionary } = require("../modules/modules");
const ApiError = require('../error/apiError')

class LibraryController {
    async create(req, res) {
        try {
            const {userId, dictionaryId} = req.body;
            if(!userId || !dictionaryId) return res.status(400)

            const library = await Library.create({userId, dictionaryId});
            return res.json({library, message: "Словарь успешно добавлен"});

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Обрабатываем ошибку дублирования уникального значения
                console.log('Словарь уже находится в библиотеки');
                return res.status(400).json({ message: 'Словарь уже находится в библиотеки' });
            } else {
                // Обрабатываем все другие ошибки
                console.error(error);
                return res.status(500).json({ message: 'Произошла ошибка при создании задачи' });
            }
        }
    }
    
    async getAll(req, res) {
        let { userId } = req.query;

        if (!userId) {
          return res.status(400).json({ error: "userId is required" });
        }

        try {
            const library = await Dictionary.findAll({
                 attributes: ["id", "name"],
                        include: [
                          {
                            model: Library,
                            as: "library",
                            attributes: ["dictionaryId"],
                            where: { userId },
                            required: false,
                            order: [["createdAt", "DESC"]],
                            limit: 1,
                          },
                        ],
            })

            const result = library.map((lib) => ({
                id: lib.id, 
                name: lib.name,
                choose: lib.library && lib.library.length > 0 ? true : false,
            }))

            return res.json(result);

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Обрабатываем ошибку дублирования уникального значения
                console.log('Задача с таким именем уже существует');
                return res.status(400).json({ message: 'Задача с таким именем уже существует' });
            } else {
                // Обрабатываем все другие ошибки
                console.error(error);
                return res.status(500).json({ message: 'Произошла ошибка при создании задачи' });
            }
        }
    }

    async getOne(req, res) {
        try {
            const {userId} = req.query;
            console.log(userId);

            const libraries = await Library.findAll({
                where: { userId: Number(userId) },
                attributes: ["id", "userId", "dictionaryId"],
                include: [
                  {
                    model: Dictionary,
                    attributes: ["name"],
                    as: "dictionary",
                    required: false,
                  },
                ],
              });

              const result = libraries.map((library) => ({
                userId: library.userId,
                dictionaryId: library.dictionaryId,
                name: library.dictionary.name
              })) 
            return res.json(result);

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Обрабатываем ошибку дублирования уникального значения
                console.log('Задача с таким именем уже существует');
                return res.status(400).json({ message: 'Задача с таким именем уже существует' });
            } else {
                // Обрабатываем все другие ошибки
                console.error(error);
                return res.status(500).json({ message: 'Произошла ошибка при создании задачи' });
            }
        }
    }

    async deleteOne(req, res) {
        try {
            const {userId, dictionaryId} = req.query;

              const libraries = await Library.destroy({
                where: {userId, dictionaryId}
              })

              if(libraries === 0) {
                return res.json({message: "Словарь не найден или уже удалён"})
              }
            return res.json({message: "Словарь успешно удален"});

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                // Обрабатываем ошибку дублирования уникального значения
                console.log('Задача с таким именем уже существует');
                return res.status(400).json({ message: 'Задача с таким именем уже существует' });
            } else {
                // Обрабатываем все другие ошибки
                console.error(error);
                return res.status(500).json({ message: 'Произошла ошибка при создании задачи' });
            }
        }
    }
}

module.exports = new LibraryController()
