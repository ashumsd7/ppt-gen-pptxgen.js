import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';

function Sidebar({ open, setOpen, title='Edit Slide', children,onConfirm }) {
  const [visible, setVisible] = useState(false); // Controls animation visibility state

  // Manage fade-in and slide-in animation with side effects
  useEffect(() => {
    if (open) {
      setVisible(true); // Show sidebar when open
    } else {
      // Delay hiding until fade-out and slide-out animation is complete
      const timeout = setTimeout(() => setVisible(false), 300); // Matches the transition duration
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible) return null; // Hide sidebar when it's not visible

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Sidebar Container */}
      <div
        className={`w-1/4 h-full bg-white flex flex-col shadow-lg transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Title Section */}
        <div className="p-4 bg-gray-100 text-lg font-semibold border-b">
          {title}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t bg-gray-100 flex justify-between space-x-4">
          <button
            className="text-blue-600 "
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <Button onClick={onConfirm}>
           Insert
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
