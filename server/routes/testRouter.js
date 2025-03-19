const Router = require("express");
const router = new Router();
const testController = require("../controllers/testController");
const checkRole = require("../middleware/chekRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", checkRole("ADMIN"), testController.create); // add checkRole("Admin")
router.get("/:taskId", testController.getAll);
router.get("/:id", testController.getOne);

module.exports = router;
