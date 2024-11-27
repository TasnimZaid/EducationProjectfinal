import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, AlertCircle, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';
import Sidebar from '../Sidebar';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch token from sessionStorage
  const token = sessionStorage.getItem('token');
  console.log(token);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/admin/All', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      });
      setAdmins(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const toggleAdminStatus = async (adminId, isEnabled) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/${isEnabled ? 'disable' : 'enable'}-admin/${adminId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        }
      );
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === adminId ? { ...admin, is_enabled: !isEnabled } : admin
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating admin status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-poppins">
      <Sidebar />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="mr-2" /> Admin Management
            </h2>
            <button
              onClick={fetchAdmins}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out"
            >
              <RefreshCw className="mr-2" /> Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{admin.name}</h3>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`mr-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.is_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {admin.is_enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    <button
                      onClick={() => toggleAdminStatus(admin.id, admin.is_enabled)}
                      className={`flex items-center px-3 py-1 border rounded-md text-sm font-medium transition duration-300 ease-in-out ${
                        admin.is_enabled
                          ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100'
                          : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {admin.is_enabled ? (
                        <>
                          <ToggleLeft className="mr-1" /> Disable
                        </>
                      ) : (
                        <>
                          <ToggleRight className="mr-1" /> Enable
                        </>
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;