import React, { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import InputScreen from "@/components/InputScreen";
import LoadingScreen from "@/components/LoadingScreen";
import RoadmapScreen from "@/components/RoadmapScreen";
import ComparisonModal from "@/components/ComparisonModal";
import { UserInputs, Technology, RoadmapStep } from "@/types/decarbonization";
import { strategyEngine } from "@/lib/engine";

type WorkflowState = "INPUT" | "LOADING" | "BUILDER";

export default function Home() {
  const [state, setState] = useState<WorkflowState>("INPUT");
  const [inputs, setInputs] = useState<UserInputs | null>(null);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [suggestions, setSuggestions] = useState<Technology[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPeriod, setPendingPeriod] = useState<{ startYear: number; endYear: number } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Core AI Fetch Logic
  const fetchAiSuggestions = async (currentInputs: UserInputs, history: RoadmapStep[]) => {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/engine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          inputs: currentInputs, 
          currentRoadmap: history.map(s => ({ technologyId: s.technology.id, startYear: s.startYear, endYear: s.endYear }))
        }),
      });

      if (!response.ok) throw new Error("Falha ao consultar o motor de IA");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro na sugestão de IA:", error);
      return [];
    } finally {
      setIsAiLoading(false);
    }
  };

  // Flow handlers
  const handleStartSim = async (newInputs: UserInputs) => {
    setInputs(newInputs);
    setState("LOADING");
    
    // Call the AI Engine for the first cycle
    const initialSuggestions = await fetchAiSuggestions(newInputs, []);
    
    setSuggestions(initialSuggestions);
    setPendingPeriod({
      startYear: newInputs.initialRoadmapPeriod.startYear,
      endYear: newInputs.initialRoadmapPeriod.endYear
    });
    
    setIsModalOpen(true);
    setState("BUILDER");
  };

  const handleSelectTechnology = (tech: Technology) => {
    if (!inputs || !pendingPeriod) return;

    const newStep: RoadmapStep = {
      id: `step-${tech.id}-${pendingPeriod.startYear}`,
      technology: tech,
      startYear: pendingPeriod.startYear,
      endYear: pendingPeriod.endYear,
    };

    setRoadmapSteps(prev => [...prev, newStep]);
    setIsModalOpen(false);
    setPendingPeriod(null);
  };

  const handleRequestNextCycle = async () => {
    if (!inputs) return;
    
    let nextPeriod;
    if (roadmapSteps.length === 0) {
      nextPeriod = {
        startYear: inputs.initialRoadmapPeriod.startYear,
        endYear: inputs.initialRoadmapPeriod.endYear
      };
    } else {
      const lastStep = roadmapSteps[roadmapSteps.length - 1];
      nextPeriod = strategyEngine.predictNextPeriod(lastStep.endYear, inputs.targetYear);
    }

    if (!nextPeriod) return; // Horizon reached

    setPendingPeriod(nextPeriod);
    setIsModalOpen(true); // Open modal early with loading state
    
    const nextSuggestions = await fetchAiSuggestions(inputs, roadmapSteps);
    setSuggestions(nextSuggestions);
  };

  const handleRemoveStep = (id: string) => {
    setRoadmapSteps(prev => prev.filter(step => step.id !== id));
  };

  return (
    <>
      <Head>
        <title>sid. | Simulador de Descarbonização</title>
        <meta name="description" content="Dashboard estratégico de investimento em descarbonização." />
      </Head>

      <div className="max-w-7xl mx-auto min-h-[70vh]">
        <AnimatePresence mode="wait">
          {state === "INPUT" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <InputScreen onGenerate={handleStartSim} />
            </motion.div>
          )}

          {state === "LOADING" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen />
            </motion.div>
          )}

          {state === "BUILDER" && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RoadmapScreen 
                steps={roadmapSteps} 
                onAddNextCycle={handleRequestNextCycle}
                onRemoveStep={handleRemoveStep}
                targetYear={inputs?.targetYear || 2050}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ComparisonModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          technologies={suggestions}
          onSelect={handleSelectTechnology}
          period={pendingPeriod}
          isLoading={isAiLoading}
        />
      </div>
    </>
  );
}
