const router = require('express').Router();
const { isAdmin } = require('../middlewares/authorize');
const TransactionController = require('../controllers/transaction-controller');

router.get('/', isAdmin, TransactionController.list);
router.get('/user-transaction', TransactionController.findBelongs);
router.post('/', TransactionController.create);
router.patch('/change/:id/:status', TransactionController.changeStatus);

module.exports = router;