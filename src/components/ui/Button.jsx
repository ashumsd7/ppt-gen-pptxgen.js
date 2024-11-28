import React from "react";

function Button({
  type = "solid", // 'solid' or 'outline'
  state = "enabled", // 'enabled' or 'disabled'
  icon: Icon, // Icon component (optional)
  label = "Button", // Button text (default)
  onClick,
  children,
  className, // Click handler
  ...props // Other props like className, etc.
}) {
  const isDisabled = state === "disabled";

  // Determine button styles based on type and state
  const baseStyles =
    "font-medium py-2 px-4   rounded-sm focus:outline-none focus:ring-2 transition-all duration-300 rounded-lg";
  const solidStyles =
    "bg-[#1f36c7] text-white hover:bg-blue-700 focus:ring-[#1f36c7] disabled:bg-blue-300 disabled:cursor-not-allowed  rounded-lg";
  const outlineStyles =
    "border border-[#1f36c7] text-[#1f36c7] bg-transparent hover:bg-[#1f36c7] hover:text-white focus:ring-[#1f36c7] disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed";

  const buttonStyles = type === "solid" ? solidStyles : outlineStyles;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${buttonStyles} flex  gap-2  justify-center items-center ${className}`}
      {...props}
    >
      {/* Icon (if provided) */}
      {Icon && <Icon className="w-5 h-5" />}

      {/* Button Label */}
      {children}
    </button>
  );
}

export default Button;
