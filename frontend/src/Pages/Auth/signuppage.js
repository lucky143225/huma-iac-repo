import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, UserIcon, CheckCircleIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import bgimageicon from '../../photo1.webp';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignupScreen() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState(Array(6).fill(''));
  const [otpSent, setOtpSent] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  // Reset verification when email changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailVerified(false);
    setOtpSent(false);
    setEmailOtp(Array(6).fill(''));
  };

  // Send OTP via API
  const sendOtp = async () => {
    setIsSendingOtp(true);
    try {
      await axios.post(`http://${port}/api/users/send-email-otp`, { email });
      toast.success("OTP sent to your email! 📧");
      setOtpSent(true);
      setEmailOtp(Array(6).fill(''));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP via API
  const verifyEmailOTP = async (otp) => {
    setIsVerifying(true);
    try {
      const response = await axios.post(`http://${port}/api/users/verify-email-otp`, {
        email,
        otp
      });
      if (response.data.message === "OTP verified successfully!") {
        setIsEmailVerified(true);
        toast.success("Email Verified! ✅");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
      setEmailOtp(Array(6).fill(''));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...emailOtp];
    updatedOtp[index] = value.slice(-1);
    setEmailOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Auto-verify when all 6 digits entered
    if (updatedOtp.every((digit) => digit !== "") && index === 5) {
      verifyEmailOTP(updatedOtp.join(""));
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setEmailOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
      if (newOtp.length === 6) {
        verifyEmailOTP(pastedData);
      }
    }
  };

  // Submit registration via API
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isEmailVerified) {
      toast.error("Please verify your email first");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (passwordStrength < 3) {
      toast.error("Please use a stronger password");
      return;
    }

    try {
      const { data } = await axios.post(`http://${port}/api/users/verifyEmailOTPAndRegister`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      
      toast.success("🎉 Account created successfully!");
      localStorage.setItem('userInfo', JSON.stringify({ 
        firstname: data.user.firstName, 
        lastname: data.user.lastName, 
        email: data.user.email, 
        isVerified: data.user.isVerified, 
        phoneNumber: data.user.phoneNumber,
        token: data.token
      }));
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  const steps = [
    { num: 1, label: "About You", icon: UserIcon },
    { num: 2, label: "Verification", icon: ShieldCheckIcon },
    { num: 3, label: "Security", icon: LockClosedIcon }
  ];

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-red-500';
    if (passwordStrength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-violet-950 p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${bgimageicon})` }} />

      {/* Floating Particles - Blue and Violet */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-violet-400' : 'bg-indigo-400'}`}
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={{ 
            rotateY: (mousePosition.x - window.innerWidth / 2) / 100,
            rotateX: -(mousePosition.y - window.innerHeight / 2) / 100,
          }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{ transformStyle: "preserve-3d" }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center gap-2 mb-3"
            >
              <SparklesIcon className="w-7 h-7 text-violet-400 animate-pulse" />
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 text-transparent bg-clip-text">
                Join Us
              </h1>
              <SparklesIcon className="w-7 h-7 text-blue-400 animate-pulse" />
            </motion.div>
            <p className="text-gray-400 text-sm">Create your account in 3 easy steps</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-6">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center flex-1">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep >= step.num 
                        ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg' 
                        : 'bg-white/10 text-gray-500'
                    }`}
                  >
                    {currentStep > step.num ? <CheckCircleIcon className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                  </motion.div>
                  <span className="text-xs text-gray-400 mt-1 font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-4">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">First Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Last Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Mobile Number</label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        placeholder="+91 1234567890"
                      />
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => firstName && lastName && phoneNumber && setCurrentStep(2)}
                    disabled={!firstName || !lastName || !phoneNumber}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    Continue →
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Email Verification */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-300">Email Address</label>
                      {isEmailVerified && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1 text-green-400 text-xs"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                          <span>Verified</span>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          required
                          disabled={isEmailVerified}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all disabled:opacity-50"
                          placeholder="you@example.com"
                        />
                      </div>
                      {!isEmailVerified && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          disabled={!email?.includes("@") || isSendingOtp}
                          onClick={sendOtp}
                          className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                        >
                          {isSendingOtp ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {otpSent && !isEmailVerified && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3"
                    >
                      <label className="block text-sm font-semibold text-gray-300">Enter Verification Code</label>
                      <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                        {emailOtp.map((digit, index) => (
                          <motion.input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            maxLength="1"
                            whileFocus={{ scale: 1.1 }}
                            className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 text-center">📧 Check your email for the code</p>
                      {isVerifying && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center gap-2 text-gray-400 text-sm"
                        >
                          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                          Verifying...
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => isEmailVerified && setCurrentStep(3)}
                      disabled={!isEmailVerified}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Password */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Create Password</label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 space-y-1"
                      >
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all ${
                                i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs font-medium ${
                          passwordStrength < 2 ? 'text-red-400' : passwordStrength < 4 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          Password Strength: {getPasswordStrengthText()}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-400 mt-1">❌ Passwords don't match</p>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <p className="text-xs text-green-400 mt-1">✅ Passwords match</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={!password || !confirmPassword || password !== confirmPassword || passwordStrength < 3}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                      Create Account 🚀
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs"
        >
          <ShieldCheckIcon className="w-4 h-4" />
          <span>Your data is encrypted and secure</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
