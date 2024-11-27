import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { DollarSign, User, FileText, AlertCircle, CheckCircle, Tag } from 'lucide-react';
import Sidebar from '../../../assestComponent/Sidebar';

const storedUser = sessionStorage.getItem('teacherId');
const userObject = JSON.parse(storedUser);
const consultantId = storedUser;

const AddPricingPlanForm = () => {
  const [formData, setFormData] = useState({
    consultantId: consultantId,
    requestType: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the API using Fetch
      const response = await fetch('http://localhost:3000/api/pricing-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Pricing plan added successfully',
          text: 'The new pricing plan has been added.',
          confirmButtonColor: '#3085d6',
          timer: 2000
        });

        // Reset form data after adding
        setFormData({
          consultantId: consultantId,
          requestType: '',
          price: '',
          description: ''
        });
      } else {
        throw new Error(result.error || 'An error occurred while submitting the pricing plan.');
      }
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'An error occurred...',
        text: error.message,
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Sidebar/>
      <div className="max-w-6xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <DollarSign className="mx-auto h-12 w-12 text-[#3460a6ee]" />
          <h2 className="mt-6 text-3xl font-extrabold text-[#293d5e]">Add Pricing Plan</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="h-4 w-4" /> Request Type
                </div>
                <input
                  type="text"
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4" /> Price
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4" /> Description (optional)
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-[#f8fdf8] ${
              loading ? 'bg-[#779cfa] cursor-not-allowed' : 'bg-[#519ce3] hover:bg-[#2C659B]'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Plan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPricingPlanForm;
