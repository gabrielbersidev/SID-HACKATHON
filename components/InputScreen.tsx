import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserInputs } from "@/types/roadmap";
import { CalendarIcon, Info, TrendingUp, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface InputScreenProps {
  onGenerate: (inputs: UserInputs) => void;
}

const InputScreen = ({ onGenerate }: InputScreenProps) => {
  const [netZero, setNetZero] = useState<string>("true");
  const [percent, setPercent] = useState<number>(50);
  const [capex, setCapex] = useState<string>("");
  const [opex, setOpex] = useState<string>("");
  const [maxAbatement, setMaxAbatement] = useState<number>(200);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2030, 0, 1),
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
      capexBudget: Number(capex) || 50000000,
      opexBudget: Number(opex) || 5000000,
      maxAbatementCost: maxAbatement,
      minTrl: 1,
      maxTrl: 9,
      roadmapStartYear: dateRange.from.getFullYear(),
      roadmapEndYear: dateRange.to.getFullYear(),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 max-w-4xl mx-auto w-full">
      <Card className="w-full shadow-2xl border-muted/50 overflow-hidden bg-white">
        <CardHeader className="space-y-2 bg-slate-50 border-b pb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-sid-green rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Configuração Inicial</span>
          </div>
          <CardTitle className="text-3xl font-serif">Simulador de Descarbonização</CardTitle>
          <CardDescription className="text-base">
            Defina seus objetivos e restrições financeiras para gerar um roadmap executivo de transição energética.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-10 px-10 pb-12">
          
          {/* Target Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <TrendingUp className="text-sid-green w-5 h-5" />
               <Label className="text-lg font-bold">Meta de Emissões</Label>
            </div>
            
            <RadioGroup value={netZero} onValueChange={setNetZero} className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <RadioGroupItem value="true" id="netzero" />
                <Label htmlFor="netzero" className="flex-1 cursor-pointer font-medium">
                  Atingir Net Zero em 2050
                  <span className="block text-xs text-muted-foreground mt-1">Alinhamento total com o Acordo de Paris</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <RadioGroupItem value="false" id="percent" />
                <Label htmlFor="percent" className="flex-1 cursor-pointer font-medium">
                  Definir Meta Percentual
                </Label>
              </div>
            </RadioGroup>

            {netZero === "false" && (
              <div className="pl-8 space-y-3">
                <Label htmlFor="meta-percent" className="text-sm font-semibold">Qual a meta de redução?</Label>
                <div className="relative max-w-[150px]">
                  <Input 
                    id="meta-percent"
                    type="number" 
                    min={0} max={100}
                    value={percent}
                    onChange={(e) => setPercent(Number(e.target.value))}
                    className="text-right pr-8 font-bold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">%</span>
                </div>
              </div>
            )}
          </div>

          {/* Period Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <CalendarIcon className="text-sid-yellow w-5 h-5" />
               <Label className="text-lg font-bold">Ciclo do Roadmap</Label>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">Selecione o intervalo de anos do primeiro ciclo</Label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal py-6 text-base border-2",
                        !dateRange && "text-muted-foreground"
                      )}
                    />
                  }
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {dateRange.from.getFullYear()} — {dateRange.to.getFullYear()}
                      </>
                    ) : (
                      dateRange.from.getFullYear()
                    )
                  ) : (
                    <span>Escolha o período</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
              <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                <Info size={12} /> Sugerido: Ciclos de 4 a 5 anos para revisão estratégica.
              </p>
            </div>
          </div>

          {/* Budget Section */}
          <div className="space-y-6 md:col-span-2 pt-6 border-t">
            <div className="flex items-center gap-2">
               <DollarSign className="text-sid-black w-5 h-5" />
               <Label className="text-lg font-bold">Orçamento Estratégico (Anual)</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label htmlFor="capex" className="text-sm font-bold flex items-center gap-2">
                  CAPEX 
                  <Popover>
                    <PopoverTrigger
                      render={<Info size={14} className="text-muted-foreground cursor-help" />}
                    />
                    <PopoverContent className="text-xs p-3">
                      Investimentos em bens de capital (ex: compra de equipamentos, painéis solares).
                    </PopoverContent>
                  </Popover>
                </Label>
                <Input
                  id="capex"
                  placeholder="R$ 0"
                  value={formatCurrency(capex)}
                  onChange={(e) => handleCurrencyChange(e.target.value, setCapex)}
                  className="py-6 text-lg font-mono"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="opex" className="text-sm font-bold flex items-center gap-2">
                  OPEX
                  <Popover>
                    <PopoverTrigger
                      render={<Info size={14} className="text-muted-foreground cursor-help" />}
                    />
                    <PopoverContent className="text-xs p-3">
                      Despesas operacionais e manutenção anual das tecnologias.
                    </PopoverContent>
                  </Popover>
                </Label>
                <Input
                  id="opex"
                  placeholder="R$ 0"
                  value={formatCurrency(opex)}
                  onChange={(e) => handleCurrencyChange(e.target.value, setOpex)}
                  className="py-6 text-lg font-mono"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="abatement" className="text-sm font-bold">Custo Máx. Mitigação ($/tCO2e)</Label>
                <Input
                  id="abatement"
                  type="number"
                  value={maxAbatement}
                  onChange={(e) => setMaxAbatement(Number(e.target.value))}
                  className="py-6 text-lg"
                />
              </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="px-10 py-8 bg-slate-50 border-t flex justify-end">
          <Button 
            onClick={handleGenerate}
            disabled={!capex || !opex}
            className="px-12 py-7 text-lg font-bold bg-sid-black hover:bg-slate-800 text-white rounded-full transition-all shadow-xl hover:shadow-sid-green/20"
          >
            Gerar Roadmap Estratégico
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InputScreen;
