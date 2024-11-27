// import React, { useEffect, useState } from 'react';
// import { FileText, Image, AlertCircle, Clock, Loader2, Plus, X, CheckCircle2, Clock4, Lock, CreditCard, Info } from "lucide-react";
// import axios from 'axios';
// import FeedbackForm from './FeedbackForm';
// import { motion } from 'framer-motion';
// import Sidebar from '../../../assestComponent/Sidebar';

// // PayPal Checkout Component
// const PayPalCheckout = ({ amount, onSuccess, onCancel, onClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://www.paypal.com/sdk/js?client-id=AYnzVEObmnyuNDN4FBPKSqinCbKh7UwO3m5qeUkH6R6wknTw0ECuqp63tmy714ZzsyutrUTHELbmbD9W&currency=USD";
//     script.async = true;

//     script.onload = () => {
//       setLoading(false);
//       window.paypal.Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: amount,
//               },
//             }],
//           });
//         },
//         onApprove: async (data, actions) => {
//           try {
//             const details = await actions.order.capture();
//             onSuccess(details);
//           } catch (err) {
//             setError('Payment capture failed. Please try again.');
//             console.error('Payment capture error:', err);
//           }
//         },
//         onError: (err) => {
//           setError('PayPal checkout error. Please try again.');
//           console.error('PayPal Checkout error:', err);
//         },
//         onCancel: () => {
//           onCancel();
//         },
//       }).render('#paypal-button-container');
//     };

//     script.onerror = () => {
//       setLoading(false);
//       setError('Failed to load PayPal SDK. Please try again.');
//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [amount, onSuccess, onCancel]);

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <div className="text-center mb-6">
//           <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//             <CreditCard className="h-8 w-8 text-blue-600" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-800">
//             Complete Payment
//           </h3>
//           <p className="text-gray-600 mt-2">
//             Amount to pay: ${amount}
//           </p>
//         </div>

//         {loading && (
//           <div className="text-center py-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="text-gray-600 mt-2">Loading PayPal...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <div id="paypal-button-container" className="mt-4"></div>
//       </div>
//     </div>
//   );
// };
// const TeacherResponses = () => {
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeFeedback, setActiveFeedback] = useState(null);
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [showPayPal, setShowPayPal] = useState(false);
// const [selectedPayment, setSelectedPayment] = useState(null);

// const storedUser = sessionStorage.getItem('teacherId');
//   const teacherId = storedUser;
//   useEffect(() => {
//     const fetchResponses = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`http://localhost:3000/api/responses/teacher/${teacherId}`);
//         if (res.data && Array.isArray(res.data)) {
//           // Transform the response data to include request details
//           const responsesWithDetails = res.data.map(response => ({
//             ...response,
//             request_type: response.request_type || 'General Request',
//             request_description: response.request_description || 'No description provided',
//             request_file_url: response.request_file_url || null,
//             request_payment_amount: response.request_payment_amount || 0,
//             request_payment_status: response.payment_status || 'pending'
//           }));
//           setResponses(responsesWithDetails);
//         } else {
//           throw new Error('Unexpected response structure');
//         }
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching responses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResponses();
//   }, [teacherId]);

//   // Handler for clicking the card
//   const handleCardClick = (response) => {
//     setSelectedRequest({
//       ...response,
//       request_type: response.request_type,
//       request_description: response.request_description,
//       request_file_url: response.request_file_url,
//       request_payment_amount: response.request_payment_amount,
//       request_payment_status: response.request_payment_status
//     });
//   };


//   const handlePayment = (response) => {
//     setSelectedPayment(response);
//     setShowPayPal(true);
//   };

//   const handlePaymentSuccess = async (details) => {
//     try {
//       // Update payment status in your backend
//       await axios.post(`http://localhost:3000/api/responses/${selectedPayment.id}/payment`, {
//         paymentDetails: details
//       });
      
