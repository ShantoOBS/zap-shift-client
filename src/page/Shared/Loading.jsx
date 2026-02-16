
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 px-4">
      <div className="relative flex flex-col items-center gap-6 rounded-2xl shadow-xl p-10 bg-white/80 border border-gray-100">
    
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-semibold text-teal-700 tracking-wide animate-pulse">
            Loading, please wait...
          </span>
          <span className="text-sm text-gray-400">
            Bringing things up to speed.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;