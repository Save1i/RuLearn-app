const Router = require("express");
const router = new Router();
const taskController = require("../controllers/taskController");
const checkRole = require("../middleware/chekRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", checkRole("ADMIN"), taskController.create);
router.get("/", authMiddleware, taskController.getAll);
router.get("/:id", authMiddleware, taskController.getOne);

module.exports = router;
