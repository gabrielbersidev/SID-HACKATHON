import React, { useState } from "react";
import Head from "next/head";
import InputScreen from "@/components/InputScreen";
import LoadingScreen from "@/components/LoadingScreen";
import RoadmapScreen from "@/components/RoadmapScreen";
import { RoadmapParams, RoadmapEntry } from "@/types/roadmap";
import { generateFirstStep } from "@/data/mockRoadmapData";

type WorkflowState = "INPUT" | "LOADING" | "ROADMAP";

export default function Home() {
  const [state, setState] = useState<WorkflowState>("INPUT");
  const [roadmapEntries, setRoadmapEntries] = useState<RoadmapEntry[]>([]);

  const handleGenerate = (params: RoadmapParams) => {
    setState("LOADING");
    
    // Simulate engine processing delay
    setTimeout(() => {
      const firstStep = generateFirstStep(params);
      setRoadmapEntries([firstStep]);
      setState("ROADMAP");
    }, 3500); // 3.5 seconds delay as requested
  };

  return (
    <>
      <Head>
        <title>SID - Sistema de Investimento em Descarbonização</title>
        <meta name="description" content="Gere roadmaps estratégicos de descarbonização baseados em inteligência e dados." />
      </Head>

      <div className="flex flex-col min-h-[60vh]">
        {state === "INPUT" && <InputScreen onGenerate={handleGenerate} />}
        
        {state === "LOADING" && <LoadingScreen />}

        {state === "ROADMAP" && <RoadmapScreen initialEntries={roadmapEntries} />}
      </div>
    </>
  );
}
