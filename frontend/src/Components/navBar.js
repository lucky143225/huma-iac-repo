import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const firstname = JSON.parse(localStorage.getItem("userInfo"))?.firstname;
  const lastname = JSON.parse(localStorage.getItem("userInfo"))?.lastname;

  useEffect(() => {
  }, [navigate]);

  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const elementPosition = targetElement.offsetTop;
      const offset = -80; // Adjust for fixed headers or margins
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  }

  const scrollMap = {
    "Projects": "clients", // Replace with actual ID
    "Contact Us": "footer", // Replace with actual ID
    "About": "footer", // Replace with actual ID
    "Notifications": "notifications", // Replace with actual ID
  };




  return (
    <nav className="bg-blue/70 backdrop-blur-md shadow-md h-[7vh]">
      <div className=" items-center justify-between">
        <div className="flex  justify-between">
          <div class="flex flex-col px-4">
            <h1
              class="text-2xl  font-bold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text  text-transparent cursor-pointer"
             
              onClick={()=>navigate('/home')}
            >
              Liasion Consultancy Services
            </h1>
            <span
              class="text-sm text-gray-600 font-medium"
              style={{ opacity: 1 }}
            >
              Excellence in Professional Consulting
            </span>
          </div>
          <div className="text-center px-4 flex  animate-pulsePopUp items-center pt-2 left-[-2rem]">
            <span className="text-3xl font-bold pr-2 ">
              {/* className="text-xl relative bottom-5" */}
              𝟸𝟿+ 
            </span>
            <span className="text-xl "> 𝒴𝑒𝒶𝓇𝓈 𝐸𝓍𝓅𝑒𝓇𝒾𝑒𝓃𝒸𝑒</span>
          </div>

          <ul className="flex items-center justify-center space-x-5 text-gray-900 font-semibold">
            {[
              "About",
              "Projects",
              "Online Services",
              "Notifications",
              "Contact Us",
            ].map((link) => (
              <li
                key={link}
                className="text-base hover:text-green-300 cursor-pointer transition-colors duration-200"
                onClick={() =>  {
                  const targetId = scrollMap[link];
                  if (link === "Online Services") {
                      navigate("/services");
                  } else if( location.pathname !== "/home"){
                      navigate("/home", { state: { targetId } });
                  }
                  else if (targetId) {
                      handleScroll(targetId);
                  }
                }}
              >
                {link}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 px-4">
              <button onClick = {()=>{navigate('/login')}} disabled = {firstname ? true : false} className={ firstname ? "w-full  text-xl p-2  bg-[#26abff] text-white rounded-full font-semibold space-x-2 uppercase" : "px-6 py-2 bg-[#26abff] text-white rounded-lg font-semibold focus:outline-none focus:ring-2 transition duration-200" }>
                { firstname ? firstname?.[0] + ' ' + lastname?.[0] : 'Login'}
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
