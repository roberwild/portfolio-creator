// Perfil de riesgo
export type RiskProfile = 'conservative' | 'moderate' | 'balanced' | 'growth' | 'aggressive';

// Sector industrial
export type IndustrySector = 
  | 'technology' 
  | 'healthcare' 
  | 'financials' 
  | 'consumerDiscretionary' 
  | 'consumerStaples' 
  | 'industrials' 
  | 'energy' 
  | 'materials' 
  | 'utilities' 
  | 'realEstate' 
  | 'communication';

// Región geográfica
export type GeographicRegion = 'us' | 'europe' | 'spain' | 'latam' | 'asia' | 'other';

// Preguntas de evaluación de riesgo
export interface RiskAssessmentQuestion {
  id: string;
  question: string; // Clave de i18n
  options: Array<{
    value: number;
    label: string; // Clave de i18n
  }>;
  help?: string; // Clave de i18n para texto de ayuda
}

// Empresa disponible para inversión
export interface Company {
  id: string;
  name: string;
  ticker: string;
  sector: IndustrySector;
  region: GeographicRegion;
  marketCap: number;
  price: number;
  dividendYield: number;
  volatility: number; // Indicador de riesgo
  historicalReturns: {
    '1m': number;
    '3m': number;
    '1y': number;
    '5y': number;
  };
  logoUrl?: string;
}

// Posición en el portfolio
export interface Position {
  companyId: string;
  percentage: number;
  shares: number;
}

// Portfolio completo
export interface Portfolio {
  id: string;
  userId?: string; // Para cuando implementemos autenticación
  name: string;
  riskProfile: RiskProfile;
  totalInvestment: number;
  positions: Position[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'completed';
} 