import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoadmapStep } from "@/types/decarbonization";
import { PlusCircle, ArrowRight, Trash2, Zap, ShieldCheck, Calendar, Save, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapScreenProps {
  steps: RoadmapStep[];
  onAddNextCycle: () => void;
  onRemoveStep: (id: string) => void;
}

const RoadmapScreen = ({ steps, onAddNextCycle, onRemoveStep }: RoadmapScreenProps) => {
  const lastYear = steps.length > 0 ? steps[steps.length - 1].endYear : 2026;
  const isComplete = lastYear >= 2050;

  const handleSave = () => {
    localStorage.setItem("latest_roadmap", JSON.stringify(steps));
    alert("Roadmap salvo temporariamente no seu workspace!");
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Simulation Stats / Overview */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sid-green/10 border border-sid-green/20 text-sid-green text-[10px] font-bold uppercase tracking-widest">
             <ShieldCheck size={12} /> Roadmap Validado
          </div>
          <h1 className="text-4xl font-serif font-black">Consolidação do Roadmap</h1>
          <p className="text-muted-foreground text-lg font-medium">
            Projeção estratégica de 2026 até <span className="text-sid-black font-bold">{lastYear}</span>.
          </p>
        </div>

        <div className="flex items-center gap-6">
           <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Passos</p>
              <p className="text-2xl font-bold">{steps.length}</p>
           </div>
           <div className="h-10 w-px bg-slate-200" />
           <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className={cn(
                "text-sm font-bold px-3 py-1 rounded-lg",
                isComplete ? "bg-sid-green text-white" : "bg-slate-100 text-slate-600"
              )}>
                {isComplete ? "Finalizado" : "Em Construção"}
              </p>
           </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="flex flex-nowrap items-start gap-10 overflow-x-auto pb-12 pt-10 px-2 scrollbar-hide min-h-[450px]">
        <AnimatePresence mode="popLayout">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-shrink-0 items-start gap-10"
            >
              <div className="w-[340px] relative group">
                {/* Year Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sid-black text-white text-[10px] font-bold px-5 py-2 rounded-full z-20 shadow-2xl border border-white/10 group-hover:scale-110 transition-transform flex items-center gap-2">
                  <Calendar size={12} /> {step.startYear} — {step.endYear}
                </div>

                <Card className="border-2 border-slate-100 hover:border-sid-green transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-300 bg-white overflow-hidden group/card relative">
                  {/* Delete Action */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity text-slate-300 hover:text-red-500 hover:bg-red-50"
                    onClick={() => onRemoveStep(step.id)}
                  >
                    <Trash2 size={16} />
                  </Button>

                  <CardHeader className="pb-4 space-y-4">
                    <div className="flex items-center justify-between">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sid-green border border-slate-100">
                          <Zap size={24} className="fill-sid-green" />
                       </div>
                       <div className="px-2.5 py-1 rounded-md bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                          TRL {step.technology.implementation.trl}
                       </div>
                    </div>
                    <CardTitle className="text-xl font-bold h-14 flex items-center leading-tight font-serif">
                       {step.technology.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 h-12 border-l-2 border-slate-100 pl-4 italic">
                      "{step.technology.description}"
                    </p>
                    
                    <div className="space-y-3 pt-6 border-t border-slate-50">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ponto de Impacto</span>
                          <span className="text-sm font-bold text-sid-green">
                             {step.technology.mitigationPotential.toLocaleString()} tCO2e/ano
                          </span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div 
                            className="h-full bg-sid-green rounded-full shadow-[0_0_10px_rgba(46,204,113,0.3)]" 
                            style={{ width: `${Math.min(100, (step.technology.mitigationPotential / 500000) * 100)}%` }} 
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                       <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">CAPEX Alocado</span>
                          <span className="text-xs font-bold text-slate-900">
                             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(step.technology.economicViability.capex)}
                          </span>
                       </div>
                       <div className="space-y-1 text-right">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ROI Projetado</span>
                          <span className="text-xs font-bold text-slate-900 italic">
                             {(step.technology.economicViability.roi * 100).toFixed(1)}%
                          </span>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 self-center">
                  <div className="w-10 h-0.5 bg-slate-200 relative origin-left">
                    <ArrowRight className="absolute -right-2 -top-2 text-slate-300 h-4 w-4" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Next Cycle Button - Hidden when 2050 reached */}
        {!isComplete && (
          <motion.div 
            layout
            className="flex-shrink-0 flex flex-col items-center justify-center w-80 h-[400px] border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-50/50 hover:border-sid-green/40 transition-all cursor-pointer group shadow-sm bg-white/50"
            onClick={onAddNextCycle}
          >
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center border border-slate-100 group-hover:bg-sid-green shadow-sm group-hover:shadow-sid-green/30 group-hover:scale-110 group-hover:border-transparent transition-all duration-300">
               <PlusCircle className="w-10 h-10 text-slate-300 group-hover:text-white transition-colors" />
            </div>
            <p className="mt-8 text-lg font-bold text-slate-700 group-hover:text-sid-green transition-colors">Adicionar Próximo Ciclo</p>
            <p className="mt-2 text-xs text-slate-400 font-medium uppercase tracking-[0.2em]">Planejamento Estratégico</p>
            
            <div className="mt-10 px-6 py-2 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white">
               Simular Novas Alternativas
            </div>
          </motion.div>
        )}
      </div>

      {/* Completion Section / Timeline Summary */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-10"
          >
            <div className="bg-sid-black rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-sid-green/10 rounded-full -mr-32 -mt-32" />
               
               <div className="flex flex-col md:flex-row items-start justify-between gap-10 relative z-10">
                  <div className="space-y-6 flex-1">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sid-green/20 text-sid-green text-[10px] font-black uppercase tracking-widest">
                        <ListChecks size={12} /> Roadmap Concluído
                     </div>
                     <h2 className="text-4xl font-serif font-black leading-tight">Sua estratégia de descarbonização está pronta.</h2>
                     <p className="text-white/60 text-lg leading-relaxed">
                        Analisamos {steps.length} ciclos de investimento e validamos o caminho tecnológico até 2050 com conformidade orçamentária.
                     </p>
                  </div>
                  
                  <div className="flex flex-col gap-4 w-full md:w-auto">
                     <Button 
                       onClick={handleSave}
                       className="h-14 bg-sid-green hover:bg-sid-green/90 text-sid-black font-black px-10 rounded-2xl shadow-xl shadow-sid-green/20"
                     >
                       <Save className="mr-2 h-5 w-5" /> Salvar no Workspace
                     </Button>
                     <Button 
                       variant="outline" 
                       className="h-14 border-white/20 hover:bg-white/10 text-white font-black px-10 rounded-2xl"
                     >
                       Explorar Relatório Completo
                     </Button>
                  </div>
               </div>

               {/* Summary Mini-Timeline */}
               <div className="mt-16 pt-10 border-t border-white/10 overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8">Linha do Tempo de Investimento</p>
                  <div className="flex items-center gap-1">
                     {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1 flex-1 min-w-0">
                           <div 
                              className="h-2 flex-1 rounded-full bg-sid-green/40 hover:bg-sid-green transition-colors cursor-help" 
                              title={`${step.technology.name} (${step.startYear}-${step.endYear})`}
                           />
                           {idx < steps.length - 1 && <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />}
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-4">
                     <span className="text-[10px] font-bold text-white/30">2026</span>
                     <span className="text-[10px] font-bold text-white/30">Metas Internacionais</span>
                     <span className="text-[10px] font-bold text-white/30 truncate">2050 - NET ZERO</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoadmapScreen;
