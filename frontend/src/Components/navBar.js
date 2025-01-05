import { Link } from "react-router-dom";

function Navbar() {
  const name = JSON.parse(localStorage.getItem("userInfo"))?.name;
  return (
    <nav className="bg-blue/70 backdrop-blur-md shadow-md">
      <div className=" items-center justify-between">
        <div className="flex items-center pt-2 justify-between">
          <div class="flex flex-col px-4">
            <h1
              class="text-3xl  font-bold bg-gradient-to-r from-green-900 to-green-600 bg-clip-text  text-transparent"
              style={{ transform: "none" }}
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
              "Home",
              "About",
              "Projects",
              "Online Services",
              "Notifications",
              "Contact Us",
            ].map((link) => (
              <li
                key={link}
                className="text-base hover:text-green-300 cursor-pointer transition-colors duration-200"
              >
                {link}
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="flex items-center gap-2 px-4">
            <Link to="/login">
              <button className="px-6 py-2 bg-[#26abff] text-white rounded-lg font-semibold focus:outline-none focus:ring-2 transition duration-200">
                {name ?? 'Login'}
              </button>
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
