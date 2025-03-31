const Router = require("express");
const router = new Router();
const testController = require("../controllers/testController");
const checkRole = require("../middleware/chekRoleMiddleware");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", testController.create); // add checkRole("Admin")
router.get("/:taskId", authMiddleware, testController.getAll);
router.get("/:id", authMiddleware, testController.getOne);

module.exports = router;
