
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import verfiyicon from "../../verify-icon.png"
import axios from 'axios';

import bgimageicon from '../../photo1.webp'
import { toast } from 'react-toastify';


export default function SignupScreen() {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill());
  const [emailOtp, setEmailOtp] = useState(Array(6).fill());
  const [generatedOtp, setGeneratedOtp] = useState(false);
  const [emailgeneratedOtp, setEmailGeneratedOtp] = useState(false);
  const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";
  console.log(phoneNumber?.length);


  const verifyEmailOTP = async(email,otp) => {
    try {
      const emailOTP = await axios.post(`http://${port}/api/users/verify-email-otp`,{
        email,
        otp
      })
      if(emailOTP.data.message === "OTP verified successfully!"){
        setIsEmailVerified(true)
        toast.success("Email Verified")
      }
     }catch (err){
      toast.error(err?.message);
      console.error('email verification error', err)
     }
  }
  // Handle input change for each digit
  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Ensure only one digit is entered
    setOtp(updatedOtp);

    // Move focus to the next input box
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Automatically verify OTP after all 6 digits are entered
    if (updatedOtp.every((digit) => digit !== "") && index==5) {
      verifyEmailOTP(email,updatedOtp.join(""));
    }
  };


  const EmailOtpGenerator = async(email) => {
     try {
      const emailOTP = await axios.post(`http://${port}/api/users/send-email-otp`,{
        email
      })
      toast.success("Email Sent Succesfully")
     }catch (err){
      toast.error(err?.message);
      console.error('email verification error', err)
     }
  }


  const submitHandler = async (e) => {
    e.preventDefault();

    console.log('Submit triggered');
    console.log(port);

    // if (password !== confirmPassword) {
    //   console.error('Passwords do not match');
    //   return;
    // }
    try {
      const { data } = await axios.post(`http://${port}/api/users/register`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      console.log('API Response:', data);
      toast.success("Registered Successfully")
      localStorage.setItem('userInfo', JSON.stringify({ firstname: data.user.firstName, lastname: data.user.lastname, email: data.user.email }));
      
      navigate('/home');
    } catch (err) {
      toast.error(err?.message);
      console.error('API Error:', err);
    }

  };

  useEffect(() => {
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">

      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(${bgimageicon})` }}
      ></div>

      <div className="max-w-md w-full rounded-md p-8 shadow-md" style={{ position: 'relative', zIndex: 10 }}>
        <h1 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h1>
        <div className="space-y-6">
          <div className="flex flex-row">
            <div className="mr-3">
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                required
                className="w-full px-3 py-2  border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                required
                className="w-full px-3 py-2  border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center ">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Mobile Number
              </label>
              {isVerified && (
                <img src={verfiyicon} className="ml-2 w-[35px] h-[25px] text-sm font-medium text-green-500 px-1 rounded-lg" />
              )}
            </div>
            <div className="flex flex-row mt-2">
              <input
                id="number"
                type="phonenumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-1 mr-2 py-2  border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {!isVerified && (
                <button
                  disabled={phoneNumber?.length > 9 ? false : true}
                  className={`w-4/12 py-2 rounded-lg  hover:bg-green-200 ${phoneNumber?.length < 10 || !phoneNumber
                    ? "bg-green-100 opacity-50 cursor-not-allowed"
                    : "bg-green-100 text-green-700"
                    }`}
                  onClick={() => {
                    setGeneratedOtp(true);
                  }}
                >
                  Verify
                </button>
              )}

            </div>
          </div>
          {generatedOtp &&
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-black mb-2"
              >
                Enter OTP
              </label>
              <div className="flex space-x-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-bold  border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
              {isVerified && (
                <p className="text-green-500 text-center font-medium">OTP Verified Successfully!</p>
              )}
            </div>
          }
          <div>
          <div className="flex flex-row items-center ">
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email (optional)
            </label>
            {isEmailVerified && (
                <img src={verfiyicon} className="ml-2 w-[35px] h-[25px] text-sm font-medium text-green-500 px-1 rounded-lg" />
              )}
            </div>
            <div className="flex flex-row mt-2">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              className="w-full px-1 mr-2 py-2  border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {!isEmailVerified && (
                <button
                  disabled={email?.length > 0 ? false : true}
                  className={`w-4/12 py-2 rounded-lg  hover:bg-green-200 ${email?.length < 1 || !email?.includes("@")
                    ? "bg-green-100 opacity-50 cursor-not-allowed"
                    : "bg-green-100 text-green-700"
                    }`}
                  onClick={() => {
                    EmailOtpGenerator(email)
                    setEmailGeneratedOtp(true);
                  }}
                >
                  Verify
                </button>
              )}
              </div>
          </div>
          <div>
          {emailgeneratedOtp  && !isEmailVerified &&
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-black mb-2"
              >
                Enter OTP
              </label>
              <div className="flex space-x-2 mb-4">
                {emailOtp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-bold  border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
              {isEmailVerified && (
                <p className="text-green-500 text-center font-medium">OTP Verified Successfully!</p>
              )}
            </div>
          }
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2  border border-gray-600 rounded-md text-black placeholder-gray-500 focus:ring-blue-500 outline-none focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2  border border-gray-600 rounded-md text-black placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div> */}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              onClick={submitHandler}
            >
              Register
            </button>
          </div>

          <div className="text-base text-center text-black">
            Already have an account?{' '}
            <Link to={`/login`} className="text-lg underline text-white hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}