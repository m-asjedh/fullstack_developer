import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function Navbar() {
  return (
    <nav className="bg-teal-500 px-4 py-3 flex items-center justify-between shadow-md">
      <div className="w-24"></div>
      <div className="text-white font-bold text-xl md:text-2xl">CLS IDEA.</div>
      <div className="w-24 flex justify-end">
        <button className="flex items-center text-white bg-transparent border-2 border-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 hover:border-teal-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
          <RiLogoutCircleRLine className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
}
