import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const firstname = JSON.parse(localStorage.getItem("userInfo"))?.firstname;
  const lastname = JSON.parse(localStorage.getItem("userInfo"))?.lastname;

  useEffect(() => {
  }, [navigate]);



  return (
    <nav className="bg-blue/70 backdrop-blur-md shadow-md">
      <div className=" items-center justify-between">
        <div className="flex items-center pt-2 justify-between">
          <div class="flex flex-col px-4">
            <h1
              class="text-3xl  font-bold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text  text-transparent cursor-pointer"
             
              onClick={()=>navigate('/home')}
            >
              Liasion Consultancy Services
            </h1>
            <span
              class="text-sm text-gray-600 font-medium mt-1"
              style={{ opacity: 1 }}
            >
              Excellence in Professional Consulting
            </span>
          </div>
          <div className="text-center px-4 flex flex-col items-center relative left-[-2rem]">
            <span className="text-4xl font-bold animate-pulsePopUp">
              29<span className="text-xl relative bottom-5" >+</span>
            </span>
            <span className="text-xl animate-pulsePopUp">Years of Experience</span>
          </div>

          <ul className="flex justify-center space-x-5 text-gray-900 font-semibold">
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
                  if (link === "Online Services") {
                    navigate("/services");
                  } else {
                    let targetElement;
                    if (link === "Projects") {
                      targetElement = document.getElementById("clients"); // Replace with correct ID
                    } else if (["Contact Us", "About"].includes(link)) {
                      targetElement = document.getElementById("footer"); // Replace with correct ID
                    } else if (link === "Notifications") {
                      targetElement = document.getElementById("notifications"); // Replace with correct ID
                    }
                    
                    if (targetElement) {
                      const elementPosition = targetElement.offsetTop; // Top position of the element
                      const offset = -80; // Adjust offset as needed (e.g., to account for a fixed header)
                      window.scrollTo({
                        top: elementPosition + offset,
                        behavior: "smooth",
                      });
                    }
                  }
                }}
              >
                {link}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 px-4">
              <button onClick = {()=>{navigate('/login')}} disabled = {firstname ? true : false} className={ firstname ? "w-full text-xl p-2 py-3 bg-[#26abff] text-white rounded-full font-semibold space-x-2 uppercase" : "px-6 py-2 bg-[#26abff] text-white rounded-lg font-semibold focus:outline-none focus:ring-2 transition duration-200" }>
                { firstname ? firstname?.[0] + ' ' + lastname?.[0] : 'Login'}
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
