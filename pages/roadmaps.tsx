import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, History, Trash2, ArrowRight, ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoadmapScreen from "@/components/RoadmapScreen";
import { motion, AnimatePresence } from "framer-motion";

export default function Roadmaps() {
  const [savedSteps, setSavedSteps] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"LIST" | "DETAIL">("LIST");

  useEffect(() => {
    const data = localStorage.getItem("latest_roadmap");
    if (data) {
      setSavedSteps(JSON.parse(data));
    }
  }, []);

  const clear = () => {
    localStorage.removeItem("latest_roadmap");
    setSavedSteps([]);
    setViewMode("LIST");
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
      <Head>
        <title>sid. | Meus Roadmaps</title>
      </Head>

      <AnimatePresence mode="wait">
        {viewMode === "LIST" ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="flex items-center justify-between border-b pb-10">
              <div className="space-y-2">
                <h1 className="text-5xl font-serif font-black tracking-tight">Meus Roadmaps</h1>
                <p className="text-slate-400 text-lg font-medium">Histórico de simulações tecnológicas salvas.</p>
              </div>
              {savedSteps.length > 0 && (
                <Button variant="ghost" onClick={clear} className="text-slate-400 hover:text-red-500 font-bold h-12 rounded-xl">
                  <Trash2 size={18} className="mr-2" /> Limpar Histórico
                </Button>
              )}
            </div>

            {savedSteps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100 transition-all hover:bg-slate-50">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white flex items-center justify-center border border-slate-100 mb-8 shadow-xl">
                  <History className="text-slate-200" size={40} />
                </div>
                <p className="text-2xl font-serif font-black text-slate-400">Nenhuma simulação encontrada.</p>
                <p className="text-xs text-slate-300 mt-3 uppercase tracking-[0.3em] font-black">Inicie sua jornada no simulador</p>
                <Button
                  variant="outline"
                  className="mt-10 rounded-2xl border-slate-200 font-black tracking-widest text-[10px] uppercase h-14 px-8"
                  render={<a href="/" />}
                  nativeButton={false}
                >
                  Voltar ao Simulador
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                <Card className="rounded-[3rem] border-4 border-slate-50 overflow-hidden shadow-2xl transition-all group hover:border-sid-green/20 bg-white">
                  <CardHeader className="bg-slate-50/80 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-sid-green text-sid-black font-black text-[10px] px-3 py-1 rounded-lg">ATIVA</Badge>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sessão de Planejamento Local</span>
                      </div>
                      <CardTitle className="text-3xl font-serif font-black tracking-tight">Estratégia de Descarbonização #1</CardTitle>
                    </div>
                    <div className="flex items-center gap-10 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                       <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Passos</p>
                          <p className="text-xl font-black text-sid-black">{savedSteps.length}</p>
                       </div>
                       <div className="h-10 w-px bg-slate-200" />
                       <div className="text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Finalização</p>
                          <p className="text-xl font-black text-sid-black">{savedSteps[savedSteps.length - 1].endYear}</p>
                       </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-10">
                    <div className="flex items-center gap-6 overflow-x-auto pb-6 scrollbar-hide">
                      {savedSteps.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex-shrink-0 bg-slate-50 border border-slate-100 p-6 rounded-[1.5rem] shadow-sm min-w-[220px] transition-transform group-hover:scale-[1.02] hover:bg-white hover:border-sid-green/20">
                            <div className="flex items-center gap-2 mb-3">
                               <div className="w-6 h-6 rounded-lg bg-sid-green/10 flex items-center justify-center">
                                  <Layers size={12} className="text-sid-green" />
                               </div>
                               <p className="text-[10px] font-black text-sid-green uppercase tracking-widest">{step.startYear}-{step.endYear}</p>
                            </div>
                            <p className="text-sm font-black text-slate-800 line-clamp-1 font-serif">{step.technology.name}</p>
                          </div>
                          {idx < savedSteps.length - 1 && <ArrowRight size={18} className="text-slate-200 flex-shrink-0" />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
                      <Button 
                        onClick={() => setViewMode("DETAIL")}
                        size="lg"
                        className="rounded-2xl border-sid-black bg-sid-black font-black uppercase tracking-widest text-[10px] h-16 px-12 text-white hover:bg-slate-800 shadow-xl transition-all active:scale-95"
                      >
                         Visualizar Detalhes do Roadmap
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-6 mb-10">
               <Button 
                variant="ghost" 
                onClick={() => setViewMode("LIST")}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-sid-green hover:text-white transition-all p-0 flex items-center justify-center group"
               >
                  <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
               </Button>
               <div>
                  <h2 className="text-3xl font-serif font-black tracking-tight">Análise Detalhada</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Visualização de Sessão Histórica</p>
               </div>
            </div>

            <RoadmapScreen 
              steps={savedSteps} 
              onAddNextCycle={() => {}}
              onRemoveStep={() => {}}
              targetYear={2050}
              readOnly={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
