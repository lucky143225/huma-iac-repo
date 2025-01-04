import {
  BuildingOfficeIcon,
  MapIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

function Notifications() {
  return (
    <div className="flex my-6 mx-10 shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)] rounded-2xl h-[100vh]">
      <div class=" my-4 mx-4 w-1/2 bg-[#26abff] text-white p-8 rounded-lg h-[95vh]">
        <h2 class="text-3xl font-bold mb-8">Notifications</h2>
        <div class="space-y-6">
          <div class="flex gap-2">
            <span
              className="text-white font-bold mt-1 px-2 py-1 bg-blue-500 rounded-lg shadow-lg animate-pulse inline-block h-fit"
            >
              New
            </span>

            <p class="text-lg leading-relaxed">
              The Transferable Development Rights (TDR) platform under the HMDA
              jurisdiction is now digitized. All TDRs will be processed
              exclusively through online only. Citizens can apply for and
              digitize their manual TDR certificates.
            </p>
          </div>
          <div class="flex gap-2">
            <span
              className="text-white font-bold mt-1 px-2 py-1 bg-blue-500 rounded-lg shadow-lg animate-pulse inline-block h-fit"
            >
              New
            </span>
            <p class="text-lg leading-relaxed">
              All types of Building Permissions, Occupancy Certificates (O.C),
              and Layout permissions, Group Housing Permission, (except Change
              of Land Use) falls within the limits of Grampanchayats under the
              jurisdiction of HMDA limits will now be exclusively processed
              through TG-bPASS only and any new applications except CLU will not
              be entertained in DPMS further. Citizens are requested to apply
              through TG-bPASS website with the following URL:
              http://tgbpass.telangana.gov.in from 24th April -2024
            </p>
          </div>
          <div class="flex gap-2">
            <span
              className="text-white font-bold mt-1 px-2 py-1 bg-blue-500 rounded-lg shadow-lg animate-pulse inline-block h-fit"
            >
              New
            </span>
            <p class="text-lg leading-relaxed">
              The Transferable Development Rights (TDR) platform under the HMDA
              jurisdiction is now digitized. All TDRs will be processed
              exclusively through online only. Citizens can apply for and
              digitize their manual TDR certificates.
            </p>
          </div>
          {/* <button class="mt-4 text-white hover:underline">CLICK HERE</button> */}
        </div>
      </div>

      <div className="lg:w-1/2 my-4">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Image 1 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <BuildingOfficeIcon className="w-16 h-16 text-gray-900" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Building & <br />
                  Layout Permission
                </h3>

              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <MapIcon className="w-16 h-16 text-gray-900" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Land & <br />
                  Zone Conversion
                </h3>

              </div>
            </div>
          </div>

          {/* Image 3 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <PencilSquareIcon className="w-16 h-16 text-gray-900" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Architectural & <br />
                  Structural Designs
                </h3>

              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <PaperAirplaneIcon className="w-16 h-16 text-gray-900" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  NOC - <br />
                  Airport Authority
                </h3>

              </div>
            </div>
          </div>

          {/* Image 5 */}
          <div className="flex flex-col items-center">
            <div className="relative group flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <GlobeAltIcon className="w-16 h-16 text-gray-900" />
                </div>

              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  Environmental <br />
                  NOC
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">

            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-300 shadow-[0_8px_15px_2px_rgba(0,0,0,0.2)]">
              <div className="w-full h-full flex items-center justify-center text-white">
                <ArrowRightIcon className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <div >
              <h1 className="text-xl my-4 font-mono font-bold text-black">See More</h1>
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
