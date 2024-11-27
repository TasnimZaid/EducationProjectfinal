import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Sidebar from '../Sidebar';

const AdminEarningsDashboard = () => {
  const [siteEarnings, setSiteEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('line'); 

  // Generate mock monthly data for the charts
  const generateMonthlyData = (totalEarnings) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyBase = totalEarnings / 12;
    
    return months.map(month => ({
      month,
      earnings: (monthlyBase * (1 + Math.random() * 0.5 - 0.25)).toFixed(2),
      transactions: Math.floor(Math.random() * 50 + 30)
    }));
  };

  useEffect(() => {
    const fetchSiteEarnings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/site/earnings');
        const monthlyData = generateMonthlyData(response.data.totalEarnings);
        
        setSiteEarnings({
          total: response.data.totalEarnings,
          monthly: monthlyData,
          yearToDate: monthlyData.reduce((acc, curr) => acc + parseFloat(curr.earnings), 0).toFixed(2),
          averagePerMonth: (monthlyData.reduce((acc, curr) => acc + parseFloat(curr.earnings), 0) / monthlyData.length).toFixed(2)
        });
      } catch (err) {
        console.error('Error fetching site earnings:', err);
        setError(err.response?.data?.error || 'Failed to fetch site earnings');
      } finally {
        setLoading(false);
      }
    };

    fetchSiteEarnings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-700">Error Loading Data</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const ChartComponent = selectedView === 'line' ? LineChart : BarChart;

  return (

    <div className="bg-gray-200 h-screen ">
        <Sidebar/>
    <div className="max-w-6xl mx-auto p-6 ">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Site Earnings Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView('line')}
              className={`px-4 py-2 rounded ${
                selectedView === 'line' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setSelectedView('bar')}
              className={`px-4 py-2 rounded ${
                selectedView === 'bar' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg text-blue-800 font-semibold">Total Earnings</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${siteEarnings.total.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg text-green-800 font-semibold">Year to Date</h3>
            <p className="text-2xl font-bold text-green-600">
              ${parseFloat(siteEarnings.yearToDate).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg text-purple-800 font-semibold">Average Monthly</h3>
            <p className="text-2xl font-bold text-purple-600">
              ${parseFloat(siteEarnings.averagePerMonth).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={siteEarnings.monthly}>
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
                formatter={(value, name) => [
                  `$${parseFloat(value).toLocaleString()}`,
                  name === 'earnings' ? 'Earnings' : 'Transactions'
                ]}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  padding: '8px'
                }}
              />
              {selectedView === 'line' ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="transactions" 
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </>
              ) : (
                <>
                  <Bar dataKey="earnings" fill="#2563eb" />
                  <Bar dataKey="transactions" fill="#10b981" />
                </>
              )}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminEarningsDashboard;