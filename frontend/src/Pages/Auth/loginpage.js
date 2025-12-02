// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
// import { motion, AnimatePresence } from 'framer-motion';
// import bgimageicon from "../../photo1.webp";
// import axios from 'axios';
// import { toast } from "react-toastify";

// export default function SigninScreen() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [focusedInput, setFocusedInput] = useState(null);
//   const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(`http://${port}/api/users/login`, {
//         email,
//         password,
//       });
//       toast.success("Welcome back! 🎉");
//       localStorage.setItem('userInfo', JSON.stringify({ 
//         firstname: data.user.firstName, 
//         lastname: data.user.lastName, 
//         email: data.user.email, 
//         token: data.token 
//       }));
//       navigate('/');
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950">
//       {/* Animated Background Image with Zoom */}
//       <motion.div
//         animate={{ scale: [1, 1.05, 1] }}
//         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute inset-0 bg-cover bg-center opacity-20"
//         style={{ backgroundImage: `url(${bgimageicon})` }}
//       />

//       {/* Enhanced Floating Particles - Blue and Violet */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-violet-400' : 'bg-indigo-400'}`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 6 + 2}px`,
//               height: `${Math.random() * 6 + 2}px`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               x: [0, Math.random() * 20 - 10, 0],
//               opacity: [0.2, 0.8, 0.2],
//               scale: [1, 1.5, 1],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>

//       {/* Animated Grid with Pulse */}
//       <motion.div 
//         animate={{ opacity: [0.05, 0.1, 0.05] }}
//         transition={{ duration: 5, repeat: Infinity }}
//         className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" 
//       />

//       {/* Login Container */}
//       <div className="relative z-10 w-full max-w-6xl mx-4 grid lg:grid-cols-2 gap-8 items-center">
//         {/* Left Side - Branding with Staggered Animation */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden lg:block text-white space-y-6"
//         >
//           <motion.div
//             animate={{ 
//               rotateY: (mousePosition.x - window.innerWidth / 2) / 50,
//               rotateX: -(mousePosition.y - window.innerHeight / 2) / 50,
//             }}
//             transition={{ type: "spring", stiffness: 100 }}
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             {/* Animated Title with Letter Animation */}
//             <motion.h1 
//               className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 text-transparent bg-clip-text"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {["L", "i", "a", "i", "s", "o", "n"].map((letter, index) => (
//                 <motion.span
//                   key={index}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, type: "spring" }}
//                 >
//                   {letter}
//                 </motion.span>
//               ))}
//             </motion.h1>
//             <motion.h2 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.7 }}
//               className="text-4xl font-bold mb-6"
//             >
//               Consultancy Services
//             </motion.h2>
//           </motion.div>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.9 }}
//             className="text-xl text-gray-300 leading-relaxed"
//           >
//             Your trusted partner in professional consulting since 1995. 
//             Join thousands of satisfied clients.
//           </motion.p>
          
//           {/* Stats with Counter Animation */}
//           <div className="flex gap-8 mt-8">
//             {[
//               { value: 29, suffix: "+", label: "Years Experience", color: "text-blue-400" },
//               { value: 5000, suffix: "+", label: "Happy Clients", color: "text-violet-400" },
//               { value: 100, suffix: "%", label: "Success Rate", color: "text-indigo-400" }
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 1 + index * 0.2, type: "spring" }}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <motion.p 
//                   className={`text-4xl font-bold ${stat.color}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <motion.span
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
//                   >
//                     {stat.value}{stat.suffix}
//                   </motion.span>
//                 </motion.p>
//                 <p className="text-sm text-gray-400">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Right Side - Login Form with Enhanced Animations */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative"
//         >
//           <motion.div
//             animate={{ 
//               rotateY: (mousePosition.x - window.innerWidth / 2) / 100,
//               rotateX: -(mousePosition.y - window.innerHeight / 2) / 100,
//             }}
//             transition={{ type: "spring", stiffness: 50 }}
//             style={{ transformStyle: "preserve-3d" }}
//             className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden"
//           >
//             {/* Animated Border Glow on Focus */}
//             <AnimatePresence>
//               {focusedInput && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="absolute inset-0 rounded-3xl pointer-events-none"
//                   style={{
//                     background: "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.3))",
//                     filter: "blur(20px)",
//                   }}
//                 />
//               )}
//             </AnimatePresence>

//             <div className="relative">
//               {/* Header with Floating Icon */}
//               <div className="text-center mb-8">
//                 <motion.div
//                   initial={{ scale: 0, rotate: -180 }}
//                   animate={{ scale: 1, rotate: 0 }}
//                   transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//                   whileHover={{ rotate: 360, scale: 1.1 }}
//                   className="inline-block mb-4"
//                 >
//                   <motion.div 
//                     animate={{ y: [0, -10, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg relative"
//                   >
//                     <LockClosedIcon className="w-8 h-8 text-white" />
//                     <motion.div
//                       animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                       className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl"
//                     />
//                   </motion.div>
//                 </motion.div>
                
