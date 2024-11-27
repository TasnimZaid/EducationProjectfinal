import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../../../assestComponent/Sidebar';


const TeacherEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const teacherId = sessionStorage.getItem('teacherId')
  console.log(teacherId)
  // Generate mock historical data for the chart
  const generateHistoricalData = (totalEarnings) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyEarnings = (totalEarnings / months.length).toFixed(2);
    
    return months.map((month) => ({
      month,
      earnings: (monthlyEarnings * (1 + Math.random() * 0.4 - 0.2)).toFixed(2)
    }));
  };

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/teacher/${teacherId}/earnings`);
        
        // Log response details for debugging
        setDebugInfo({
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });

        const data = response.data;
        setEarnings({
          total: data.totalEarnings || 0,
          history: generateHistoricalData(data.totalEarnings || 0)
        });
      } catch (err) {
        console.error('Axios error:', err);
        setError(
          err.response 
            ? `Error: ${err.response.status} - ${err.response.data?.error || err.response.statusText}`
            : err.message
        );
        setDebugInfo({
          status: err.response?.status,
          statusText: err.response?.statusText,
          headers: err.response?.headers,
          data: err.response?.data
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center ">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 ">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-4">{error}</p>
          
          {debugInfo && (
            <div className="mt-4 p-4 bg-white rounded border border-red-100">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-200">
      <Sidebar/>
    <div className="max-w-6xl  mx-auto p-6 ">
      <div className="bg-white mt-20 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Teacher Earnings Dashboard</h1>
        
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-blue-600">
            ${earnings.total.toLocaleString()}
          </h3>
          <p className="text-gray-500">Total Earnings</p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earnings.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month"
                stroke="#6b7280"
              />
              <YAxis 
                stroke="#6b7280"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Earnings']}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  padding: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeacherEarnings;