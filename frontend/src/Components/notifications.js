import {
  BuildingOfficeIcon,
  MapIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Building from "../Pictures/Building.avif";
import Land from "../Pictures/Land.webp";
import Architecture from "../Pictures/Architecture.avif"
import NOC from "../Pictures/NOC.jpg"
import Environment from "../Pictures/Environmental.jpeg"
import more from "../Pictures/more.jpeg"

function Notifications() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row my-6 mx-4 mt-20 lg:mx-10 shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)] rounded-2xl min-h-screen" id="notifications">
      
      {/* Left Column */}
      <div className="my-4 mx-4 lg:w-1/2 bg-[#26abff] text-white p-8 rounded-lg">
        <h2 className="text-2xl lg:text-3xl font-bold mb-8">Notifications</h2>
        <div className="space-y-6">
          {/* Notification Item */}
          <div className="flex gap-2">
            <span className="text-white font-bold mt-1 px-2 py-1 bg-blue-500 rounded-lg shadow-lg animate-pulse inline-block h-fit">
              New
            </span>
            <p className="text-sm lg:text-lg leading-relaxed">
              The Transferable Development Rights (TDR) platform under the HMDA jurisdiction is now digitized. All TDRs will be processed exclusively through online only. Citizens can apply for and digitize their manual TDR certificates.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-white font-bold mt-1 px-2 py-1 bg-blue-500 rounded-lg shadow-lg animate-pulse inline-block h-fit"> New
            </span>
            <p className="text-sm lg:text-lg leading-relaxed"> All types of Building Permissions, Occupancy Certificates (O.C), and Layout permissions, Group Housing Permission, (except Change of Land Use) fall within the limits of Grampanchayats under the jurisdiction of HMDA limits. These will now be exclusively processed through TG-bPASS only. Any new applications, except CLU, will not be entertained in DPMS further. Citizens are requested to apply through the TG-bPASS website:
              <a href="http://tgbpass.telangana.gov.in" className="underline text-white">http://tgbpass.telangana.gov.in</a>
              from 24th April 2024.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-white font-bold mt-1 px-2 py-1 bg-blue-500 rounded-lg shadow-lg animate-pulse inline-block h-fit"> New </span>
            <p className="text-sm lg:text-lg leading-relaxed"> The Transferable Development Rights (TDR) platform under the HMDA jurisdiction is now digitized. All TDRs will be processed exclusively online. Citizens can apply for and digitize their manual TDR certificates.
            </p>
          </div>
        </div>

      </div>
      {/* Right Column */}

      <div className="w-full lg:w-1/2 my-4">  
      <h1 className="mb-6 flex justify-center font-bold text-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
  OUR SERVICES
</h1>
 
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg">
                <img src={Building} alt="Building" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base lg:text-xl font-bold text-gray-900"> Building & <br /> Layout Permission
                </h3>
              </div>
            </div>
          </div>
          {/* Card 2 */}


          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg">
                <img src={Architecture} alt="Land" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base lg:text-xl font-bold text-gray-900">
                  Architectural & <br /> Structural Designs
                </h3>
              </div>
            </div>
          </div>


          {/* Card 3 */}
      
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg">
                <img src={NOC} alt="Land" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base lg:text-xl font-bold text-gray-900">
                  NOC - <br /> Airport Authority
                </h3>
              </div>
            </div>
          </div>

    {/* Card 4 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg">
                <img src={Land} alt="Land" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base lg:text-xl font-bold text-gray-900">
                  Land & <br /> Zone Conversion
                </h3>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white shadow-lg">
              <img src={Environment} alt="Land" className="w-full h-full bg-white object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base lg:text-xl font-bold text-gray-900">
                  Environmental <br /> NOC
                </h3>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="flex flex-col items-center">
            <button onClick={() => navigate('/services')}>
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-slate-300 shadow-lg">
              <img src={more} alt="Land" className="w-full h-full bg-white object-cover" />
              </div>
              {/* <h1 className="text-base lg:text-xl my-4 font-mono font-bold text-black">See More</h1> */}
            </button>
          </div>
        </div>

        {/* Image 6
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
              <div className="w-full h-full flex items-center justify-center text-white">
              <HomeModernIcon className="w-16 h-16 text-gray-900" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Housing & <br />
                  Project Loans
                </h3>
                
              </div>
            </div>
          </div> */}
      </div>
      </div>
    </div>
  );
}

export default Notifications;
