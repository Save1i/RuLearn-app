require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const modules = require("./modules/modules");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandingMinddleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

// обработчик ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    console.log(process.env.DATABASE_URL);
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`str ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
