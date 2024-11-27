import React, { useState } from 'react';
import { Edit, Trash2, Check, X, Calendar, Clock } from 'lucide-react';
import axios from 'axios';

const AppointmentActions = ({ appointment, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState(appointment);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const response = await axios.patch(`http://localhost:3000/api/availability/${appointment.id}`, editedAppointment);
        if (response.status === 200) {
          onEditSuccess(response.data);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to edit consultant availability', error);
        alert('Failed to update appointment. Please try again.');
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/availability/${appointment.id}`);
      if (response.status === 200) {
        onDeleteSuccess(appointment.id);
      }
    } catch (error) {
      console.error('Failed to delete consultant availability', error);
      alert('Failed to delete appointment. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAppointment(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-md">
      {isEditing ? (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="date"
              name="date"
              value={editedAppointment.date}
              onChange={handleInputChange}
              className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="time_slot"
              value={editedAppointment.time_slot}
              onChange={handleInputChange}
              className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Time"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-semibold text-gray-800">{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-md text-gray-600">{appointment.time_slot}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 text-blue-500 hover:bg-blue-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="p-2 text-red-500 hover:bg-red-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this appointment?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setIsDeleteDialogOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentActions;
