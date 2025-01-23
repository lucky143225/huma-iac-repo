
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import verfiyicon from "../../verify-icon.png";
import bgimageicon from "../../photo1.webp";

export default function MyAccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Initially false
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", "", ""]);
  const [emailgeneratedOtp, setEmailGeneratedOtp] = useState(false);
  const [phonegeneratedOtp, setPhoneGeneratedOtp] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false); // Tracks if email is changed
  const [error, setError] = useState(null);
  const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        if (token) {
          const { data } = await axios.get(`http://${port}/api/users/getUserData`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setEmail(data.user.email);
          setPhoneNumber(data.user.phoneNumber);
          setIsEmailVerified(data.user.isVerified);
        }
      } catch (err) {
        toast.error("Failed to load user data");
        console.error(err);
      }
    };

    fetchUserData();
  }, [port]);

  const handleOtpChange = (value, index, type) => {
    const otpArray = type === "email" ? [...emailOtp] : [...phoneOtp];
    otpArray[index] = value;
    type === "email" ? setEmailOtp(otpArray) : setPhoneOtp(otpArray);

    // Move focus to the next input box automatically when a digit is entered
    if (value && index < otpArray.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Move focus to the previous input box when backspacing
    if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const EmailOtpGenerator = async (email) => {
    try {
      const response = await axios.post(`http://${port}/api/users/send-email-otp`, {
        email,
      });
      setIsEmailVerified(false); // Set email verification to false when email is changed
      toast.success("OTP Sent to Email Successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      console.error("Email verification error", err);
    }
  };

  const verifyEmailOTP = async (email, otp) => {
    try {
      const response = await axios.post(`http://${port}/api/users/verify-email-otp`, {
        email,
        otp,
      });
      if (response.data.message === "OTP verified successfully!") {
        setIsEmailVerified(true);
        setEmailGeneratedOtp(false); // Reset OTP state after successful verification
        toast.success("Email Verified");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      console.error("Email verification error", err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isEmailVerified) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        const { data } = await axios.put(
          `http://${port}/api/users/update`,
          { firstName, lastName, phoneNumber, email },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Profile updated successfully");
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        toast.error("Please verify your email before updating your profile.");
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message || 'Something went wrong.';
        setError(errorMessage);
        console.error('Axios Error:', err.response.data);
        toast.error(errorMessage);
      } else {
        setError('Network error, please try again later.');
        console.error('Error without response:', err);
      }
    }
  };

  const EmailHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.value !== email) {
      setIsEmailChanged(true);
      setIsEmailVerified(false); // Reset email verification on change
    } else {
      setIsEmailChanged(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(${bgimageicon})` }}
      ></div>

      <div className="max-w-md w-full rounded-md p-8 shadow-2xl shadow-black relative z-10">
        <h1 className="text-2xl font-bold text-center text-black mb-6">My Account</h1>
        <div className="space-y-6">
          <div className="flex flex-row">
            <div className="mr-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-black mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-black mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
              Phone Number
            </label>
            {isPhoneVerified && (
              <img src={verfiyicon} className="ml-2 w-[35px] h-[25px] text-sm font-medium text-green-500 px-1 rounded-lg" />
            )}
            <div className="flex flex-row mt-2">
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-1 mr-2 py-2 border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            {isEmailVerified && (
              <img src={verfiyicon} className="ml-2 w-[35px] h-[25px] text-sm font-medium text-green-500 px-1 rounded-lg" />
            )}
            <input
              id="email"
              type="email"
              value={email}
              onChange={EmailHandler}
              required
              className="w-full px-1 py-2 border border-gray-600 rounded-md text-black placeholder-gray-500 outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {!isEmailVerified && (
              <button
                className="w-4/12 py-2 mt-4 rounded-lg bg-green-200 hover:bg-green-300 text-green-700"
                onClick={() => {
                  setEmailGeneratedOtp(true);
                  EmailOtpGenerator(email);
                }}
              >
                Verify Email
              </button>
            )}

            {emailgeneratedOtp && !isEmailVerified && (
              <div className="flex space-x-2 mt-4">
                {emailOtp.map((otp, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    value={otp}
                    onChange={(e) => handleOtpChange(e.target.value, index, "email")}
                    maxLength="1"
                    className="w-10 h-10 text-center border border-gray-400 rounded-md focus:outline-none"
                  />
                ))}
              </div>
            )}

            {emailgeneratedOtp && !isEmailVerified && (
              <button
                className="w-4/12 py-2 mt-4 rounded-lg bg-green-200 hover:bg-green-300 text-green-700"
                onClick={() => {
                  const otp = emailOtp.join("");
                  verifyEmailOTP(email, otp);
                }}
              >
                Verify OTP
              </button>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={submitHandler}
              className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

