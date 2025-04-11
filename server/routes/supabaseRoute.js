const Router = require("express");
const router = new Router();
const supabaseController = require("../controllers/supabaseController");

router.post("/", supabaseController.create);
router.get('/:id', supabaseController.getOne)

module.exports = router;