//       // Refresh responses
//       const res = await axios.get(`http://localhost:3000/api/responses/teacher/${teacherId}`);
//       setResponses(res.data);
      
//       // Close modal
//       setShowPayPal(false);
//       setSelectedPayment(null);
//     } catch (error) {
//       console.error('Error updating payment status:', error);
//     }
//   };
//   // Document Preview Component
//   const DocumentPreview = ({ type, url, onClose }) => (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
//     >
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative flex flex-col shadow-xl"
//       >
//         <div className="p-6 border-b flex justify-between items-center bg-gray-50">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             {type === 'pdf' ? <FileText className="h-5 w-5 text-blue-600" /> : <Image className="h-5 w-5 text-emerald-600" />}
//             {type === 'pdf' ? 'PDF Document' : 'Image'} Preview
//           </h3>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-200 transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-hidden bg-gray-50">
//           {type === 'pdf' ? (
//             <iframe
//               src={url}
//               className="w-full h-full"
//               title="PDF Preview"
//             />
//           ) : (
//             <div className="w-full h-full overflow-auto p-6">
//               <img
//                 src={url}
//                 alt="Document Preview"
//                 className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
//               />
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   // Request Details Popup Component
//   const RequestDetailsPopup = ({ request, onClose }) => (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
//     >
//       <motion.div 
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl w-full max-w-lg p-6 relative"
//       >
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//           <Info className="h-5 w-5 text-blue-600" />
//           Request Details
//         </h3>

//         <div className="space-y-4">
//           <div className="p-4 bg-gray-50 rounded-xl">
//             <h4 className="font-semibold text-gray-700 mb-2">Request Type</h4>
//             <p className="text-gray-600">{request.request_type}</p>
//           </div>

//           <div className="p-4 bg-gray-50 rounded-xl">
//             <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
//             <p className="text-gray-600">{request.request_description}</p>
//           </div>

//           {request.request_file_url && (
//             <div className="p-4 bg-gray-50 rounded-xl">
//               <h4 className="font-semibold text-gray-700 mb-2">Attached File</h4>
//               <a 
//                 href={request.request_file_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
//               >
//                 <FileText className="h-4 w-4" />
//                 View Attachment
//               </a>
//             </div>
//           )}

//           <div className="p-4 bg-gray-50 rounded-xl">
//             <h4 className="font-semibold text-gray-700 mb-2">Payment Details</h4>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Amount:</span>
//               <span className="font-medium text-gray-800">${request.request_payment_amount}</span>
//             </div>
//             <div className="flex items-center justify-between mt-2">
//               <span className="text-gray-600">Status:</span>
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 request.request_payment_status === 'paid' 
//                   ? 'bg-green-100 text-green-800'
//                   : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {request.request_payment_status.charAt(0).toUpperCase() + request.request_payment_status.slice(1)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="p-8 bg-white rounded-2xl shadow-lg">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//           <p className="mt-4 text-gray-600 font-medium">Loading responses...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 text-red-800 rounded-xl flex items-center gap-3 shadow-sm">
//         <AlertCircle className="h-6 w-6 flex-shrink-0" />
//         <span className="font-medium">Error: {error}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-200">
//         <Sidebar/>
//       <div className="container mx-auto py-12 px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {responses.map((response) => {
//             const isCompleted = response.status === 'Completed';
//             const payment_status = response.payment_status === "Paid"
            
