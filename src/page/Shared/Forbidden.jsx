

import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50 px-4">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col items-center gap-6 max-w-lg w-full border border-gray-100">
     
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-center">
          Access Forbidden
        </h1>
        <p className="text-base md:text-lg text-gray-500 text-center">
          Oops! You don't have permission to view this page.
          <br />
          If you believe this is a mistake, please contact your administrator.
        </p>
        <div className="flex flex-wrap gap-3 w-full justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-400 to-orange-400 text-white font-semibold px-6 py-2.5 shadow-md transition-all hover:scale-105 hover:from-red-500 hover:to-orange-500 focus:outline-none"
          >
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0a2 2 0 01-2-2V7m2 11h4m7-7l2 2m0 0l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Home
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold px-6 py-2.5 shadow-sm transition-all hover:bg-gray-100 hover:scale-105 focus:outline-none"
          >
            <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8v-10h-8v10zM13 3v6h8V3h-8z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;