const express = require('express') ;
const paymentController = require('../controllers/payment')
const router = express.Router() ;


router.post('/payments', paymentController.createPayment);
router.get('/teacher/:teacher_id/earnings', paymentController.getTeacherEarnings);
router.get('/site/earnings', paymentController.getSiteEarnings);

module.exports = router;