//             return (
//             <motion.div 
//               key={response.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`rounded-2xl border shadow-lg transition-all duration-300 overflow-hidden ${
//                 payment_status 
//                   ? 'bg-white border-gray-200 hover:shadow-xl' 
//                   : 'bg-gray-50 border-gray-200 hover:shadow-xl'
//               }`}
//               onClick={() => handleCardClick(response)} 
//             >
//               <div className={`p-6 border-b ${
//                 payment_status ? 'border-gray-100 bg-white' : 'border-gray-200 bg-gray-50'
//               }`}>
//                 <div className="flex justify-between items-start">
//                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                     Request {response.request_type}
//                     <button
//                       onClick={() => setSelectedRequest(response)}
//                       className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       <Info className="h-5 w-5" />
//                     </button>
//                   </h2>
//                   <span className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
//                     payment_status
//                       ? 'bg-green-400 text-green-900' 
//                       : 'bg-yellow-300 text-yellow-900'
//                   }`}>
//                     {payment_status ? (
//                       <CheckCircle2 className="h-4 w-4" />
//                     ) : (
//                       <Clock4 className="h-4 w-4" />
//                     )}
//                     {response.payment_status}
//                   </span>
//                 </div>
//               </div>

//               {payment_status ? (
//                 // Completed Response Content
//                 <div className="p-6 space-y-6">
//                   <div className="space-y-4">
//                     <button 
//                       onClick={() => setSelectedDocument({ type: 'pdf', url: response.pdf_url })}
//                       className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 hover:border-blue-200 transition-all duration-200 group"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="bg-green-500 rounded-xl p-3 group-hover:bg-green-600 transition-colors">
//                           <FileText className="h-6 w-6 text-green-900" />
//                         </div>
//                         <div className="text-left flex-1">
//                           <h3 className="font-semibold text-gray-800">Document PDF</h3>
//                           <p className="text-sm text-gray-500">Click to view full document</p>
//                         </div>
//                       </div>
//                     </button>

//                     <button 
//                       onClick={() => setSelectedDocument({ type: 'image', url: response.image_url })}
//                       className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 hover:border-blue-200 transition-all duration-200 group"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className="bg-purple-300 rounded-xl p-3 group-hover:bg-purple-600 transition-colors">
//                           <Image className="h-6 w-6 text-purple-900" />
//                         </div>
//                         <div className="text-left flex-1">
//                           <h3 className="font-semibold text-gray-800">Document Image</h3>
//                           <p className="text-sm text-gray-500">Click to view full image</p>
//                         </div>
//                       </div>
//                     </button>
//                   </div>

//                   <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Clock className="h-4 w-4" />
//                       <span>{new Date(response.created_at).toLocaleDateString()}</span>
//                     </div>
//                     <button 
//                       onClick={() => setActiveFeedback(response.id)}
//                       className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#438ad1] rounded-lg hover:bg-[#2E649B] transition-colors"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Add Review
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 // Pending Response - Locked Content
//                 <div className="p-6">
//                   <div className="text-center py-8">
//                     <div className="bg-[#8ebff0] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                       <Lock className="h-8 w-8 text-[#1a3e62]" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       Content Locked
//                     </h3>
//                     <p className="text-gray-500 mb-6">
//                       Please complete the payment to access the response content
//                     </p>
//                     <button
//                       onClick={() => handlePayment(response.id)}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-red-400 text-black rounded-xl hover:bg-red-700 transition-colors font-medium"
//                     >
//                       <CreditCard className="h-5 w-5" />
//                       Proceed to Payment
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           )})}
//         </div>
//         {showPayPal && selectedPayment && (
//   <PayPalCheckout
//     amount={selectedPayment.request_payment_amount}
//     onSuccess={handlePaymentSuccess}
//     onCancel={() => setShowPayPal(false)}
//     onClose={() => setShowPayPal(false)}
//   />
// )}
//         {selectedDocument && (
//           <DocumentPreview
//             type={selectedDocument.type}
//             url={selectedDocument.url}
//             onClose={() => setSelectedDocument(null)}
//           />
//         )}

// {selectedRequest && (
//           <RequestDetailsPopup
//             request={selectedRequest}
//             onClose={() => setSelectedRequest(null)}
//           />
//         )}

//         {activeFeedback && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl"
//             >
//               <button 
//                 onClick={() => setActiveFeedback(null)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//               <h3 className="text-xl font-bold text-gray-800 mb-6">Add Review & Comment</h3>
//               <FeedbackForm 
//                 responseId={activeFeedback} 
//                 onSubmit={() => setActiveFeedback(null)}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherResponses;



