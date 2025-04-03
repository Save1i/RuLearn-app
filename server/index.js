require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const modules = require("./modules/modules");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandingMinddleware");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

// Настроим CORS
app.use(cors());

// Тестовый маршрут
app.get('/', (req, res) => {
  res.status(200).json({message: "YOOOOOO!"});
});

// Middleware для обработки файлов с лимитом размера 50 MB
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
}));

// Middleware для обработки JSON и статичных файлов
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static"))); // Путь для статичных файлов

// Ваши маршруты
app.use("/api", router);

// Обработчик ошибок, последний middleware
app.use(errorHandler);

// Запуск сервера
const start = async () => {
  try {
    console.log(process.env.DATABASE_URL);  // Убедитесь, что переменные окружения правильные
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
