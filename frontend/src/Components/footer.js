import React from "react";
import playStore from "../playstore.png";
import appStore from "../appstore.png";

const Footer = () => {
  return (
    <footer className="mt-[10vmax] p-[2vmax] bg-[#26abff] text-black flex items-center" id='footer'>
      <div className="w-[20%] flex flex-col items-center">
        <h4 className="font-bold text-[1vmax]">DOWNLOAD OUR APP</h4>
        <img src={playStore} alt="playstore" className="w-[10vmax] my-[1vmax] cursor-pointer" />
        <img src={appStore} alt="Appstore" className="w-[10vmax] my-[1vmax] cursor-pointer" />
      </div>
      
      <div className="w-[60%] text-center">
        <h1 className="text-[2vmax] font-bold text-teal-700">Liasion Consultancy Services</h1>
        <p className="max-w-[60%] mx-auto text-[1.2vmax] font-[Gill Sans], sans-serif my-[1vmax]">
          One stop destination for realestate
        </p>
        <p className="text-[1.2vmax] font-[Gill Sans], sans-serif my-[1vmax]">
          Copyrights 2024 &copy; Liasion
        </p>
      </div>

      <div className="w-[20%] flex flex-col items-center">
        <h4 className="font-bold text-[1.6vmax] text-crimson">Contact Us</h4>
        <a href="http://instagram.com" className="text-black text-[1.3vmax] font-[Gill Sans], sans-serif transition-all duration-500 my-[0.5vmax] hover:text-amber-900">
          Instagram
        </a>
        <a href="http://youtube.com" className="text-black text-[1.3vmax] font-[Gill Sans], sans-serif transition-all duration-500 my-[0.5vmax] hover:text-amber-900">
          Youtube
        </a>
        <a href="http://instagram.com" className="text-black text-[1.3vmax] font-[Gill Sans], sans-serif transition-all duration-500 my-[0.5vmax] hover:text-amber-900">
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
