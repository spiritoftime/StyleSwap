const CustomSeparator = () => {
  return (
    <div className="flex items-center">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="px-4 font-semibold text-gray-500">OR</span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
};

export default CustomSeparator;
