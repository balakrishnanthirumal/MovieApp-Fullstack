import React, { useState, useRef, useEffect } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative" ref={dropdownRef}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md bg-black"
        >
          Toggle Dropdown
        </button>

        {/* Dropdown Menu with Tailwind Transitions */}
        <div
          className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg  transition-all duration-300 transform ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 visible"
              : " opacity-0 scale-95 -translate-y-4 invisible"
          }`}
        >
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Option 1
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Option 2
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-100">
            Option 3
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
