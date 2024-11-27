import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

const ConsultantAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // or sessionStorage
        const response = await axios.get('http://localhost:3000/api/availability', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailability(response.data);
      } catch (err) {
        setError('Failed to fetch availability');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = availability.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(availability.length / itemsPerPage);

  // Handle Page Change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="bg-gray-100">
      <Sidebar />
      <div className="h-screen max-w-6xl p-6 mx-auto bg-gray-100 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Consultant Availability</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border-b text-left">ID</th>
                <th className="py-3 px-4 border-b text-left">Consultant Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Gender</th>
                <th className="py-3 px-4 border-b text-left">School Name</th>
                <th className="py-3 px-4 border-b text-left">Date</th>
                <th className="py-3 px-4 border-b text-left">Time Slot</th>
                <th className="py-3 px-4 border-b text-left">Available</th>
                <th className="py-3 px-4 border-b text-left">Booked</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.consultant_name}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.gender}</td>
                  <td className="py-2 px-4 border-b">{item.school_name}</td>
                  <td className="py-2 px-4 border-b">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{item.time_slot}</td>
                  <td className="py-2 px-4 border-b text-center">{item.is_available ? '✅' : '❌'}</td>
                  <td className="py-2 px-4 border-b text-center">{item.is_booked ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantAvailability;
