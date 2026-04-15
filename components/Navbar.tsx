import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-4">
          <div className="flex items-baseline font-serif text-3xl font-bold tracking-tighter">
            <span className="text-sid-black">sid</span>
            <div className="relative inline-flex items-center">
              <span className="text-sid-green">.</span>
              {/* Rays effect */}
              <div className="absolute -top-1 -right-1 w-4 h-4 pointer-events-none">
                 <div className="absolute top-0 right-0 w-full h-full animate-[spin_10s_linear_infinite]">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <div
                        key={angle}
                        className="absolute top-1/2 left-1/2 h-1.5 w-0.5 bg-sid-yellow origin-bottom"
                        style={{
                          transform: `translate(-50%, -100%) rotate(${angle}deg) translateY(-4px)`,
                        }}
                      />
                    ))}
                 </div>
              </div>
            </div>
          </div>
          <div className="hidden h-6 w-[1px] bg-border md:block" />
          <h1 className="hidden text-sm font-medium tracking-tight text-muted-foreground md:block">
            SID - Sistema de Investimento em Descarbonização
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Metodologia
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
