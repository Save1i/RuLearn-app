const Router = require('express');
const router = new Router();
const wordProgressController = require('../controllers/wordProgressController');

router.post('/create', wordProgressController.create);
router.put('/update', wordProgressController.update);
router.get('/due', wordProgressController.getDueWords);

module.exports = router;
