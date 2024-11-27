const express = require('express') ;
const consultantAvailability = require('../controllers/consultantAvailability')
const router = express.Router() ;

const knex = require('../knex-config');


router.post('/availability', consultantAvailability.addConsultantAvailability);
router.get('/availability/:consultantId', consultantAvailability.getConsultantAvailability);
router.patch('/availability/:id', consultantAvailability.editConsultantAvailability);
router.delete('/availability/:id', consultantAvailability.deleteConsultantAvailability);
router.get('/availability', consultantAvailability.getAllConsultantAvailability);


router.get('/consultant/:id/appointments', async (req, res) => {
    const consultantId = req.params.id;

    try {
        const appointments = await knex('appointments')
            .join('consultant_availability', 'appointments.availability_id', 'consultant_availability.id')
            .where('appointments.consultant_id', consultantId)
            .select(
                'appointments.id',
                'appointments.teacher_id',
                'appointments.status',
                'appointments.notes',
                'appointments.description',
                'consultant_availability.date',
                'consultant_availability.time_slot'
            );

        res.json(appointments);
    } catch (error) {
        console.error(error); // تسجيل الخطأ في وحدة التحكم
        res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = router;