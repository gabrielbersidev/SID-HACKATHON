import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoadmapEntry, Technology } from "@/types/roadmap";
import { PlusCircle, ArrowRight, Info, Zap, AlertTriangle } from "lucide-react";
import ComparisonModal from "./ComparisonModal";
import { suggestNextTechnologies } from "@/data/mockRoadmapData";

interface RoadmapScreenProps {
  initialEntries: RoadmapEntry[];
}

const RoadmapScreen = ({ initialEntries }: RoadmapScreenProps) => {
  const [entries, setEntries] = useState<RoadmapEntry[]>(initialEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedTechs, setSuggestedTechs] = useState<Technology[]>([]);

  const handleAddClick = () => {
    const nextTechs = suggestNextTechnologies(entries);
    setSuggestedTechs(nextTechs);
    setIsModalOpen(true);
  };

  const handleSelectTech = (tech: Technology) => {
    const lastEntry = entries[entries.length - 1];
    const newEntry: RoadmapEntry = {
      id: `entry-${entries.length + 1}`,
      technologyId: tech.id,
      technology: tech,
      startYear: lastEntry.endYear,
      endYear: lastEntry.endYear + (lastEntry.endYear - lastEntry.startYear), // Same interval
    };
    setEntries([...entries, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold">Seu Roadmap de Descarbonização</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg underline-offset-4 decoration-primary/30">
          Uma visão estratégica das tecnologias necessárias para atingir suas metas até 2050.
        </p>
      </div>

      {/* Horizontal Timeline Container */}
      <div className="relative flex flex-nowrap items-start gap-8 overflow-x-auto pb-12 pt-8 px-4 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, index) => (
            <React.Fragment key={entry.id}>
              {/* Technology Node */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex-shrink-0 w-80 relative group"
              >
                {/* Year Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sid-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-20 shadow-lg">
                  {entry.startYear} — {entry.endYear}
                </div>

                <Card className="border-2 border-muted hover:border-primary transition-all shadow-md group-hover:shadow-xl group-hover:-translate-y-2 duration-300">
                  <CardHeader className="pb-2 space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                       <Zap size={20} className="fill-primary" />
                    </div>
                    <CardTitle className="text-lg font-bold h-12 flex items-center">{entry.technology.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 h-15 border-l-2 border-primary/20 pl-3">
                      {entry.technology.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                             <Info size={10} /> Impacto
                          </span>
                          <span className="text-sm font-bold text-sid-green">+{entry.technology.mitigationPotential}% Metas</span>
                       </div>
                       <div className="flex flex-col text-right">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Complexidade</span>
                          <span className="text-sm font-bold">{entry.technology.complexity}</span>
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
                    className="w-8 h-0.5 bg-muted-foreground/30 relative origin-left"
                  >
                    <ArrowRight className="absolute -right-2 -top-2 text-muted-foreground/30 h-4 w-4" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>

        {/* Add Button Area */}
        <motion.div 
          layout
          className="flex-shrink-0 flex flex-col items-center justify-center w-64 h-[300px] border-2 border-dashed border-muted rounded-xl hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group"
          onClick={handleAddClick}
        >
          <PlusCircle className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-110 duration-200" />
          <span className="mt-4 text-sm font-semibold text-muted-foreground group-hover:text-primary">Adicionar Próxima Etapa</span>
          <span className="mt-1 text-[10px] text-muted-foreground/60 uppercase tracking-widest">Analisar Estratégias</span>
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
