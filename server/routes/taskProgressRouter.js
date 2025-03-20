const Router = require("express");
const router = new Router();
const taskProgressController = require("../controllers/taskProgressController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", taskProgressController.update);
router.get("/", authMiddleware, taskProgressController.getAll);
router.get("/:id", authMiddleware, taskProgressController.getOne);

module.exports = router;
