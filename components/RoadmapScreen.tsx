import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoadmapStep, Technology, UserInputs } from "@/types/roadmap";
import { PlusCircle, ArrowRight, Info, Zap, ShieldCheck } from "lucide-react";
import ComparisonModal from "./ComparisonModal";
import { suggestNextTechnologies } from "@/data/mockRoadmapData";

interface RoadmapScreenProps {
  initialEntries: RoadmapStep[];
  initialInputs?: UserInputs;
}

const RoadmapScreen = ({ initialEntries, initialInputs }: RoadmapScreenProps) => {
  const [entries, setEntries] = useState<RoadmapStep[]>(initialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedTechs, setSuggestedTechs] = useState<Technology[]>([]);

  const handleAddClick = () => {
    // We use the initial inputs to filter suggestions
    // In a real app, these inputs might be updated or come from a context
    const inputs: UserInputs = initialInputs || {
      netZeroTarget: true,
      capexBudget: 1000000000,
      opexBudget: 100000000,
      maxAbatementCost: 1000,
      minTrl: 1,
      maxTrl: 9,
      roadmapStartYear: entries[entries.length - 1].endYear,
      roadmapEndYear: entries[entries.length - 1].endYear + 5,
    };

    const nextTechs = suggestNextTechnologies(entries[entries.length - 1].endYear, inputs);
    setSuggestedTechs(nextTechs);
    setIsModalOpen(true);
  };

  const handleSelectTech = (tech: Technology) => {
    const lastEntry = entries[entries.length - 1];
    const period = lastEntry.endYear - lastEntry.startYear;
    
    const newEntry: RoadmapStep = {
      id: `step-${entries.length + 1}`,
      technology: tech,
      startYear: lastEntry.endYear,
      endYear: lastEntry.endYear + period,
    };
    setEntries([...entries, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sid-green/10 border border-sid-green/20 text-sid-green text-[10px] font-bold uppercase tracking-widest">
           <ShieldCheck size={12} /> Roadmap Validado
        </div>
        <h2 className="text-4xl font-serif font-bold">Visão Estratégica 2050</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Sequenciamento tecnológico otimizado para atingir suas metas de redução com eficiência financeira.
        </p>
      </div>

      {/* Horizontal Timeline Container */}
      <div className="relative flex flex-nowrap items-start gap-8 overflow-x-auto pb-12 pt-10 px-6 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, index) => (
            <React.Fragment key={entry.id}>
              {/* Technology Node */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex-shrink-0 w-80 relative group"
              >
                {/* Year Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sid-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full z-20 shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
                  {entry.startYear} — {entry.endYear}
                </div>

                <Card className="border-2 border-slate-100 hover:border-sid-green transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-300 bg-white">
                  <CardHeader className="pb-2 space-y-3">
                    <div className="flex items-center justify-between">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sid-green border border-slate-100">
                          <Zap size={20} className="fill-sid-green" />
                       </div>
                       <div className="px-2 py-0.5 rounded-md bg-slate-100 text-[9px] font-bold text-slate-500 uppercase">
                          TRL {entry.technology.implementation.trl}
                       </div>
                    </div>
                    <CardTitle className="text-lg font-bold h-12 flex items-center leading-tight">
                       {entry.technology.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground line-clamp-3 h-12 border-l-2 border-slate-100 pl-3">
                      {entry.technology.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                       <div className="space-y-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                             Mitigação
                          </span>
                          <span className="text-xs font-bold text-sid-green">
                             {entry.technology.mitigationPotential.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">t/ano</span>
                          </span>
                       </div>
                       <div className="space-y-1 text-right">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">CAPEX</span>
                          <span className="text-xs font-bold">
                             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(entry.technology.economicViability.capex)}
                          </span>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Connector Arrow */}
              {index < entries.length - 1 && (
                <div className="flex-shrink-0 self-center">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="w-8 h-0.5 bg-slate-200 relative origin-left"
                  >
                    <ArrowRight className="absolute -right-2 -top-2 text-slate-300 h-4 w-4" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        {/* Add Button Area */}
        <motion.div 
          layout
          className="flex-shrink-0 flex flex-col items-center justify-center w-72 h-[310px] border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-sid-green/30 transition-all cursor-pointer group shadow-sm"
          onClick={handleAddClick}
        >
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-sid-green/10 group-hover:border-sid-green group-hover:scale-110 transition-all duration-300">
             <PlusCircle className="w-8 h-8 text-slate-400 group-hover:text-sid-green" />
          </div>
          <span className="mt-6 text-sm font-bold text-slate-600 group-hover:text-sid-green">Configurar Próxima Etapa</span>
          <span className="mt-1 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Analisar Viabilidade</span>
        </motion.div>
      </div>

      <ComparisonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        technologies={suggestedTechs}
        onSelect={handleSelectTech}
      />
    </div>
  );
};

export default RoadmapScreen;
