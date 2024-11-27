// controllers/consultantAvailabilityController.js
const knex = require('../knex-config');

const addConsultantAvailability = async (req, res) => {
  const { consultant_id, date, time_slot, is_available, zoom_link } = req.body; // Include zoom_link

  try {
    const [result] = await knex('consultant_availability')
      .insert({ consultant_id, date, time_slot, is_available, zoom_link }) // Save zoom_link
      .returning('*');
      
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// const getConsultantAvailability = async (req, res) => {
//   const consultantId = req.params.consultantId;
//   const { date } = req.query;

//   if (!consultantId) {
//     return res.status(400).json({ error: 'consultant_id is required' });
//   }

//   try {
//     let query = knex('consultant_availability')
//       .where({ consultant_id: consultantId, is_deleted: false });

//     if (date) {
//       query = query.andWhere({ date });
//     }

//     const result = await query.select('*');
//     res.status(200).json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

const getConsultantAvailability = async (req, res) => {
  const consultantId = req.params.consultantId;
  const { date } = req.query;

  if (!consultantId) {
    return res.status(400).json({ error: 'consultant_id is required' });
  }

  try {
    let query = knex('consultant_availability as ca')
      .leftJoin('appointments as a', 'ca.id', 'a.availability_id') // Join with appointments
      .where({ 'ca.consultant_id': consultantId, 'ca.is_deleted': false })
      .select('ca.*', 'a.notes', 'a.num_beneficiaries') // Select required fields

    if (date) {
      query = query.andWhere({ 'ca.date': date });
    }

    const result = await query;
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const editConsultantAvailability = async (req, res) => {
  const availabilityId = req.params.id;
  const { date, time_slot, is_available, is_booked } = req.body;

  try {
    const [result] = await knex('consultant_availability')
      .where({ id: availabilityId })
      .update({ date, time_slot, is_available, is_booked })
      .returning('*');

    if (!result) {
      return res.status(404).json({ message: 'Availability not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteConsultantAvailability = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await knex('consultant_availability')
      .where({ id })
      .update({ is_deleted: true })
      .returning('*');

    if (result.length === 0) {
      return res.status(404).json({ error: 'Availability not found or already deleted' });
    }
    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllConsultantAvailability = async (req, res) => {
  try {
    const result = await knex('consultant_availability as ca')
      .join('teacher as t', 'ca.consultant_id', 't.id')
      .select(
        'ca.id',
        'ca.consultant_id',
        't.name as consultant_name',
        't.email',              // Add email
        't.gender',             // Add gender
        't.school_name',        // Add school name
        't.university_name',    // Add university name
        't.grade',              // Add grade
        'ca.date',
        'ca.time_slot',
        'ca.is_available',
        'ca.is_booked'
      )
      .where('ca.is_deleted', false)
      .orderBy(['ca.date', 'ca.time_slot']);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Server error fetching availability' });
  }
};

module.exports = {
  addConsultantAvailability,
  getConsultantAvailability,
  editConsultantAvailability,
  deleteConsultantAvailability,
  getAllConsultantAvailability
};