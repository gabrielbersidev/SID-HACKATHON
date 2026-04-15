import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Technology } from "@/types/roadmap";
import { Zap, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Award } from "lucide-react";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  technologies: Technology[];
  onSelect: (tech: Technology) => void;
}

const ComparisonModal = ({ isOpen, onClose, technologies, onSelect }: ComparisonModalProps) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Comparar Próximas Tecnologias</DialogTitle>
          <DialogDescription>
            Escolha a tecnologia mais adequada para o próximo período do seu roadmap. Compare os dados de cada alternativa.
          </DialogDescription>
        </DialogHeader>

        {/* Desktop Table View */}
        {!isMobileView && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-muted">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Tecnologia</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Potencial de Mitigação</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">TRL</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">CAPEX</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">OPEX/Ano</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Custo de Mitigação</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">ROI</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Payback</th>
                  <th className="text-center py-3 px-4 font-semibold">Ação</th>
                </tr>
              </thead>
              <tbody>
                {technologies.map((tech, idx) => (
                  <tr
                    key={tech.id}
                    className={`border-b border-muted/50 hover:bg-muted/30 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-muted/5"
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-foreground">{tech.name}</div>
                        <div className="text-xs text-muted-foreground mt-1 max-w-xs line-clamp-2">
                          {tech.description}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="space-y-2">
                        <div className="text-sm font-bold text-primary">
                          {(tech.mitigationPotential / 1000).toFixed(0)}k tCO2e
                        </div>
                        <Progress value={Math.min(100, (tech.mitigationPotential / 500000) * 100)} className="h-2" />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                        <Award size={14} />
                        {tech.implementation.trl}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-sm font-semibold text-foreground whitespace-nowrap">
                        {formatUSD(tech.economicViability.capex)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-sm font-semibold text-foreground whitespace-nowrap">
                        {formatUSD(tech.economicViability.opex)}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-sm font-semibold text-foreground whitespace-nowrap">
                        {formatUSD(tech.economicViability.abatementCost)}/tCO2e
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1">
                        {tech.economicViability.roi > 0 ? (
                          <>
                            <TrendingUp size={16} className="text-green-600" />
                            <span className="text-sm font-bold text-green-600">
                              {(tech.economicViability.roi * 100).toFixed(0)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown size={16} className="text-red-600" />
                            <span className="text-sm font-bold text-red-600">
                              {(tech.economicViability.roi * 100).toFixed(0)}%
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="text-sm font-bold text-foreground">
                        {tech.economicViability.paybackPeriod} anos
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button
                        onClick={() => onSelect(tech)}
                        size="sm"
                        className="group"
                        variant="outline"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        Selecionar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Card View */}
        {isMobileView && (
          <div className="grid grid-cols-1 gap-4 py-6">
            {technologies.map((tech) => (
              <Card key={tech.id} className="flex flex-col border-muted hover:border-primary/50 transition-all shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">{tech.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{tech.description}</p>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  {/* Mitigation Potential */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Potencial de Mitigação</span>
                      <span className="text-primary">
                        {(tech.mitigationPotential / 1000).toFixed(0)}k tCO2e
                      </span>
                    </div>
                    <Progress value={Math.min(100, (tech.mitigationPotential / 500000) * 100)} className="h-2" />
                  </div>

                  {/* TRL */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">TRL</span>
                      <p className="text-sm font-bold mt-1">{tech.implementation.trl}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Payback</span>
                      <p className="text-sm font-bold mt-1">{tech.economicViability.paybackPeriod} anos</p>
                    </div>
                  </div>

                  {/* Economic Data */}
                  <div className="grid grid-cols-2 gap-2 border-t pt-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">CAPEX</span>
                      <p className="text-xs font-bold mt-1">{formatUSD(tech.economicViability.capex)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">OPEX/Ano</span>
                      <p className="text-xs font-bold mt-1">{formatUSD(tech.economicViability.opex)}</p>
                    </div>
                  </div>

                  {/* ROI & Abatement Cost */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">ROI</span>
                      {tech.economicViability.roi > 0 ? (
                        <TrendingUp size={12} className="text-green-600" />
                      ) : (
                        <TrendingDown size={12} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold">
                        {(tech.economicViability.roi * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  {/* Challenges */}
                  {tech.implementation.challenges.length > 0 && (
                    <div className="border-t pt-3">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground block mb-2">
                        Desafios
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {tech.implementation.challenges.slice(0, 2).map((challenge, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded"
                          >
                            {challenge}
                          </span>
                        ))}
                        {tech.implementation.challenges.length > 2 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{tech.implementation.challenges.length - 2} mais
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-3 border-t bg-muted/10">
                  <Button 
                    onClick={() => onSelect(tech)} 
                    className="w-full font-semibold group"
                    variant="outline"
                  >
                    Selecionar
                    <CheckCircle2 className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-4 border-t">
          <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
            Sair sem selecionar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
