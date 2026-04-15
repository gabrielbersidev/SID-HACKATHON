import { Technology, UserInputs, RoadmapStep } from "../types/decarbonization";

export const mockTechnologies: Technology[] = [
  {
    id: "tech-1",
    name: "Captura Direta de Ar (DAC)",
    description: "Tecnologia que remove CO2 diretamente da atmosfera utilizando ciclos termoquímicos.",
    mitigationPotential: 500000,
    economicViability: {
      capex: 100000000,
      opex: 5000000,
      abatementCost: 200,
      roi: 0.08,
      paybackPeriod: 12,
    },
    implementation: {
      trl: 7,
      challenges: ["Alto Consumo de Energia", "Escalabilidade", "Custo Inicial"],
    },
    marketCompetition: "Emergente, com poucas soluções em larga escala. Principais players: Carbon Engineering, Climeworks.",
  },
  {
    id: "tech-2",
    name: "Eletrificação de Frotas",
    description: "Substituição progressiva de veículos a combustão por veículos 100% elétricos.",
    mitigationPotential: 150000,
    economicViability: {
      capex: 15000000,
      opex: 1000000,
      abatementCost: 50,
      roi: 0.22,
      paybackPeriod: 4,
    },
    implementation: {
      trl: 9,
      challenges: ["Infraestrutura de Recarga", "Custo de Aquisição", "Autonomia Limitada"],
    },
    marketCompetition: "Mercado maduro com intensa competição. Players: Tesla, BYD, Volkswagen, Hyundai.",
  },
  {
    id: "tech-3",
    name: "Biocombustíveis Avançados",
    description: "Produção de combustíveis de segunda geração a partir de biomassa sustentável e resíduos.",
    mitigationPotential: 300000,
    economicViability: {
      capex: 70000000,
      opex: 3000000,
      abatementCost: 120,
      roi: 0.12,
      paybackPeriod: 8,
    },
    implementation: {
      trl: 8,
      challenges: ["Disponibilidade de Matéria-Prima", "Otimização de Processos", "Certificação de Sustentabilidade"],
    },
    marketCompetition: "Crescente. Foco em sustentabilidade e rastreabilidade. Players: Neste, Clariant, Gevo.",
  },
  {
    id: "tech-4",
    name: "Painéis Solares Fotovoltaicos",
    description: "Instalação de painéis solares de alta eficiência (>22%) para geração de energia renovável local.",
    mitigationPotential: 120000,
    economicViability: {
      capex: 10000000,
      opex: 500000,
      abatementCost: 35,
      roi: 0.28,
      paybackPeriod: 3,
    },
    implementation: {
      trl: 9,
      challenges: ["Espaço Disponível", "Variabilidade de Irradiação Solar", "Armazenamento de Energia"],
    },
    marketCompetition: "Mercado altamente competitivo e consolidado. Players globais: JinkoSolar, Longi, Sunrun.",
  },
  {
    id: "tech-5",
    name: "Captura e Armazenamento de Carbono (CCS)",
    description: "Tecnologia de captura de CO2 em fontes pontuais (indústria, energia) com armazenamento geológico permanente.",
    mitigationPotential: 450000,
    economicViability: {
      capex: 250000000,
      opex: 8000000,
      abatementCost: 180,
      roi: 0.05,
      paybackPeriod: 15,
    },
    implementation: {
      trl: 8,
      challenges: ["Regulamentação de Armazenamento", "Viabilidade Econômica", "Monitoramento a Longo Prazo"],
    },
    marketCompetition: "Em desenvolvimento. Incentivos governamentais crescentes. Players: ExxonMobil, Shell, Equinor.",
  },
  {
    id: "tech-6",
    name: "Hidrogênio Verde",
    description: "Produção de hidrogênio via eletrólise de água com eletricidade de fontes renováveis.",
    mitigationPotential: 350000,
    economicViability: {
      capex: 180000000,
      opex: 6000000,
      abatementCost: 150,
      roi: 0.11,
      paybackPeriod: 10,
    },
    implementation: {
      trl: 7,
      challenges: ["Custo da Eletrólise", "Infraestrutura de Distribuição", "Armazenamento Seguro"],
    },
    marketCompetition: "Setor emergente com forte apoio governamental. Players: Siemens, NEL, ITM Power.",
  },
  {
    id: "tech-7",
    name: "Bombas de Calor Industriais",
    description: "Substituição de caldeiras a gás por bombas de calor para aquecimento de processos industriais.",
    mitigationPotential: 200000,
    economicViability: {
      capex: 35000000,
      opex: 1500000,
      abatementCost: 65,
      roi: 0.18,
      paybackPeriod: 6,
    },
    implementation: {
      trl: 8,
      challenges: ["Temperatura Requerida", "Integração com Infraestrutura Existente", "Eficiência Sazonal"],
    },
    marketCompetition: "Mercado crescente. Players: Bosch, Carrier, Daikin, Mitsubishi.",
  },
];

export const generateInitialCycleSuggestions = (inputs: UserInputs): Technology[] => {
  // Simular seleção de 3 tecnologias baseadas nos inputs
  return mockTechnologies.slice(0, 3);
};

export const generateNextCycleSuggestions = (currentEndYear: number, inputs: UserInputs): Technology[] => {
  // Simular tecnologias para o próximo período (ex: TRL maior, custos menores)
  return mockTechnologies.slice(3, 6);
};

export const getInitialRoadmap = (selectedTech: Technology, inputs: UserInputs): RoadmapStep[] => {
  return [{
    id: `step-${selectedTech.id}-${inputs.initialRoadmapPeriod.startYear}`,
    technology: selectedTech,
    startYear: inputs.initialRoadmapPeriod.startYear,
    endYear: inputs.initialRoadmapPeriod.endYear,
  }];
};

export const addRoadmapStep = (currentRoadmap: RoadmapStep[], selectedTech: Technology, nextStartYear: number, nextEndYear: number): RoadmapStep[] => {
  return [
    ...currentRoadmap,
    {
      id: `step-${selectedTech.id}-${nextStartYear}`,
      technology: selectedTech,
      startYear: nextStartYear,
      endYear: nextEndYear,
    },
  ];
};
