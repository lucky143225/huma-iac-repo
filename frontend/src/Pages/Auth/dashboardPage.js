import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Icons for actions
import bgimageicon from "../../photo1.webp";
import Navbar from "../../Components/navBar";

export default function DashboardPage() {
  const [userActivity, setUserActivity] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const port = process.env.REACT_APP_BACKEND_PORT || "localhost:3000";
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  // Fetch user data and activity
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;
        if (token) {
          const activityResponse = await axios.get(
            `http://${port}/api/users/getAllUsersFiles`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserActivity(activityResponse.data.files);
        }
      } catch (err) {
        toast.error("Failed to load dashboard data");
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [port]);

  // Handle checkbox selection
  const handleCheckboxChange = (activityId) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(activityId)
        ? prevSelected.filter((id) => id !== activityId)
        : [...prevSelected, activityId]
    );
  };

  // Delete selected entries
  const deleteSelected = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      await axios.post(
        `http://${port}/api/users/deleteAllFiles`,
        { ids: selectedActivities },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserActivity((prevActivities) =>
        prevActivities.filter(
          (activity) => !selectedActivities.includes(activity.id)
        )
      );
      setSelectedActivities([]);
      toast.success("Selected files deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete selected files");
      console.error(err);
    }
  };

  // Delete all entries
  const deleteAll = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      await axios.delete(`http://${port}/api/users/deleteAllFiles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserActivity([]);
      setSelectedActivities([]);
      toast.success("All files deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete all files");
      console.error(err);
    }
  };

  const filteredActivities = userActivity.filter((activity) =>
    activity.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      <div
        ref={navbarRef}
        className="w-full bg-blue/70 backdrop-blur-md z-10 sticky top-0"
      >
        <Navbar />
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-8 relative">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md"
          style={{ backgroundImage: `url(${bgimageicon})` }}
        ></div>

        <div className="w-3/4 bg-white rounded-lg p-8 border border-gray-300 shadow-md shadow-gray-400 relative z-10">
          <h1 className="text-3xl font-bold text-center text-black mb-6">
            Dashboard
          </h1>

          {/* Search Bar */}
          <div className="mb-4">
            <label htmlFor="search" className="block text-black text-lg mb-2">
              Search by Service Name
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter service name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mb-4 space-x-4">
            <button
              title="Delete Selected"
              onClick={deleteSelected}
              className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center space-x-2 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={selectedActivities.length === 0}
            >
              <FaTrash />
              <span>Delete Selected</span>
            </button>
            <button
              title="Delete All"
              onClick={deleteAll}
              className="px-4 py-2 bg-red-700 text-white rounded-md flex items-center space-x-2 hover:bg-red-800"
            >
              <FaTrash />
              <span>Delete All</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-center">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th className="p-4 border-r">Select</th>
                  <th className="p-4 border-r">Service Name</th>
                  <th className="p-4 border-r">Document Name</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="p-4 border-r">
                        <input
                          type="checkbox"
                          checked={selectedActivities.includes(activity.id)}
                          onChange={() => handleCheckboxChange(activity.id)}
                        />
                      </td>
                      <td className="p-4 border-r">{activity.serviceName}</td>
                      <td className="p-4 border-r">{activity.fileName}</td>
                      <td className="p-4 flex justify-center items-center space-x-4">
                        <button
                          title="View"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEye />
                        </button>
                        <button
                          title="Modify"
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          title="Delete"
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-gray-500 text-lg italic"
                    >
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
