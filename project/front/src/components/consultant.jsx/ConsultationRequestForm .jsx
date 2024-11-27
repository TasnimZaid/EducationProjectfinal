import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileUp, Send, Loader, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const ConsultationRequest = ({ consultantId }) => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const storedUser = sessionStorage.getItem('teacherId');
  const teacher_id = storedUser;
    console.log(consultantId)
    console.log(teacher_id)


  const [formData, setFormData] = useState({
    teacher_id: teacher_id,
    consultant_id: consultantId,
    user_id: 2,
    request_type: '',
    description: '',
    file_url: '',
    pricing_plan_id: ''
  });

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pricing-plans', {
        params: { consultant_id: consultantId }
      });

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setPricingPlans(response.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Unexpected data structure received.',
          confirmButtonColor: '#1e40af' 
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'An error occurred while fetching pricing plans.',
        confirmButtonColor: '#1e40af' 
      });
      console.error('Error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'pricing_plan_id') {
      const selectedPlan = pricingPlans.find(plan => plan.id === parseInt(value));
      if (selectedPlan) {
        setFormData(prev => ({
          ...prev,
          pricing_plan_id: selectedPlan.id
        }));
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file_url: file.name
      }));
      
      Swal.fire({
        icon: 'success',
        title: 'File Uploaded!',
        text: `File uploaded: ${file.name}`,
        timer: 2000,
        showConfirmButton: false,
        background: '#ffff', 
        iconColor: 'green-500' 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/request-consultation', formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Consultation request sent successfully!',
        confirmButtonColor: 'green-500', // blue-800
        background: '#ffff' // blue-50
      });

      setFormData({
        teacher_id: teacher_id,
        consultant_id: consultantId,
        user_id: 2,
        request_type: '',
        description: '',
        file_url: '',
        pricing_plan_id: ''
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Error',
        text: err.response?.data?.message || 'An error occurred while sending the request.',
        confirmButtonColor: '#1e40af' // blue-800
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 rounded-xl shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
        Consultation Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-blue-800 font-medium mb-2">
            Select Plan
          </label>
          <select
            name="pricing_plan_id"
            value={formData.pricing_plan_id}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
            required
          >
            <option value="">Select a plan</option>
            {pricingPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.request_type} - ${plan.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-blue-800 font-medium mb-2">
            Request Type
          </label>
          <select
            name="request_type"
            value={formData.request_type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white"
            required
          >
            <option value="">Select a request type</option>
            <option value="academic">Academic Consultation</option>
            <option value="behavioral">Behavioral Consultation</option>
            <option value="educational">Educational Consultation</option>
          </select>
        </div>

        <div>
          <label className="block text-blue-800 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors resize-none bg-white"
            placeholder="Enter consultation request details here..."
          />
        </div>

        <div>
          <label className="block text-blue-800 font-medium mb-2">
            Attachments
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center px-6 py-3 bg-blue-100 border-blue-600 text-blue-800 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors">
              <FileUp className="w-5 h-5 mr-2" />
              <span>Choose File</span>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {formData.file_url && (
              <span className="text-sm text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {formData.file_url}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all transform hover:scale-[1.02]"
        >
          {loading ? (
            <span className="flex items-center">
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="w-5 h-5 mr-2" />
              Submit Request
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConsultationRequest;