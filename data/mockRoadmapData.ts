import { Technology, UserInputs, RoadmapStep } from "../types/roadmap";

export const mockTechnologies: Technology[] = [
  {
    id: "tech-1",
    name: "Captura Direta de Ar (DAC)",
    description: "Tecnologia que remove CO2 diretamente da atmosfera utilizando ciclos termoquímicos.",
    mitigationPotential: 500000, // tCO2e/ano
    economicViability: {
      capex: 100000000, // $100M
      opex: 5000000, // $5M/ano
      abatementCost: 200, // $200/tCO2e
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
    mitigationPotential: 150000, // tCO2e/ano
    economicViability: {
      capex: 20000000, // $20M
      opex: 1000000, // $1M/ano (economia de combustível)
      abatementCost: 50, // $50/tCO2e
      roi: 0.20,
      paybackPeriod: 5,
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
    mitigationPotential: 300000, // tCO2e/ano
    economicViability: {
      capex: 70000000, // $70M
      opex: 3000000, // $3M/ano
      abatementCost: 120, // $120/tCO2e
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
    mitigationPotential: 120000, // tCO2e/ano
    economicViability: {
      capex: 15000000, // $15M
      opex: 500000, // $500k/ano (manutenção)
      abatementCost: 35, // $35/tCO2e
      roi: 0.25,
      paybackPeriod: 4,
    },
    implementation: {
      trl: 9,
      challenges: ["Espaço Disponível", "Variabilidade de Irradiação Solar", "Armazenamento de Energia"],
    },
    marketCompetition: "Mercado altamente competitivo e consolidado. Players globais: First Solar, JinkoSolar, Sunrun.",
  },
  {
    id: "tech-5",
    name: "Captura e Armazenamento de Carbono (CCS)",
    description: "Tecnologia de captura de CO2 em fontes pontuais (indústria, energia) com armazenamento geológico permanente.",
    mitigationPotential: 450000, // tCO2e/ano
    economicViability: {
      capex: 250000000, // $250M
      opex: 8000000, // $8M/ano
      abatementCost: 180, // $180/tCO2e
      roi: 0.06,
      paybackPeriod: 16,
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
    mitigationPotential: 350000, // tCO2e/ano
    economicViability: {
      capex: 180000000, // $180M
      opex: 6000000, // $6M/ano
      abatementCost: 150, // $150/tCO2e
      roi: 0.10,
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
    mitigationPotential: 200000, // tCO2e/ano
    economicViability: {
      capex: 35000000, // $35M
      opex: 1500000, // $1.5M/ano
      abatementCost: 60, // $60/tCO2e
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

export const generateInitialRoadmapStep = (inputs: UserInputs): RoadmapStep => {
  // Lógica para selecionar a primeira tecnologia com base nos inputs
  // Por simplicidade, aqui retorna uma tecnologia baseada no orçamento
  const tech = mockTechnologies.find(t => t.economicViability.capex <= inputs.capexBudget) || mockTechnologies[3];
  return {
    id: "step-1",
    technology: tech,
    startYear: inputs.roadmapStartYear,
    endYear: inputs.roadmapEndYear,
  };
};

export const suggestNextTechnologies = (currentYear: number, inputs: UserInputs): Technology[] => {
  // Lógica para sugerir 3 tecnologias com base no ano atual e nos inputs do usuário
  const filtered = mockTechnologies.filter(t => 
    t.economicViability.capex <= inputs.capexBudget &&
    t.economicViability.abatementCost <= inputs.maxAbatementCost &&
    t.implementation.trl >= inputs.minTrl &&
    t.implementation.trl <= inputs.maxTrl
  );
  
  return filtered.length > 0 ? filtered.slice(0, 3) : mockTechnologies.slice(0, 3);
};
