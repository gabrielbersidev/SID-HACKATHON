import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { RoadmapParams, UserInputs } from "@/types/roadmap";
import { HelpCircle, Calendar as CalendarIcon } from "lucide-react";

interface InputScreenProps {
  onGenerate: (params: RoadmapParams) => void;
}

const InputScreen = ({ onGenerate }: InputScreenProps) => {
  const [netZeroTarget, setNetZeroTarget] = useState<boolean>(true);
  const [emissionPercentage, setEmissionPercentage] = useState<string>("50");
  const [capexBudget, setCapexBudget] = useState<string>("");
  const [opexBudget, setOpexBudget] = useState<string>("");
  const [maxAbatementCost, setMaxAbatementCost] = useState<string>("");
  const [minTrl, setMinTrl] = useState<string>("5");
  const [maxTrl, setMaxTrl] = useState<string>("9");
  const [roadmapStartYear, setRoadmapStartYear] = useState<number>(2026);
  const [roadmapEndYear, setRoadmapEndYear] = useState<number>(2030);
  const [roadmapStartMonth, setRoadmapStartMonth] = useState<Date>(new Date(2026, 0, 1));
  const [roadmapEndMonth, setRoadmapEndMonth] = useState<Date>(new Date(2030, 0, 1));

  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers === "") return "";
    return parseFloat(numbers).toLocaleString("pt-BR");
  };

  const handleCapexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCapexBudget(formatCurrency(e.target.value));
  };

  const handleOpexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpexBudget(formatCurrency(e.target.value));
  };

  const handleAbatementCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxAbatementCost(formatCurrency(e.target.value));
  };

  const handleEmissionPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setEmissionPercentage(value.toString());
  };

  const handleGenerate = () => {
    const capexValue = parseFloat(capexBudget.replace(/[^0-9]/g, "")) || 0;
    const opexValue = parseFloat(opexBudget.replace(/[^0-9]/g, "")) || 0;
    const abatementValue = parseFloat(maxAbatementCost.replace(/[^0-9]/g, "")) || 0;

    const userInputs: UserInputs = {
      netZeroTarget,
      emissionReductionPercentage: !netZeroTarget ? parseInt(emissionPercentage) : undefined,
      capexBudget: capexValue,
      opexBudget: opexValue,
      maxAbatementCost: abatementValue || 200,
      minTrl: parseInt(minTrl),
      maxTrl: parseInt(maxTrl),
      roadmapStartYear,
      roadmapEndYear,
    };

    const period = roadmapEndYear - roadmapStartYear;
    const params: RoadmapParams = {
      reductionTarget: netZeroTarget ? 100 : parseInt(emissionPercentage),
      budget: capexValue + opexValue,
      period,
    };

    onGenerate(params);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <Card className="w-full max-w-2xl shadow-lg border-muted/50 overflow-hidden">
        <CardHeader className="space-y-1 bg-muted/30 pb-8">
          <CardTitle className="text-2xl font-serif">Configurar Roadmap de Descarbonização</CardTitle>
          <CardDescription>
            Insira os parâmetros para que nossa engine calcule as melhores estratégias de descarbonização para seu cenário.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-8 px-8">
          {/* Meta de Redução de Emissões */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Meta de Redução de Emissões</Label>
              <Tooltip open={false}>
                <TooltipTrigger>
                  <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Escolha entre atingir Net Zero em 2050 ou definir uma meta percentual personalizada
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup value={netZeroTarget ? "net-zero" : "custom"}>
              <RadioGroupItem value="net-zero" onClick={() => setNetZeroTarget(true)}>
                Atingir Net Zero em 2050
              </RadioGroupItem>
              <RadioGroupItem value="custom" onClick={() => setNetZeroTarget(false)}>
                Definir Meta Percentual
              </RadioGroupItem>
            </RadioGroup>

            {!netZeroTarget && (
              <div className="mt-4 flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={emissionPercentage}
                  onChange={handleEmissionPercentageChange}
                  className="w-24"
                />
                <span className="text-sm font-medium text-muted-foreground">%</span>
              </div>
            )}
          </div>

          {/* Período do Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Período do Roadmap</Label>
              <Tooltip open={false}>
                <TooltipTrigger>
                  <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Selecione o período para o primeiro ciclo (2025-2050)
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-year" className="text-sm">Ano de Início</Label>
                <Select value={roadmapStartYear.toString()} onValueChange={(v) => setRoadmapStartYear(parseInt(v))}>
                  <SelectTrigger id="start-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 26 }, (_, i) => 2025 + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-year" className="text-sm">Ano de Fim</Label>
                <Select value={roadmapEndYear.toString()} onValueChange={(v) => setRoadmapEndYear(parseInt(v))}>
                  <SelectTrigger id="end-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 26 }, (_, i) => 2025 + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Orçamento CAPEX e OPEX */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Orçamento</Label>
              <Tooltip open={false}>
                <TooltipTrigger>
                  <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  CAPEX: custo de investimento inicial. OPEX: custo operacional anual
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capex" className="text-sm">Orçamento CAPEX Anual</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">R$</span>
                  <Input
                    id="capex"
                    type="text"
                    placeholder="Ex: 50.000"
                    value={capexBudget}
                    onChange={handleCapexChange}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="opex" className="text-sm">Orçamento OPEX Anual</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">R$</span>
                  <Input
                    id="opex"
                    type="text"
                    placeholder="Ex: 10.000"
                    value={opexBudget}
                    onChange={handleOpexChange}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Custo Máximo de Mitigação */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="abatement" className="text-base font-semibold">Custo Máximo de Mitigação ($/tCO2e)</Label>
              <Tooltip open={false}>
                <TooltipTrigger>
                  <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Custo máximo por tonelada de CO2e mitigada que você está disposto a pagar
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
              <Input
                id="abatement"
                type="text"
                placeholder="Ex: 200"
                value={maxAbatementCost}
                onChange={handleAbatementCostChange}
                className="pl-9"
              />
            </div>
          </div>

          {/* TRL Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Faixa de TRL Preferencial</Label>
              <Tooltip open={false}>
                <TooltipTrigger>
                  <HelpCircle size={16} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  TRL (Technology Readiness Level): 1-3 (Pesquisa), 4-6 (Desenvolvimento), 7-9 (Comercial)
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-trl" className="text-sm">TRL Mínimo</Label>
                <Select value={minTrl} onValueChange={setMinTrl}>
                  <SelectTrigger id="min-trl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((trl) => (
                      <SelectItem key={trl} value={trl.toString()}>
                        TRL {trl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-trl" className="text-sm">TRL Máximo</Label>
                <Select value={maxTrl} onValueChange={setMaxTrl}>
                  <SelectTrigger id="max-trl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((trl) => (
                      <SelectItem key={trl} value={trl.toString()}>
                        TRL {trl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-8 pt-0">
          <Button 
            onClick={handleGenerate} 
            className="w-full text-lg font-semibold py-6 bg-sid-green hover:bg-sid-green/90 text-white"
          >
            Gerar Roadmap
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InputScreen;
