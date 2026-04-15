import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5 select-none">
      <div className="relative">
        <span className="font-serif text-3xl font-black text-sid-black">s</span>
        <div className="inline-block relative">
          <span className="font-serif text-3xl font-black text-sid-black">i</span>
          {/* Green dot on top of the 'i' */}
          <div className="absolute -top-[1.1rem] left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Rays */}
            <div className="flex gap-1.5 mb-0.5 animate-pulse">
              <div className="w-0.5 h-2 bg-sid-yellow rounded-full -rotate-[45deg] origin-bottom" />
              <div className="w-0.5 h-2.5 bg-sid-yellow rounded-full" />
              <div className="w-0.5 h-2 bg-sid-yellow rounded-full rotate-[45deg] origin-bottom" />
            </div>
            {/* Dot */}
            <div className="w-3.5 h-3.5 bg-sid-green rounded-full shadow-[0_0_8px_rgba(46,204,113,0.4)]" />
          </div>
        </div>
        <span className="font-serif text-3xl font-black text-sid-black truncate">d.</span>
      </div>
    </div>
  );
};

export default Logo;
