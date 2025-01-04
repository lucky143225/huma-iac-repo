import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className=" items-center justify-between">
        <div className="flex items-center pt-4 pb-4 justify-between">
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
          {/* Contact Info */}
          <div className="flex items-center gap-2 px-4">
            <Link to="/login">
              <button className="px-6 py-2 bg-[#26abff] text-white rounded-lg font-semibold focus:outline-none focus:ring-2 transition duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-[#26abff] p-4">
          <ul className="hidden md:flex space-x-8 text-sm font-medium text-white justify-center">
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
                className="hover:text-green-300 cursor-pointer transition-colors duration-200"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
