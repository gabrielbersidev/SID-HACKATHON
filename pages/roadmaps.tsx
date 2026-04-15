import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, History, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Roadmaps() {
  const [savedRoadmap, setSavedRoadmap] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("latest_roadmap");
    if (data) {
      setSavedRoadmap(JSON.parse(data));
    }
  }, []);

  const clear = () => {
    localStorage.removeItem("latest_roadmap");
    setSavedRoadmap([]);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-12">
      <Head>
        <title>sid. | Meus Roadmaps</title>
      </Head>

      <div className="flex items-center justify-between border-b pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-black">Meus Roadmaps</h1>
          <p className="text-slate-400 font-medium">Histórico de simulações salvas no seu workspace local.</p>
        </div>
        {savedRoadmap.length > 0 && (
          <Button variant="ghost" onClick={clear} className="text-slate-400 hover:text-red-500">
            <Trash2 size={16} className="mr-2" /> Limpar Histórico
          </Button>
        )}
      </div>

      {savedRoadmap.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center border border-slate-100 mb-6 shadow-sm">
            <History className="text-slate-200" size={32} />
          </div>
          <p className="text-lg font-bold text-slate-400">Nenhuma simulação encontrada.</p>
          <p className="text-xs text-slate-300 mt-2 uppercase tracking-widest font-black">Inicie um novo ciclo no simulador</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
           <Card className="rounded-3xl border-2 border-sid-green/20 overflow-hidden shadow-xl shadow-sid-green/5 hover:border-sid-green transition-all group">
              <CardHeader className="bg-slate-50/50 p-8 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-sid-green text-sid-black font-black text-[9px] px-2">ATIVO</Badge>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Simulação Atual</span>
                  </div>
                  <CardTitle className="text-2xl font-serif font-black">Estratégia de Descarbonização #1</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Horizonte</p>
                  <p className="text-lg font-black text-sid-black">2026 — {savedRoadmap[savedRoadmap.length-1].endYear}</p>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {savedRoadmap.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex-shrink-0 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm min-w-[180px]">
                        <p className="text-[9px] font-black text-sid-green uppercase tracking-widest mb-1">{step.startYear}-{step.endYear}</p>
                        <p className="text-sm font-black text-slate-800 line-clamp-1">{step.technology.name}</p>
                      </div>
                      {idx < savedRoadmap.length - 1 && <ArrowRight size={14} className="text-slate-200 flex-shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
                  <Button variant="outline" className="rounded-xl border-slate-200 font-bold px-8">Visualizar Detalhes</Button>
                </div>
              </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
}
