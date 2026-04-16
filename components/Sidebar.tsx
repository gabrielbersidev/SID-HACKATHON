import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  BarChart3, 
  Settings, 
  HelpCircle, 
  History, 
  LayoutDashboard,
  LogOut,
  User,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Sidebar = () => {
  const router = useRouter();

  const navItems = [
    { label: "Simulador", icon: LayoutDashboard, href: "/" },
    { label: "Meus Roadmaps", icon: History, href: "/roadmaps" },
  ];

  const bottomItems = [
    { label: "Configurações", icon: Settings, href: "/settings" },
    { label: "Ajuda", icon: HelpCircle, href: "/help" },
  ];

  return (
    <div className="w-64 border-r bg-white flex flex-col h-screen fixed left-0 top-0 z-30">
      <div className="p-8 pb-10">
        <Logo />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group",
                isActive 
                  ? "bg-white shadow-sm text-sid-black border border-slate-200" 
                  : "text-slate-400 hover:bg-white hover:text-sid-black hover:shadow-sm hover:border-slate-100 border border-transparent"
              )}>
                <item.icon size={18} className={isActive ? "text-sid-green" : "group-hover:text-sid-green transition-colors"} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 space-y-1">
        <div className="h-px bg-slate-200 mx-4 mb-4" />
        
        {bottomItems.map((item) => (
          <Link key={item.label} href={item.href}>
             <div className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-100 hover:text-sid-black transition-all cursor-pointer">
              <item.icon size={16} />
              {item.label}
            </div>
          </Link>
        ))}
        
        <div className="mt-8 relative pt-6">
           <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
           
           <div className="flex items-center gap-3 px-4 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sid-black flex items-center justify-center text-[10px] font-black text-white shadow-lg ring-2 ring-white">
                GB
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black text-slate-900 truncate">Gabriel Bersi</p>
                <p className="text-[10px] text-slate-400 font-bold truncate">Executivo</p>
              </div>
           </div>

           <Button 
            variant="ghost" 
            className="w-full justify-start text-[10px] font-black h-10 text-slate-400 hover:text-red-500 hover:bg-red-50 px-4 rounded-xl transition-all"
           >
            <LogOut size={14} className="mr-2" />
            Sair da Sessão
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
