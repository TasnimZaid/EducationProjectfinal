
const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();

router.get('/appointments/:consultantId', appointmentController.getConsultantAppointments);
router.post('/book', appointmentController.bookConsultantAppointment);

module.exports = router;
