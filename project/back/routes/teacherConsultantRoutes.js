
const express = require('express');
const router = express.Router();
const teacherConsultantController = require('../controllers/teacherConsultantController')
const knex = require('../knex-config');

router.get('/AllTeacher', teacherConsultantController.getAllTeacher );
router.get('/TeacherDetails/:id', teacherConsultantController.getTeacherDetails );
router.post('/consultation-requests' , teacherConsultantController.consultationRequests)
router.get('/consultant/:consultantId/requests', teacherConsultantController.consultatRrqProfile );
router.get('/teacher/:teacherId/requests', teacherConsultantController.teacherReqProfile );






// Route for consultants to add a pricing plan
router.post('/pricing-plan', async (req, res) => {
    const { consultantId, requestType, price, description } = req.body;
    
    if (!consultantId || !requestType || !price) {
        return res.status(400).json({ error: 'Consultant ID, request type, and price are required' });
    }

    try {
        const pricingPlanId = await knex('pricing_plans')
            .insert({
                consultant_id: consultantId,
                request_type: requestType,
                price: price,
                description: description
            })
            .returning('id');

        res.status(201).json({ message: 'Pricing plan added successfully', id: pricingPlanId });
    } catch (error) {
        console.error('Error adding pricing plan:', error);

        const errorMessage = error.code === '23505' 
            ? 'Request type already exists for this consultant.' 
            : 'Server error';
        
        res.status(500).json({ error: errorMessage });
    }
});

router.get('/pricing-plans', async (req, res) => {
    const { consultant_id } = req.query;

    try {
        let query = knex('pricing_plans').select('*');

        // إذا تم توفير consultant_id، يتم التصفية حسبه
        if (consultant_id) {
            query = query.where('consultant_id', consultant_id);
        }

        const pricingPlans = await query;
        res.status(200).json(pricingPlans);
    } catch (error) {
        console.error('Error fetching pricing plans:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء جلب خطط الأسعار' });
    }
});

// إنشاء طلب استشارة من معلم إلى مستشار
router.post('/request-consultation', async (req, res) => {
    try {
        const {
            teacher_id,
            consultant_id,
            user_id,
            request_type,
            description,
            file_url,
            payment_amount,
            payment_status = 'pending', // حالة الدفع الافتراضية
            pricing_plan_id
        } = req.body;

        // تحقق من الحقول المطلوبة
        if (!teacher_id || !request_type || !pricing_plan_id) {
            return res.status(400).json({ message: 'يرجى تعبئة جميع الحقول المطلوبة: teacher_id, request_type, pricing_plan_id' });
        }

        // إضافة طلب استشارة إلى قاعدة البيانات
        const [consultationRequestId] = await knex('consultation_requests').insert({
            teacher_id,
            consultant_id,
            user_id,
            request_type,
            description,
            file_url,
            payment_amount,
            payment_status,
            is_completed: false, // الحالة الافتراضية للطلب
            isActive: true,
            pricing_plan_id
        }).returning('id');

        res.status(201).json({ message: 'تم إنشاء طلب الاستشارة بنجاح', consultationRequestId });
    } catch (error) {
        console.error('Error creating consultation request:', error);
        res.status(500).json({ message: 'حدث خطأ أثناء إنشاء طلب الاستشارة' });
    }
});




// // Route to get consultation requests for a specific consultant along with the teacher's details
// router.get('/consultants/:consultantId/requests', async (req, res) => {
//     const { consultantId } = req.params;

//     try {
//         const requests = await knex('consultation_requests as cr')
//             .select(
//                 'cr.*',  // Select all fields from consultation_requests
//                 't.id as teacher_id', 
//                 't.name as teacher_name', 
//                 't.email as teacher_email', 
//                 't.phone_number as teacher_phone_number', 
//                 't.specialization as teacher_specialization'
//             )
//             .leftJoin('teacher as t', 'cr.teacher_id', 't.id')  // Join with teacher table
//             .where('cr.consultant_id', consultantId)
//             .andWhere('cr.isActive', true);
        
//         return res.json(requests);
//     } catch (error) {
//         console.error('Error fetching consultation requests:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Route to get consultation requests for a specific consultant along with the teacher's and pricing details
router.get('/consultants/:consultantId/requests', async (req, res) => {
    const { consultantId } = req.params;

    try {
        const requests = await knex('consultation_requests as cr')
            .select(
                'cr.*', // Select all fields from consultation_requests
                't.id as teacher_id', 
                't.name as teacher_name', 
                't.email as teacher_email', 
                't.phone_number as teacher_phone_number', 
                't.specialization as teacher_specialization',
                'pp.price as pricing_plan_price' // Add the price field from pricing_plans
            )
            .leftJoin('teacher as t', 'cr.teacher_id', 't.id') // Join with teacher table
            .leftJoin('pricing_plans as pp', 'cr.pricing_plan_id', 'pp.id') // Join with pricing_plans table
            .where('cr.consultant_id', consultantId)
            .andWhere('cr.isActive', true);

        return res.json(requests);
    } catch (error) {
        console.error('Error fetching consultation requests:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Route to create a response to a consultation request

router.post('/responses', async (req, res) => {
    const {
        request_id,
        teacher_id,
        consultant_id,
        pdf_url,
        image_url,
        payment_status,
    } = req.body;

    try {
        // Insert the response into the responses table with status set to 'Completed'
        const responseId = await knex('responses')
            .insert({
                request_id,
                teacher_id,
                consultant_id,
                pdf_url,
                image_url,
                payment_status,
                status: 'Completed',  // Set status to 'Completed' upon insertion
                created_at: knex.fn.now(),
                updated_at: knex.fn.now(),
            })
            .returning('id');

        // Update the consultation request to mark it as completed
        const updateCount = await knex('consultation_requests')
            .where({ id: request_id })
            .update({
                is_completed: true,
                updated_at: knex.fn.now(),
            });

        console.log("Number of rows updated in consultation_requests:", updateCount);

        return res.status(201).json({ id: responseId });
    } catch (error) {
        console.error('Error creating response and updating request status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});




// Get responses for a specific teacher, including request details
router.get('/responses/teacher/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;
        
        const responses = await knex('responses')
            .where('responses.teacher_id', teacherId)
            .andWhere('responses.isActive', true) // Only fetch active responses
            .join('consultation_requests', 'responses.request_id', 'consultation_requests.id')
            .select(
                'responses.*',
                'consultation_requests.request_type',
                'consultation_requests.description as request_description',
                'consultation_requests.file_url as request_file_url',
                'consultation_requests.payment_amount as request_payment_amount',
                'consultation_requests.payment_status as request_payment_status'
            );

        res.json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: 'Failed to fetch responses' });
    }
});



// Post feedback and rating on a response
router.post('/responses/:responseId/feedback', async (req, res) => {
    const { responseId } = req.params;
    const { feedback_text, rating } = req.body;

    try {
        await knex('responses')
            .where('id', responseId)
            .update({
                feedback_text,
                rating,
                updated_at: knex.fn.now(),
                payment_status: 'Paid' // Assuming payment is made
            });

        res.status(200).json({ message: 'Feedback and rating submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

module.exports = router;
