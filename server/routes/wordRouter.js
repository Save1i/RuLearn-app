const Router = require("express");
const router = new Router();
const wordController = require("../controllers/wordController");
// const checkRole = require("../middleware/chekRoleMiddleware"); // Это можно оставить, если нужно
// const authMiddleware = require("../middleware/AuthMiddleware"); // Убираем

router.post("/", wordController.create); // можно добавить checkRole("Admin")
router.get("/", wordController.getAll); // убрали authMiddleware
router.get("/new", wordController.getAllNew); // убрали authMiddleware
router.get("/new-word", wordController.getNewWord); // убрали authMiddleware
router.get("/:id", wordController.getOne); // убрали authMiddleware

module.exports = router;
