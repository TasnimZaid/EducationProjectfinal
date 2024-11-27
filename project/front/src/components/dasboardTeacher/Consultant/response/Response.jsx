import React, { useState, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  DollarSign, 
  Calendar, 
  Inbox,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ExternalLink,
  Clock,
  X,
  AlertCircle
} from 'lucide-react';
import ConsultantResponseForm from './RespondFormModal';
import Sidebar from '../../../../assestComponent/Sidebar';

const Response = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    searchTerm: '',
    sortBy: 'date'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const storedUser = sessionStorage.getItem('teacherId');
  const consultantId = storedUser;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/consultants/${consultantId}/requests`);
        const data = await response.json();
        setRequests(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    console.log(requests)

    fetchRequests();
  }, [consultantId]);

  const handleRespond = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    if (status.is_completed) return 'bg-[#5ED095] text-emerald-900 border-emerald-200';
    if (status.isActive) return 'bg-red-400 text-black border-red-900';
    return 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const filteredRequests = requests.filter(request => {
    if (filters.status !== 'all') {
      if (filters.status === 'active' && !request.isActive) return false;
      if (filters.status === 'completed' && !request.is_completed) return false;
      if (filters.status === 'inactive' && request.isActive) return false;
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        request.request_type.toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower) ||
        request.id.toString().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // First sort by completion status (active first)
    if (a.is_completed !== b.is_completed) {
      return a.is_completed ? 1 : -1; // Active (not completed) items come first
    }
    
    // Then apply the secondary sorting criteria
    switch (filters.sortBy) {
      case 'date':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'amount':
        return parseFloat(b.pricing_plan_price) - parseFloat(a.pricing_plan_price);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-200">
        <Sidebar/>
      <div className="max-w-6xl mx-auto px-4 py-8 ">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#212c49]  p-4 rounded-md  mx-auto">Consultation Requests</h1>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white rounded-lg border hover:bg-gray-50 "
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Search and Filters */}
          <div className={`grid gap-4 ${isFilterOpen ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {isFilterOpen && (
              <>
                <select
                  className="px-4 py-3 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  className="px-4 py-3 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid gap-4">
          {filteredRequests.map((request) => (
            <div 
              key={request.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(request)}`}>
                        {request.is_completed ? 'Completed' : request.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-gray-500 text-sm"> {request.teacher_name}</span>
                      (<span className="text-gray-500 text-sm"> {request.teacher_email} - {request.teacher_phone_number}</span>)
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{request.request_type}</h3>
                  </div>
                  
                  <button
                    onClick={() => handleRespond(request)}
                    className="px-4 py-2 bg-[#3169a1] text-white rounded-lg hover:bg-[#438ad1] transition-colors flex items-center gap-2 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    Respond
                  </button>
                </div>

                {/* Content */}
                <p className="text-gray-600">{request.description}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(request.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-4 h-4" /> JD
                    <span>{request.pricing_plan_price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{request.payment_status}</span>
                  </div>
                  {request.file_url && (
                    <a 
                      href={request.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#0e2133] hover:text-[#66aef6]"
                    >
                      <FileText className="w-4 h-4" />
                      View Attachment
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl">
              <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-lg text-gray-600">No requests found</p>
              <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => {
                  setIsModalVisible(false);
                  setSelectedRequest(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ConsultantResponseForm
              requestId={selectedRequest?.id}
              consultantId={consultantId}
              onClose={() => {
                setIsModalVisible(false);
                setSelectedRequest(null);
              }}
              isVisible={isModalVisible}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Response;