import React, { useEffect, useState } from 'react';
import { FileText, Image, AlertCircle, Clock, Loader2, Plus, X, CheckCircle2, Clock4, Lock, CreditCard, Info } from "lucide-react";
import axios from 'axios';
import FeedbackForm from './FeedbackForm';
import { motion } from 'framer-motion';
import Sidebar from '../../../assestComponent/Sidebar';

// PayPal Checkout Component
const PayPalCheckout = ({ amount, onSuccess, onCancel, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AYnzVEObmnyuNDN4FBPKSqinCbKh7UwO3m5qeUkH6R6wknTw0ECuqp63tmy714ZzsyutrUTHELbmbD9W&currency=USD";
    script.async = true;

    script.onload = () => {
      setLoading(false);
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            onSuccess(details);
          } catch (err) {
            setError('Payment capture failed. Please try again.');
            console.error('Payment capture error:', err);
          }
        },
        onError: (err) => {
          setError('PayPal checkout error. Please try again.');
          console.error('PayPal Checkout error:', err);
        },
        onCancel: () => {
          onCancel();
        },
      }).render('#paypal-button-container');
    };

    script.onerror = () => {
      setLoading(false);
      setError('Failed to load PayPal SDK. Please try again.');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [amount, onSuccess, onCancel]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Complete Payment
          </h3>
          <p className="text-gray-600 mt-2">
            Amount to pay: JD {amount}
          </p>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading PayPal...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div id="paypal-button-container" className="mt-4"></div>
      </div>
    </div>
  );
};

const TeacherResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const storedUser = sessionStorage.getItem('teacherId');
  const teacherId = storedUser;

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/responses/teacher/${teacherId}`);
        if (res.data && Array.isArray(res.data)) {
          const responsesWithDetails = res.data.map(response => ({
            ...response,
            request_type: response.request_type || 'General Request',
            request_description: response.request_description || 'No description provided',
            request_file_url: response.request_file_url || null,
            request_payment_amount: response.request_payment_amount || 10,
            request_payment_status: response.payment_status || 'pending'
          }));
          setResponses(responsesWithDetails);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [teacherId]);

  const handleCardClick = (response) => {
    setSelectedRequest({
      ...response,
      request_type: response.request_type,
      request_description: response.request_description,
      request_file_url: response.request_file_url,
      request_payment_amount: response.request_payment_amount,
      request_payment_status: response.request_payment_status
    });
  };

  const handlePayment = (response) => {
    setSelectedPayment(response);
    setShowPayPal(true);
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.post(`http://localhost:3000/api/responses/${selectedPayment.id}/payment`, {
        paymentDetails: details
      });
      
      const res = await axios.get(`http://localhost:3000/api/responses/teacher/${teacherId}`);
      setResponses(res.data);
      
      setShowPayPal(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const DocumentPreview = ({ type, url, onClose }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative flex flex-col shadow-xl"
      >
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {type === 'pdf' ? <FileText className="h-5 w-5 text-blue-600" /> : <Image className="h-5 w-5 text-emerald-600" />}
            {type === 'pdf' ? 'PDF Document' : 'Image'} Preview
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-50">
          {type === 'pdf' ? (
            <iframe
              src={url}
              className="w-full h-full"
              title="PDF Preview"
            />
          ) : (
            <div className="w-full h-full overflow-auto p-6">
              <img
                src={url}
                alt="Document Preview"
                className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  const RequestDetailsPopup = ({ request, onClose }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg p-6 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Request Details
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-2">Request Type</h4>
            <p className="text-gray-600">{request.request_type}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600">{request.request_description}</p>
          </div>

          {request.request_file_url && (
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-2">Attached File</h4>
              <a 
                href={request.request_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                View Attachment
              </a>
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-2">Payment Details</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-gray-800">${request.request_payment_amount}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.request_payment_status === 'paid' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {request.request_payment_status.charAt(0).toUpperCase() + request.request_payment_status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-2xl shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600 font-medium">Loading responses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 text-red-800 rounded-xl flex items-center gap-3 shadow-sm">
        <AlertCircle className="h-6 w-6 flex-shrink-0" />
        <span className="font-medium">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <Sidebar/>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {responses.map((response) => {
            const isCompleted = response.status === 'Completed';
            const payment_status = response.payment_status === "Paid";
            
            return (
              <motion.div 
                key={response.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border shadow-lg transition-all duration-300 overflow-hidden ${
                  payment_status 
                    ? 'bg-white border-gray-200 hover:shadow-xl' 
                    : 'bg-gray-50 border-gray-200 hover:shadow-xl'
                }`}
                onClick={() => handleCardClick(response)} 
              >
                <div className={`p-6 border-b ${
                  payment_status ? 'border-gray-100 bg-white' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      Request {response.request_type}
                      <button
                        onClick={() => setSelectedRequest(response)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Info className="h-5 w-5" />
                        </button>
                    </h2>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
                      payment_status
                        ? 'bg-green-400 text-green-900' 
                        : 'bg-yellow-300 text-yellow-900'
                    }`}>
                      {payment_status ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Clock4 className="h-4 w-4" />
                      )}
                      {response.payment_status}
                    </span>
                  </div>
                </div>

                {payment_status ? (
                  // Completed Response Content
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <button 
                        onClick={() => setSelectedDocument({ type: 'pdf', url: response.pdf_url })}
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 hover:border-blue-200 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-green-500 rounded-xl p-3 group-hover:bg-green-600 transition-colors">
                            <FileText className="h-6 w-6 text-green-900" />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="font-semibold text-gray-800">Document PDF</h3>
                            <p className="text-sm text-gray-500">Click to view full document</p>
                          </div>
                        </div>
                      </button>

                      <button 
                        onClick={() => setSelectedDocument({ type: 'image', url: response.image_url })}
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 hover:border-blue-200 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-300 rounded-xl p-3 group-hover:bg-purple-600 transition-colors">
                            <Image className="h-6 w-6 text-purple-900" />
                          </div>
                          <div className="text-left flex-1">
                            <h3 className="font-semibold text-gray-800">Document Image</h3>
                            <p className="text-sm text-gray-500">Click to view full image</p>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(response.created_at).toLocaleDateString()}</span>
                      </div>
                      <button 
                        onClick={() => setActiveFeedback(response.id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#438ad1] rounded-lg hover:bg-[#2E649B] transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add Review
                      </button>
                    </div>
                  </div>
                ) : (
                  // Pending Response - Locked Content
                  <div className="p-6">
                    <div className="text-center py-8">
                      <div className="bg-[#8ebff0] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-[#1a3e62]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Content Locked
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Please complete the payment to access the response content
                      </p>
                      <button
                        onClick={() => handlePayment(response.id)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-400 text-black rounded-xl hover:bg-red-700 transition-colors font-medium"
                      >
                        <CreditCard className="h-5 w-5" />
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {showPayPal && selectedPayment && (
          <PayPalCheckout
            amount={selectedPayment.request_payment_amount}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPayPal(false)}
            onClose={() => setShowPayPal(false)}
          />
        )}

        {selectedDocument && (
          <DocumentPreview
            type={selectedDocument.type}
            url={selectedDocument.url}
            onClose={() => setSelectedDocument(null)}
          />
        )}

        {selectedRequest && (
          <RequestDetailsPopup
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        )}

        {activeFeedback && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl"
            >
              <button 
                onClick={() => setActiveFeedback(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Add Review & Comment</h3>
              <FeedbackForm 
                responseId={activeFeedback} 
                onSubmit={() => setActiveFeedback(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeacherResponses;
