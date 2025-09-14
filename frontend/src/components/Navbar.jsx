import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, User, X, Menu } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 
  const menuItems = [
    {
      to: "/messages",
      label: "Messages",
      icon: <MessageSquare className="w-5 h-5 inline-block mr-2" />,
      isActive: location.pathname === "/messages",
    },
    {
      to: "/",
      label: "Dashboard",
      icon: null,
      isActive: location.pathname === "/",
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 inline-block mr-2" />,
      isActive: location.pathname === "/profile",
    },
  ];

  return (
    <>
      <header
        className="
          fixed top-0 w-full z-50
          backdrop-blur-md bg-gray-800
          border-b border-gray-600
          shadow-xl
          h-16
        "
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Left side (Desktop): Messages & Dashboard */}
          <nav className="hidden md:flex gap-6 font-semibold text-sm text-gray-400 select-none">
            {menuItems.slice(0, 2).map(({ to, label, icon, isActive }) => (
              <Link
                key={to}
                to={to}
                className={`
                  px-5 py-2 rounded-lg
                  transition-all duration-300 ease-in-out
                  ${isActive
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-700/50 scale-105"
                    : "hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 hover:text-white hover:shadow-md hover:scale-105"
                  }
                `}
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>

        
          <Link
            to="/"
            className="
              flex items-center gap-3
              text-gray-400 hover:text-gray-200
              transition-colors duration-500 ease-in-out
              select-none
              absolute left-1/2 transform -translate-x-1/2
              cursor-pointer
            "
            aria-label="Messaging_App Home"
          >
            <div
              className="
                flex items-center justify-center
                w-12 h-12 rounded-lg
                bg-gradient-to-tr from-gray-600 to-gray-700
                shadow-lg shadow-gray-900/80
                transition-transform duration-300
                hover:scale-110
              "
              aria-hidden="true"
            >
              <MessageSquare className="w-7 h-7 text-gray-300 drop-shadow-md" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-wide text-gray-200 drop-shadow-md">
              Messaging_App
            </h1>
          </Link>

          
          {authUser && (
            <div className="hidden md:flex items-center gap-4 text-gray-400">
              <Link
                to="/profile"
                className="
                  btn btn-sm
                  bg-gradient-to-r from-gray-600 to-gray-700
                  text-white
                  rounded-lg
                  shadow-lg shadow-gray-900/60
                  flex items-center gap-2 px-5
                  transition-transform duration-200
                  hover:scale-105 hover:shadow-gray-900/90
                  focus:outline-none focus:ring-2 focus:ring-gray-500
                  select-none
                "
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="
                  btn btn-sm
                  bg-gradient-to-r from-gray-600 to-gray-700
                  text-white
                  rounded-lg
                  shadow-lg shadow-gray-900/60
                  flex items-center gap-2 px-5
                  transition-transform duration-200
                  hover:scale-105 hover:shadow-gray-900/90
                  focus:outline-none focus:ring-2 focus:ring-gray-500
                  select-none
                  cursor-pointer
                "
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">Logout</span>
              </button>
            </div>
          )}

         
          <button
            className="md:hidden text-gray-400 hover:text-gray-200 transition"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

    
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

   
      <nav
        className={`
          fixed top-0 right-0 h-full w-4/5 max-w-xs
          bg-gradient-to-b from-slate-900/90 via-gray-800/90 to-slate-900/90
          shadow-lg shadow-gray-900/90
          transform transition-transform duration-300 ease-in-out
          z-50 flex flex-col p-8 space-y-8
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobile navigation"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-200 select-none">Menu</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="text-gray-400 hover:text-gray-200 transition"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

       
        <div className="flex flex-col gap-6">
          {menuItems.map(({ to, label, icon, isActive }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                flex items-center px-6 py-3 rounded-lg text-lg font-semibold
                text-gray-400 hover:bg-gray-700 hover:text-white transition
                ${isActive ? "bg-gray-700 text-white shadow-lg" : ""}
                select-none
              `}
            >
              {icon}
              {label}
            </Link>
          ))}

          {authUser && (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="
                flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold
                text-gray-400 hover:bg-gray-700 hover:text-white transition
                select-none
              "
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
