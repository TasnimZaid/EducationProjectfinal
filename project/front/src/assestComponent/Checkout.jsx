import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const PaymentComponent = ({ 
  consultantId, 
  teacherId, 
  appointmentId, // تأكد من تمرير appointmentId كمكون
  amount,
  onSuccess 
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // حساب الأرباح للموقع وللمعلم
  const calculateEarnings = (amount) => {
    const siteCommission = 0.20; 
    const siteEarnings = amount * siteCommission;
    const consultantEarnings = amount - siteEarnings;
    return { consultantEarnings, siteEarnings };
  };

  // دالة لإنشاء سجل الدفع في الباك اند
  const createPayment = async (paymentData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/payments', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to record payment');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Complete Payment
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '15px' }}>
          Amount to pay: ${amount}
        </div>

        {error && (
          <div style={{
            padding: '10px',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            {error}
          </div>
        )}

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                    currency_code: "USD"
                  },
                  description: `Consultation Payment for Teacher ${teacherId}`
                }
              ]
            });
          }}
          onApprove={async (data, actions) => {
            setLoading(true);
            setError(null);
            
            try {
              // التقاط تفاصيل الطلب من PayPal
              const details = await actions.order.capture();
              
              // حساب الأرباح
              const { consultantEarnings, siteEarnings } = calculateEarnings(amount);

              // إرسال البيانات إلى الباك اند
              await createPayment({
                consultant_id: consultantId,
                teacher_id: teacherId,
                appointment_id: appointmentId, // تأكد من إرسال appointment_id
                total_amount: amount,
                consultant_earning: consultantEarnings,
                site_earning: siteEarnings,
                payment_status: 'completed'
              });

              // استدعاء الدالة عند النجاح
              if (onSuccess) {
                onSuccess(details);
              }
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          }}
          onError={(err) => {
            setError('Payment failed. Please try again.');
            console.error(err);
          }}
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay'
          }}
        />

        {loading && (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            marginTop: '15px'
          }}>
            Processing payment...
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
