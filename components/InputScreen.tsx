import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserInputs } from "@/types/decarbonization";
import { CalendarIcon, Info, TrendingUp, DollarSign, Target } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface InputScreenProps {
  onGenerate: (inputs: UserInputs) => void;
}

const InputScreen = ({ onGenerate }: InputScreenProps) => {
  const [netZero, setNetZero] = useState<string>("true");
  const [percent, setPercent] = useState<number>(50);
  const [capex, setCapex] = useState<string>("50000000");
  const [opex, setOpex] = useState<string>("5000000");
  const [maxAbatement, setMaxAbatement] = useState<number>(200);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2030, 11, 31),
  });

  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, "");
    if (!num) return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(Number(num));
  };

  const handleCurrencyChange = (value: string, setter: (v: string) => void) => {
    setter(value.replace(/\D/g, ""));
  };

  const handleGenerate = () => {
    if (!dateRange?.from || !dateRange?.to) return;

    onGenerate({
      netZeroTarget: netZero === "true",
      emissionReductionPercentage: netZero === "false" ? percent : undefined,
      capexBudget: Number(capex),
      opexBudget: Number(opex),
      maxAbatementCost: maxAbatement,
      minTrl: 1,
      maxTrl: 9,
      initialRoadmapPeriod: {
        startYear: dateRange.from.getFullYear(),
        endYear: dateRange.to.getFullYear(),
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <Card className="shadow-none border-none bg-transparent">
        <CardHeader className="px-0 pb-10">
          <div className="flex items-center gap-2 mb-2">
             <Target className="text-sid-green w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Configuração Estratégica</span>
          </div>
          <CardTitle className="text-4xl font-serif">Simulador de Descarbonização</CardTitle>
          <CardDescription className="text-lg text-slate-500 max-w-2xl">
            Defina suas metas e restrições para gerar o primeiro ciclo de investimento do seu roadmap de transição.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 px-0">
          {/* Target Section */}
          <div className="space-y-8">
            <div className="space-y-2">
               <Label className="text-sm font-bold text-slate-900">Objetivo de Redução</Label>
               <p className="text-xs text-slate-500">Selecione o compromisso climático da sua organização.</p>
            </div>
            
            <RadioGroup value={netZero} onValueChange={setNetZero} className="grid grid-cols-1 gap-4">
              <div className={cn(
                "flex items-center space-x-3 space-y-0 border rounded-xl p-5 hover:bg-slate-50 transition-all cursor-pointer",
                netZero === "true" ? "border-sid-green/50 bg-sid-green/5" : "border-slate-200"
              )}>
                <RadioGroupItem value="true" id="netzero" />
                <Label htmlFor="netzero" className="flex-1 cursor-pointer">
                  <span className="block font-bold">Atingir Net Zero em 2050</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Alinhamento com protocolos internacionais (SBTi)</span>
                </Label>
              </div>
              <div className={cn(
                "flex items-center space-x-3 space-y-0 border rounded-xl p-5 hover:bg-slate-50 transition-all cursor-pointer",
                netZero === "false" ? "border-sid-green/50 bg-sid-green/5" : "border-slate-200"
              )}>
                <RadioGroupItem value="false" id="percent" />
                <Label htmlFor="percent" className="flex-1 cursor-pointer">
                  <span className="block font-bold">Meta Customizada</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Defina um percentual de redução específico</span>
                </Label>
              </div>
            </RadioGroup>

            {netZero === "false" && (
              <div className="pl-6 border-l-2 border-sid-green/20 space-y-3 animate-in fade-in slide-in-from-left-4">
                <Label htmlFor="meta-percent" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Meta de Redução (%)</Label>
                <div className="relative max-w-[140px]">
                  <Input 
                    id="meta-percent"
                    type="number" 
                    min={0} max={100}
                    value={percent}
                    onChange={(e) => setPercent(Number(e.target.value))}
                    className="h-12 text-lg font-bold text-center border-2 border-slate-100 focus-visible:ring-sid-green shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
              </div>
            )}
          </div>

          {/* Period Section */}
          <div className="space-y-8">
            <div className="space-y-2">
               <Label className="text-sm font-bold text-slate-900">Ciclo Inicial da Simulação</Label>
               <p className="text-xs text-slate-500">Intervalo recomendado: 4 a 6 anos por ciclo estratégico.</p>
            </div>
            
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-bold py-7 text-lg border-2 border-slate-100 hover:bg-slate-50 rounded-xl shadow-sm"
                    />
                  }
                >
                  <CalendarIcon className="mr-3 h-5 w-5 text-sid-green" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {dateRange.from.getFullYear()} — {dateRange.to.getFullYear()}
                      </>
                    ) : (
                      dateRange.from.getFullYear()
                    )
                  ) : (
                    <span className="text-muted-foreground">Selecione o período</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none shadow-2xl" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={{
                      from: dateRange?.from as Date,
                      to: dateRange?.to as Date,
                    }}
                    onSelect={(range) => setDateRange(range as any)}
                    numberOfMonths={2}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <div className="bg-slate-50 p-4 rounded-lg flex gap-3 items-start border border-slate-100">
                 <Info size={16} className="text-sid-green flex-shrink-0 mt-0.5" />
                 <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                   A simulação apresentará 3 combinações de tecnologias ótimas para este período baseando-se no seu orçamento.
                 </p>
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div className="md:col-span-2 pt-10 border-t space-y-8">
             <div className="flex items-center gap-2">
                <DollarSign className="text-sid-black w-5 h-5" />
                <Label className="text-lg font-bold">Recursos Financeiros Anuais</Label>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2.5">
                   <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      Orçamento CAPEX 
                   </Label>
                   <Input
                     value={formatCurrency(capex)}
                     onChange={(e) => handleCurrencyChange(e.target.value, setCapex)}
                     className="h-14 text-xl font-bold bg-slate-50/50 border-2 border-transparent focus-visible:bg-white focus-visible:border-sid-green/30 transition-all"
                   />
                </div>

                <div className="space-y-2.5">
                   <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      Orçamento OPEX
                   </Label>
                   <Input
                     value={formatCurrency(opex)}
                     onChange={(e) => handleCurrencyChange(e.target.value, setOpex)}
                     className="h-14 text-xl font-bold bg-slate-50/50 border-2 border-transparent focus-visible:bg-white focus-visible:border-sid-green/30 transition-all"
                   />
                </div>

                <div className="space-y-2.5">
                   <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Custo Máx. Mitigação ($/tCO2e)
                   </Label>
                   <div className="relative">
                      <Input
                        type="number"
                        value={maxAbatement}
                        onChange={(e) => setMaxAbatement(Number(e.target.value))}
                        className="h-14 text-xl font-bold bg-slate-50/50 border-2 border-transparent focus-visible:bg-white focus-visible:border-sid-green/30 transition-all"
                      />
                      <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                   </div>
                </div>
             </div>
          </div>
        </CardContent>

        <CardFooter className="px-0 py-12 flex justify-center">
          <Button 
            onClick={handleGenerate}
            disabled={!capex || !opex}
            size="lg"
            className="px-10 h-16 text-lg font-bold bg-sid-black hover:bg-slate-800 text-white rounded-xl transition-all shadow-xl hover:-translate-y-1"
          >
            Gerar Primeiro Ciclo Estratégico
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InputScreen;
