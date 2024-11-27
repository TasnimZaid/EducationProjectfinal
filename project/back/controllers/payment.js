const knex = require('../knex-config');

// Create a new payment
exports.createPayment = async (req, res) => {
  const {
    consultant_id,
    teacher_id,
    appointment_id,
    total_amount,
    site_earning,
    consultant_earning,
    payment_status = 'completed',
  } = req.body;

  try {
    if (!consultant_id || !teacher_id || !appointment_id || !total_amount || !site_earning || !consultant_earning) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [paymentId] = await knex('payment_appointment').insert({
      consultant_id,
      teacher_id,
      appointment_id,
      total_amount,
      site_earning,
      consultant_earning,
      payment_status,
    }).returning('id');

    return res.status(201).json({ message: 'Payment created successfully', paymentId });
  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({ error: 'Failed to create payment' });
  }
};



exports.getTeacherEarnings = async (req, res) => {
  const { teacher_id } = req.params;

  try {
    const result = await knex('payment_appointment')
      .where({ teacher_id, payment_status: 'completed' })
      .andWhere('is_deleted', false)
      .sum('consultant_earning as totalEarnings')
      .first();

    const totalEarnings = result?.totalEarnings || 0;

    return res.status(200).json({ teacher_id, totalEarnings });
  } catch (error) {
    console.error('Error fetching teacher earnings:', error);
    return res.status(500).json({ error: 'Failed to get teacher earnings' });
  }
};



exports.getSiteEarnings = async (req, res) => {
  try {
    const result = await knex('payment_appointment')
      .where({ payment_status: 'completed' })
      .andWhere('is_deleted', false)
      .sum('site_earning as totalEarnings')
      .first();

    const totalEarnings = result?.totalEarnings || 0;

    return res.status(200).json({ totalEarnings });
  } catch (error) {
    console.error('Error fetching site earnings:', error);
    return res.status(500).json({ error: 'Failed to get site earnings' });
  }
};