//                 <motion.h2 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="text-3xl font-black text-white mb-2"
//                 >
//                   Welcome Back
//                 </motion.h2>
//                 <motion.p 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="text-gray-400"
//                 >
//                   Enter your credentials to continue
//                 </motion.p>
//               </div>

//               {/* Form */}
//               <form onSubmit={submitHandler} className="space-y-5">
//                 {/* Email with Ripple Effect */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.4 }}
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <label className="block text-sm font-semibold text-gray-300 mb-2">
//                     Email Address
//                   </label>
//                   <div className="relative group">
//                     <motion.div
//                       animate={focusedInput === 'email' ? { scale: [1, 1.5, 1] } : {}}
//                       transition={{ duration: 0.3 }}
//                       className="absolute left-4 top-1/2 transform -translate-y-1/2"
//                     >
//                       <EnvelopeIcon className="w-5 h-5 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
//                     </motion.div>
//                     <input
//                       type="email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       onFocus={() => setFocusedInput('email')}
//                       onBlur={() => setFocusedInput(null)}
//                       className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                 </motion.div>

//                 {/* Password with Character Typing Effect */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.5 }}
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="block text-sm font-semibold text-gray-300">
//                       Password
//                     </label>
//                     <Link
//                       to="/forgot-password"
//                       className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
//                     >
//                       Forgot?
//                     </Link>
//                   </div>
//                   <div className="relative group">
//                     <motion.div
//                       animate={focusedInput === 'password' ? { scale: [1, 1.5, 1] } : {}}
//                       transition={{ duration: 0.3 }}
//                       className="absolute left-4 top-1/2 transform -translate-y-1/2"
//                     >
//                       <LockClosedIcon className="w-5 h-5 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
//                     </motion.div>
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       onFocus={() => setFocusedInput('password')}
//                       onBlur={() => setFocusedInput(null)}
//                       className="w-full pl-12 pr-12 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
//                       placeholder="Enter your password"
//                     />
//                     <motion.button
//                       whileHover={{ scale: 1.2, rotate: 10 }}
//                       whileTap={{ scale: 0.9 }}
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                     >
//                       {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                     </motion.button>
//                   </div>
//                 </motion.div>

//                 {/* Login Button with Ripple and Success Animation */}
//                 <motion.button
//                   whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)" }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full py-4 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 hover:from-blue-600 hover:via-violet-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
//                 >
//                   <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
//                   <span className="relative flex items-center justify-center gap-2">
//                     {isLoading ? (
//                       <>
//                         <motion.svg 
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                           className="h-5 w-5" 
//                           viewBox="0 0 24 24"
//                         >
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </motion.svg>
//                         Signing in...
//                       </>
//                     ) : (
//                       <>
//                         Sign In
//                         <motion.div
//                           animate={{ x: [0, 5, 0] }}
//                           transition={{ repeat: Infinity, duration: 1.5 }}
//                         >
//                           <ArrowRightIcon className="w-5 h-5" />
//                         </motion.div>
//                       </>
//                     )}
//                   </span>
//                 </motion.button>

//                 {/* Divider with Animated Line */}
//                 <div className="relative my-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <motion.div 
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: 1 }}
//                       transition={{ delay: 0.8, duration: 0.5 }}
//                       className="w-full border-t border-white/10"
//                     />
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-4 bg-transparent text-gray-500">OR CONTINUE WITH</span>
//                   </div>
//                 </div>

//                 {/* Google Login with Hover Effect */}
//                 <motion.button
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="button"
//                   className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-xl transition-all shadow-lg"
//                 >
//                   <motion.svg 
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                     className="w-5 h-5" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </motion.svg>
//                   Continue with Google
//                 </motion.button>
//               </form>

//               {/* Sign Up Link with Sparkle Effect */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.9 }}
//                 className="mt-6 text-center"
//               >
//                 <p className="text-gray-400 text-sm">
//                   Don't have an account?{' '}
//                   <Link
//                     to="/signup"
//                     className="text-violet-400 font-semibold hover:text-violet-300 transition-colors inline-flex items-center gap-1"
//                   >
//                     Create account
//                     <motion.span
//                       animate={{ rotate: [0, 360] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <SparklesIcon className="w-4 h-4" />
//                     </motion.span>
//                   </Link>
//                 </p>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Security Badge with Pulse */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 }}
//             className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs"
//           >
//             <motion.svg 
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-4 h-4" 
//               fill="currentColor" 
//               viewBox="0 0 20 20"
//             >
//               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//             </motion.svg>
//             <span>Protected by 256-bit SSL encryption</span>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
