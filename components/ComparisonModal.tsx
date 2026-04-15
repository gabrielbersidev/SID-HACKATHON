import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Technology } from "@/types/decarbonization";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Info
} from "lucide-react";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  technologies: Technology[];
  onSelect: (tech: Technology) => void;
}

const ComparisonModal = ({ isOpen, onClose, technologies, onSelect }: ComparisonModalProps) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-7xl max-h-[95vh] overflow-hidden flex flex-col bg-white border-none shadow-[0_40px_100px_rgba(0,0,0,0.2)] z-[100] p-0 rounded-[2.5rem]">
        {/* Header Section */}
        <DialogHeader className="px-12 pt-12 pb-8 bg-slate-50/80 border-b relative">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-2 h-6 bg-sid-green rounded-full" />
             <span className="text-xs font-black uppercase tracking-[0.3em] text-sid-green/70">Decision Matrix</span>
          </div>
          <DialogTitle className="text-5xl font-serif font-black tracking-tight leading-none">
             Estratégias para o <span className="text-sid-green">Próximo Ciclo</span>
          </DialogTitle>
          <DialogDescription className="text-xl font-medium text-slate-400 mt-4 max-w-2xl">
            Compare as métricas de viabilidade e impacto para selecionar a tecnologia de transição.
          </DialogDescription>
        </DialogHeader>

        {/* Content Section with more padding */}
        <div className="flex-1 overflow-auto px-12 py-10">
          <div className="min-w-[950px] pb-10">
            <Table className="border-separate border-spacing-x-4">
              <TableHeader className="bg-white sticky top-0 z-20">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[240px] border-none font-bold py-10 text-slate-300 uppercase tracking-widest text-[11px] align-bottom">
                      Métricas de Comparação
                  </TableHead>
                  {technologies.map((tech) => (
                    <TableHead key={tech.id} className="min-w-[280px] border-none text-center py-6 px-4">
                      <div className="space-y-4 p-8 rounded-[2rem] bg-sid-black text-white shadow-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-sid-green/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                         <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                               <Cpu size={28} className="text-sid-green" />
                            </div>
                            <div className="space-y-1 text-center">
                               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sid-green">Tecnologia</p>
                               <div className="text-2xl font-serif font-black leading-tight">{tech.name}</div>
                            </div>
                            <Badge className="bg-sid-green text-sid-black font-black uppercase tracking-widest text-[9px] py-1 px-3">
                               TRL {tech.implementation.trl}
                            </Badge>
                         </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mitigation Potential */}
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell className="font-black py-12 align-top text-slate-800 pr-10">
                     Potencial de Mitigação
                     <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">Capacidade anual de remoção direta de CO2e.</p>
                  </TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="text-center py-12 px-6">
                       <div className="space-y-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                          <div className="text-4xl font-black text-sid-green flex flex-col gap-1">
                             {tech.mitigationPotential.toLocaleString()} 
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">toneladas / ano</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-200/50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                             <div 
                                className="h-full bg-sid-green shadow-[0_0_20px_rgba(46,204,113,0.5)]" 
                                style={{ width: `${Math.min(100, (tech.mitigationPotential / 500000) * 100)}%` }} 
                             />
                          </div>
                       </div>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Economic Efficiency */}
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell className="font-black py-12 align-top text-slate-800 pr-10">
                     Viabilidade Estratégica
                     <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">Eficiência do capital alocado e retorno projetado.</p>
                  </TableCell>
                  {technologies.map((tech) => {
                    const isGoodRoi = tech.economicViability.roi > 0.15;
                    return (
                      <TableCell key={tech.id} className="text-center py-12 px-6">
                        <div className="space-y-6">
                            <div className={cn(
                              "flex items-center justify-center gap-3 py-3 px-6 rounded-2xl w-fit mx-auto border shadow-sm",
                              isGoodRoi ? "bg-sid-green/5 text-sid-green border-sid-green/20" : "bg-slate-50 text-slate-500 border-slate-200"
                            )}>
                              {isGoodRoi ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                              <span className="text-lg font-black italic tracking-tight">ROI: {(tech.economicViability.roi * 100).toFixed(1)}%</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-105">
                                  <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-2">CAPEX</span>
                                  <span className="text-sm font-black text-slate-900">{formatCurrency(tech.economicViability.capex)}</span>
                                </div>
                                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm transition-transform hover:scale-105">
                                  <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-2">Custo / t</span>
                                  <span className="text-sm font-black text-slate-900">{formatCurrency(tech.economicViability.abatementCost)}</span>
                                </div>
                            </div>
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>

                {/* Tech Highlights */}
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell className="font-black py-12 align-top text-slate-800 pr-10">
                     Análise do Gestor
                     <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">Perspectiva sobre maturidade e desafios.</p>
                  </TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="py-12 px-6">
                       <div className="relative p-8 rounded-3xl bg-slate-50/50 border border-slate-100 italic text-slate-500 text-sm leading-relaxed min-h-[140px] flex items-center">
                          <Info className="absolute -top-3 -left-3 text-sid-green bg-white rounded-full p-1 border border-slate-100 shadow-sm" size={24} />
                          "{tech.description}"
                       </div>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Selection Action */}
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell className="py-12"></TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="text-center py-16 px-6">
                       <Button 
                         onClick={() => onSelect(tech)} 
                         className="w-full h-20 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] group bg-sid-black hover:bg-sid-green text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-sid-green/40 hover:-translate-y-2 active:scale-95"
                       >
                         Integrar à Estratégia
                         <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                       </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer with improved profile style */}
        <div className="border-t p-10 flex justify-between items-center bg-slate-50 relative overflow-hidden px-12">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2ECC71_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="flex items-center gap-10 text-[11px] text-slate-400 uppercase font-black tracking-[0.25em] relative z-10">
             <div className="flex items-center gap-2.5"><ShieldCheck className="text-sid-green" size={20} /> Base de Dados 2026</div>
             <div className="flex items-center gap-2.5"><Cpu className="text-slate-800" size={20} /> Motor Decisório IA</div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-sid-black font-black uppercase tracking-widest text-[10px] h-14 rounded-2xl px-10 relative z-10 hover:bg-white/50 transition-all">
            Abandonar Simulação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
