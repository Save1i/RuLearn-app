const Router = require("express");
const router = new Router();
const testController = require("../controllers/testController");
const checkRole = require("../middleware/chekRoleMiddleware"); // Это можно оставить, если нужно
// const authMiddleware = require("../middleware/AuthMiddleware"); // Убираем

router.post("/", testController.create); // можно добавить checkRole("Admin")
router.get("/:taskId", testController.getAll); // убрали authMiddleware
router.get("/:id", testController.getOne); // убрали authMiddleware

module.exports = router;
