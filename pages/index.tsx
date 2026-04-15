import React, { useState } from "react";
import Head from "next/head";
import InputScreen from "@/components/InputScreen";
import LoadingScreen from "@/components/LoadingScreen";
import RoadmapScreen from "@/components/RoadmapScreen";
import { UserInputs, RoadmapStep } from "@/types/roadmap";
import { generateInitialRoadmapStep } from "@/data/mockRoadmapData";

type WorkflowState = "INPUT" | "LOADING" | "ROADMAP";

export default function Home() {
  const [state, setState] = useState<WorkflowState>("INPUT");
  const [roadmapEntries, setRoadmapEntries] = useState<RoadmapStep[]>([]);

  const handleGenerate = (inputs: UserInputs) => {
    setState("LOADING");
    
    // Simulate engine processing delay
    setTimeout(() => {
      const firstStep = generateInitialRoadmapStep(inputs);
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

        {state === "ROADMAP" && <RoadmapScreen initialEntries={roadmapEntries} initialInputs={roadmapEntries[0] ? {
            netZeroTarget: true,
            capexBudget: roadmapEntries[0].technology.economicViability.capex * 2,
            opexBudget: roadmapEntries[0].technology.economicViability.opex * 2,
            maxAbatementCost: 500,
            minTrl: 1,
            maxTrl: 9,
            roadmapStartYear: roadmapEntries[0].startYear,
            roadmapEndYear: roadmapEntries[0].endYear
        } : undefined} />}
      </div>
    </>
  );
}
