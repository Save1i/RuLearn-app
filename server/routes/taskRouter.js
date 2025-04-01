const Router = require("express");
const router = new Router();
const taskController = require("../controllers/taskController");
const checkRole = require("../middleware/chekRoleMiddleware");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", taskController.create);
router.get("/", taskController.getAll);
router.get("/:id", authMiddleware, taskController.getOne);

module.exports = router;
