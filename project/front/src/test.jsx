import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConsultantDashboardPage = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
const consultantId =2 ;
    useEffect(() => {
        // Fetch active consultation requests for this consultant
        axios.get(`http://localhost:3000/api/consultants/${consultantId}/requests`)
            .then(response => setRequests(response.data))
            .catch(error => console.error("Error fetching requests:", error));
    }, [consultantId]);

    const handleRespond = (request) => {
        setSelectedRequest(request);
    };

    return (
        <div>
            <h2>Active Consultation Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        <p>{request.request_type}</p>
                        <button onClick={() => handleRespond(request)}>Respond</button>
                    </li>
                ))}
            </ul>
            {/* {selectedRequest && (
                <RespondFormModal 
                    requestId={selectedRequest.id} 
                    consultantId={consultantId} 
                    onClose={() => setSelectedRequest(null)} 
                />
            )} */}
        </div>
    );
};

export default ConsultantDashboardPage;
