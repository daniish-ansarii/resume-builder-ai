import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 mt-32 px-6 md:px-16 lg:px-24 py-14 text-sm text-gray-600">

      {/* TOP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div className="col-span-2 sm:col-span-1">
          <img src="/logo.svg" alt="logo" className="h-12 w-auto" />
        </div>

        {/* Product */}
        <div>
          <p className="text-gray-900 font-semibold mb-3">Product</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">Support</a></li>
            <li><a href="#" className="hover:text-black">Pricing</a></li>
            <li><a href="#" className="hover:text-black">Affiliate</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <p className="text-gray-900 font-semibold mb-3">Resources</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">Company</a></li>
            <li><a href="#" className="hover:text-black">Blogs</a></li>
            <li><a href="#" className="hover:text-black">Community</a></li>
            <li><a href="#" className="hover:text-black">Careers</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-gray-900 font-semibold mb-3">Legal</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">Privacy</a></li>
            <li><a href="#" className="hover:text-black">Terms</a></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="w-full mt-12 flex flex-col items-center gap-3">

        <p className="text-center text-gray-700">Join our community</p>

        {/* Join Button */}
        <button className="bg-black text-white px-6 py-2 rounded-md hover:opacity-80">
          Join
        </button>

        <p className="text-center mt-4">© 2025 Resume Builder</p>
      </div>

      {/* Global Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </footer>
  );
};

export default Footer;