// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   UserIcon, 
//   EnvelopeIcon, 
//   PhoneIcon, 
//   CheckCircleIcon, 
//   PencilSquareIcon,
//   ShieldCheckIcon,
//   ArrowLeftIcon
// } from "@heroicons/react/24/outline";
// import bgimageicon from "../../photo1.webp";

// export default function MyAccountPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [emailOtp, setEmailOtp] = useState(Array(6).fill(""));
//   const [emailgeneratedOtp, setEmailGeneratedOtp] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSendingOtp, setIsSendingOtp] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         const token = userInfo?.token;
//         if (token) {
//           const { data } = await axios.get(`http://${port}/api/users/getUserData`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setFirstName(data.user.firstName);
//           setLastName(data.user.lastName);
//           setEmail(data.user.email);
//           setPhoneNumber(data.user.phoneNumber);
//           setIsEmailVerified(data.user.isVerified);
//         }
//       } catch (err) {
//         toast.error("Failed to load user data");
//         console.error(err);
//       }
//     };

//     fetchUserData();
//   }, [port]);

//   const handleOtpChange = (value, index) => {
//     const updatedOtp = [...emailOtp];
//     updatedOtp[index] = value.slice(-1);
//     setEmailOtp(updatedOtp);

//     if (value && index < 5) {
//       document.getElementById(`otp-input-${index + 1}`)?.focus();
//     }

//     // Auto-verify when all 6 digits entered
//     if (updatedOtp.every((digit) => digit !== "") && index === 5) {
//       verifyEmailOTP(email, updatedOtp.join(""));
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6);
//     if (/^\d+$/.test(pastedData)) {
//       const newOtp = pastedData.split('');
//       setEmailOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
//       if (newOtp.length === 6) {
//         verifyEmailOTP(email, pastedData);
//       }
//     }
//   };

//   const EmailOtpGenerator = async (email) => {
//     setIsSendingOtp(true);
//     try {
//       await axios.post(`http://${port}/api/users/send-email-otp`, { email });
//       setEmailGeneratedOtp(true);
//       setEmailOtp(Array(6).fill(""));
//       toast.success("OTP sent to your email! 📧");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setIsSendingOtp(false);
//     }
//   };

//   const verifyEmailOTP = async (email, otp) => {
//     setIsVerifying(true);
//     try {
//       const response = await axios.post(`http://${port}/api/users/verify-email-otp`, {
//         email,
//         otp,
//       });
//       if (response.data.message === "OTP verified successfully!") {
//         setIsEmailVerified(true);
//         setEmailGeneratedOtp(false);
//         toast.success("Email Verified! ✅");
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Invalid OTP");
//       setEmailOtp(Array(6).fill(""));
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
    
//     if (!isEmailVerified) {
//       toast.error("Please verify your email before updating");
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const token = userInfo?.token;
//       const { data } = await axios.put(
//         `http://${port}/api/users/update`,
//         { firstName, lastName, phoneNumber, email },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Profile updated successfully! 🎉");
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setIsEditing(false);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Update failed");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const EmailHandler = (e) => {
//     setEmail(e.target.value);
//     setIsEmailVerified(false);
//     setEmailGeneratedOtp(false);
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 p-4">
//       {/* Background */}
//       <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgimageicon})` }} />

//       {/* Floating Particles - Blue and Violet */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-violet-400' : 'bg-indigo-400'}`}
//             style={{ 
//               left: `${Math.random() * 100}%`, 
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 4 + 2}px`,
//               height: `${Math.random() * 4 + 2}px`,
//             }}
//             animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
//             transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
//           />
//         ))}
//       </div>

//       {/* Grid Background */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

//       {/* Account Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 w-full max-w-lg"
//       >
//         <motion.div
//           animate={{ 
//             rotateY: (mousePosition.x - window.innerWidth / 2) / 100,
//             rotateX: -(mousePosition.y - window.innerHeight / 2) / 100,
//           }}
//           transition={{ type: "spring", stiffness: 50 }}
//           style={{ transformStyle: "preserve-3d" }}
//           className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8"
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => navigate(-1)}
//               className="p-2 hover:bg-white/10 rounded-xl transition-all"
//             >
//               <ArrowLeftIcon className="w-6 h-6 text-white" />
//             </motion.button>
//             <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 text-transparent bg-clip-text">
//               My Account
//             </h1>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 15 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setIsEditing(!isEditing)}
//               className="p-2 hover:bg-white/10 rounded-xl transition-all"
//             >
//               <PencilSquareIcon className="w-6 h-6 text-violet-400" />
//             </motion.button>
//           </div>

//           <form onSubmit={submitHandler} className="space-y-5">
//             {/* Name Fields */}
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-300 mb-2">First Name</label>
//                 <div className="relative">
//                   <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     disabled={!isEditing}
//                     required
//                     className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all disabled:opacity-50"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-300 mb-2">Last Name</label>
//                 <div className="relative">
//                   <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     disabled={!isEditing}
//                     required
//                     className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all disabled:opacity-50"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
//               <div className="relative">
//                 <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   disabled={!isEditing}
//                   required
//                   className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all disabled:opacity-50"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <label className="block text-sm font-semibold text-gray-300">Email Address</label>
//                 {isEmailVerified && (
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="flex items-center gap-1 text-green-400 text-xs"
//                   >
//                     <CheckCircleIcon className="w-4 h-4" />
//                     <span>Verified</span>
//                   </motion.div>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <div className="relative flex-1">
//                   <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={EmailHandler}
//                     disabled={!isEditing || isEmailVerified}
//                     required
//                     className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all disabled:opacity-50"
//                   />
//                 </div>
//                 {isEditing && !isEmailVerified && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="button"
//                     disabled={!email?.includes("@") || isSendingOtp}
//                     onClick={() => EmailOtpGenerator(email)}
//                     className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
//                   >
//                     {isSendingOtp ? "Sending..." : emailgeneratedOtp ? "Resend" : "Verify"}
//                   </motion.button>
//                 )}
//               </div>
//             </div>

//             {/* OTP Input */}
//             <AnimatePresence>
//               {emailgeneratedOtp && !isEmailVerified && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="space-y-3"
//                 >
//                   <label className="block text-sm font-semibold text-gray-300">Enter OTP</label>
//                   <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
//                     {emailOtp.map((digit, index) => (
//                       <motion.input
//                         key={index}
//                         id={`otp-input-${index}`}
//                         type="text"
//                         value={digit}
//                         onChange={(e) => handleOtpChange(e.target.value, index)}
//                         maxLength="1"
//                         whileFocus={{ scale: 1.1 }}
//                         className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-xs text-gray-400 text-center">📧 Check your email for the code</p>
//                   {isVerifying && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="flex items-center justify-center gap-2 text-gray-400 text-sm"
//                     >
//                       <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
//                       Verifying...
//                     </motion.div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Update Button */}
//             {isEditing && (
//               <motion.button
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 disabled={!isEmailVerified || isUpdating}
//                 className="w-full py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 hover:from-blue-600 hover:via-violet-600 hover:to-indigo-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
//               >
//                 {isUpdating ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Updating...
//                   </span>
//                 ) : (
//                   "Update Profile"
//                 )}
//               </motion.button>
//             )}
//           </form>

//           {!isEditing && (
//             <div className="mt-6 text-center">
//               <p className="text-gray-400 text-sm">
//                 Click the edit icon to update your profile
//               </p>
//             </div>
//           )}
//         </motion.div>

//         {/* Security Badge */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs"
//         >
//           <ShieldCheckIcon className="w-4 h-4" />
//           <span>Your data is encrypted and secure</span>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }