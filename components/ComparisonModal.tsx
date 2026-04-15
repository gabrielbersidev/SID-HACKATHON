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
import { Technology } from "@/types/roadmap";
import { 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Layers, 
  Zap, 
  ArrowRight,
  ShieldCheck
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
      <DialogContent className="max-w-[95vw] md:max-w-7xl max-h-[90vh] overflow-hidden flex flex-col bg-white border-none shadow-2xl z-[100]">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 mb-1">
             <Layers className="text-sid-green w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Matriz de Decisão</span>
          </div>
          <DialogTitle className="text-3xl font-serif">Comparação Técnica de Estratégias</DialogTitle>
          <DialogDescription className="text-base">
            Analise a viabilidade econômica e o potencial de mitigação antes de selecionar a próxima etapa do roadmap.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="min-w-[800px]">
            <Table className="border-separate border-spacing-0">
              <TableHeader className="bg-slate-50 sticky top-0 z-20">
                <TableRow>
                  <TableHead className="w-[200px] border-b font-bold py-4">Critérios</TableHead>
                  {technologies.map((tech) => (
                    <TableHead key={tech.id} className="min-w-[250px] border-b text-center py-6">
                      <div className="space-y-1">
                         <div className="text-lg font-bold text-slate-900">{tech.name}</div>
                         <Badge variant="outline" className="text-[10px] border-sid-green/30 text-sid-green bg-sid-green/5">
                            TRL {tech.implementation.trl}
                         </Badge>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mitigation Potential */}
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-semibold align-top pt-6">
                     Potencial de Mitigação
                     <p className="text-[10px] text-muted-foreground font-normal">tCO2e mitigadas anualmente</p>
                  </TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="text-center pt-6 px-6">
                       <div className="space-y-3">
                          <div className="text-xl font-bold text-sid-green">
                             {tech.mitigationPotential.toLocaleString()} <span className="text-xs font-normal">tCO2e/ano</span>
                          </div>
                          <Progress value={Math.min(100, (tech.mitigationPotential / 500000) * 100)} className="h-1.5 bg-slate-100" />
                       </div>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Economic Viability */}
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-semibold align-top pt-6 border-t">
                     Viabilidade Econômica
                     <p className="text-[10px] text-muted-foreground font-normal">CAPEX, OPEX e Custo de Abatimento</p>
                  </TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="text-center pt-6 px-6 border-t">
                       <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-left">
                             <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                <span className="text-[9px] uppercase font-bold text-muted-foreground block">CAPEX</span>
                                <span className="text-xs font-bold">{formatCurrency(tech.economicViability.capex)}</span>
                             </div>
                             <div className="bg-slate-50 p-2 rounded border border-slate-100">
                                <span className="text-[9px] uppercase font-bold text-muted-foreground block">Abatement</span>
                                <span className="text-xs font-bold">{formatCurrency(tech.economicViability.abatementCost)}/t</span>
                             </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 py-1 px-3 bg-sid-green/10 text-sid-green rounded-full w-fit mx-auto">
                             {tech.economicViability.roi > 0.15 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                             <span className="text-xs font-bold">ROI Estimado: {(tech.economicViability.roi * 100).toFixed(1)}%</span>
                          </div>
                       </div>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Implementation Challenges */}
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-semibold align-top pt-6 border-t">
                     Desafios de Implementação
                     <p className="text-[10px] text-muted-foreground font-normal">Barreiras regulatórias e técnicas</p>
                  </TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="text-center pt-6 px-6 border-t">
                       <div className="flex flex-wrap gap-2 justify-center max-w-[200px] mx-auto">
                          {tech.implementation.challenges.map((challenge, i) => (
                            <Badge key={i} variant="secondary" className="text-[9px] py-0 px-2 bg-slate-100 text-slate-600 border-none font-medium">
                               {challenge}
                            </Badge>
                          ))}
                       </div>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Market Analysis */}
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-semibold align-top pt-6 border-t">
                     Análise de Mercado
                     <p className="text-[10px] text-muted-foreground font-normal">Competição e maturidade</p>
                  </TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="pt-6 px-6 border-t">
                       <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 italic">
                          "{tech.marketCompetition}"
                       </p>
                    </TableCell>
                  ))}
                </TableRow>

                {/* Action Row */}
                <TableRow className="hover:bg-transparent">
                  <TableCell className="border-t"></TableCell>
                  {technologies.map((tech) => (
                    <TableCell key={tech.id} className="text-center py-8 border-t">
                       <Button 
                         onClick={() => onSelect(tech)} 
                         className="w-48 py-6 rounded-full font-bold group bg-sid-black hover:bg-sid-green transition-all"
                       >
                         Selecionar
                         <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                       </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="border-t p-4 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-6 text-[10px] text-muted-foreground uppercase font-bold tracking-widest pl-4">
             <div className="flex items-center gap-1.5"><ShieldCheck className="text-sid-green" size={14} /> Dados Verificados</div>
             <div className="flex items-center gap-1.5"><Zap className="text-sid-yellow" size={14} /> Simulação Instantânea</div>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            Fechar Matriz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
