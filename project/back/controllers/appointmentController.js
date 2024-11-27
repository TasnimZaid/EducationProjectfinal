const knex = require('../knex-config');

exports.getConsultantAppointments = async (req, res) => {
    const { consultantId } = req.params;

    try {
        // Fetch appointments with teacher details for the given consultant
        const appointments = await knex('appointments as a')
            .join('consultant_availability as ca', 'a.availability_id', 'ca.id')
            .join('teacher as t', 'a.teacher_id', 't.id')
            .select(
                'a.id as appointment_id',
                'a.status as appointment_status',
                'a.notes as appointment_notes',
                'ca.date as appointment_date',
                'ca.time_slot as appointment_time',
                't.id as teacher_id',
                't.name as teacher_name',
                't.email as teacher_email'
            )
            .where('ca.consultant_id', consultantId)
            .andWhere('a.is_deleted', false)
            .andWhere('ca.is_deleted', false);

        // Get total count of appointments
        const totalAppointments = appointments.length;

        // Get unique count of teachers
        const uniqueTeachers = await knex('appointments as a')
            .join('consultant_availability as ca', 'a.availability_id', 'ca.id')
            .countDistinct('a.teacher_id as total_unique_teachers')
            .where('ca.consultant_id', consultantId)
            .andWhere('a.is_deleted', false)
            .andWhere('ca.is_deleted', false)
            .first();

        const totalTeachers = uniqueTeachers.total_unique_teachers;

        // Check if any appointments found
        if (totalAppointments === 0) {
            return res.status(404).json({ message: 'No appointments found for this consultant.' });
        }

        // Send response with appointment details, total appointments, and total unique teachers
        res.json({
            total_appointments: totalAppointments,
            total_teachers: totalTeachers,
            appointments: appointments,
        });
    } catch (error) {
        console.error('Error fetching consultant appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.bookConsultantAppointment = async (req, res) => {
  const { teacher_id, consultant_id, availability_id, notes, num_beneficiaries, description } = req.body;

  try {
    const response = await knex.transaction(async (trx) => {
      const updatedAvailability = await trx('consultant_availability')
        .where({
          id: availability_id,
          consultant_id: consultant_id,
          is_available: true,
          is_booked: false
        })
        .update({ is_booked: true })
        .returning(['id', 'date', 'time_slot']);

      if (updatedAvailability.length === 0) {
        throw new Error('Appointment slot already booked or not available.');
      }

      const [appointment] = await trx('appointments')
        .insert({
          teacher_id,
          consultant_id,
          availability_id,
          notes,
          num_beneficiaries,
          description,
          status: 'scheduled'
        })
        .returning('*');

      const [consultant] = await trx('teacher')
        .select('name')
        .where({ id: consultant_id });

      return {
        message: 'Consultant appointment booked successfully.',
        appointment: {
          ...appointment,
          consultant_name: consultant?.name || 'Unknown',
          date: updatedAvailability[0].date,
          time_slot: updatedAvailability[0].time_slot
        },
      };
    });

    return res.status(201).json(response);
  } catch (error) {
    console.error('Error booking consultant appointment:', error);
    if (error.message === 'Appointment slot already booked or not available.') {
      return res.status(400).json({ message: error.message });
    }
    // Adjust constraint checking based on your schema
    if (error.code === '23505') { // PostgreSQL unique violation error code
      return res.status(400).json({ message: 'You have already booked this appointment.' });
    }
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



// exports.bookConsultantAppointment = async (req, res) => {
//     const { teacher_id, consultant_id, availability_id, notes } = req.body;
  
//     try {
//       // Start a transaction
//       await knex.transaction(async (trx) => {
//         // 1. Update ConsultantAvailability table to mark the appointment as booked
//         const updatedAvailability = await trx('consultant_availability')
//           .where({
//             id: availability_id,
//             consultant_id: consultant_id,
//             is_available: true,
//             is_booked: false
//           })
//           .update({ is_booked: true })
//           .returning(['id', 'date', 'time_slot']);
  
//         // Check if the slot was successfully booked
//         if (updatedAvailability.length === 0) {
//           throw new Error('Appointment slot already booked or not available.');
//         }
  
//         // 2. Insert into Appointments table
//         const [appointment] = await trx('appointments')
//           .insert({
//             teacher_id,
//             consultant_id,
//             availability_id,
//             notes,
//             status: 'scheduled' // Assuming you want to set an initial status
//           })
//           .returning('*');
  
//         // 3. Fetch consultant's name
//         const [consultant] = await trx('teacher')
//           .select('name')
//           .where({ id: consultant_id });
  
//         // Prepare the response
//         const response = {
//           message: 'Consultant appointment booked successfully.',
//           appointment: {
//             ...appointment,
//             consultant_name: consultant?.name || 'Unknown',
//             date: updatedAvailability[0].date,
//             time_slot: updatedAvailability[0].time_slot
//           },
//         };
  
//         // If we get here, no errors were thrown, so we commit the transaction
//         return response;
//       });
  
//       // Send the response back to the client
//       return res.status(201).json(response);
//     } catch (error) {
//       console.error('Error booking consultant appointment:', error);
//       if (error.message === 'Appointment slot already booked or not available.') {
//         return res.status(400).json({ message: error.message });
//       }
//       if (error.constraint === 'appointments_teacher_id_consultant_id_availability_id_key') {
//         return res.status(400).json({ message: 'You have already booked this appointment.' });
//       }
//       return res.status(500).json({ message: 'Internal server error.' });
//     }
//   };