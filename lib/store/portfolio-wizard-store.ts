import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';

// Definición de tipos
import { 
  RiskProfile, 
  Position, 
  IndustrySector,
} from '@/types/portfolio.types';

// Importar preguntas para evaluación de riesgo
import { riskAssessmentQuestions } from '@/lib/constants/risk-assessment';

export interface PortfolioWizardState {
  // Datos básicos
  portfolioId: string;
  portfolioName: string;
  totalInvestment: number;
  
  // Control de navegación
  currentStep: number;
  maxStepVisited: number;
  
  // Datos por pasos
  riskAssessment: {
    answers: Record<string, number>;
    calculatedProfile: RiskProfile | null;
  };
  selectedCompanies: string[]; // IDs de empresas
  excludedSectors: IndustrySector[];
  positions: Position[];
  
  // Estado
  isDirty: boolean;
  status: 'draft' | 'completed';
  
  // Acciones
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updatePortfolioName: (name: string) => void;
  updateTotalInvestment: (amount: number) => void;
  setRiskAnswer: (questionId: string, answer: number) => void;
  calculateRiskProfile: () => void;
  toggleCompanySelection: (companyId: string) => void;
  toggleSectorExclusion: (sector: IndustrySector) => void;
  updatePosition: (companyId: string, data: Partial<Omit<Position, 'companyId'>>) => void;
  resetWizard: () => void;
  markAsCompleted: () => void;
}

// Estado inicial para usar en el store y en el reset
const createInitialState = () => ({
  portfolioId: uuidv4(),
  portfolioName: '',
  totalInvestment: 10000, // Inversión predeterminada de $10,000
  
  currentStep: -1, // Comenzamos en el paso de información (-1)
  maxStepVisited: -1,
  
  riskAssessment: {
    answers: {} as Record<string, number>,
    calculatedProfile: null as RiskProfile | null,
  },
  selectedCompanies: [] as string[],
  excludedSectors: [] as IndustrySector[],
  positions: [] as Position[],
  
  isDirty: false,
  status: 'draft' as const,
});

/**
 * Store para gestionar el estado del wizard de creación de portfolios
 * Implementado con Zustand + Immer para manejo inmutable del estado
 * Incluye persistencia para recuperar el estado entre sesiones
 */
export const usePortfolioWizardStore = create<PortfolioWizardState>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      
      // Navegación entre pasos
      nextStep: () => set(
        produce((state) => {
          const nextStep = state.currentStep + 1;
          state.currentStep = nextStep;
          state.maxStepVisited = Math.max(state.maxStepVisited, nextStep);
          state.isDirty = true;
        })
      ),
      
      prevStep: () => set(
        produce((state) => {
          state.currentStep = Math.max(-1, state.currentStep - 1);
          state.isDirty = true;
        })
      ),
      
      goToStep: (step) => set(
        produce((state) => {
          // Solo permitir ir a pasos ya visitados o al siguiente paso
          if (step <= state.maxStepVisited || step === state.maxStepVisited + 1) {
            state.currentStep = step;
            state.isDirty = true;
          }
        })
      ),
      
      // Actualización de datos básicos
      updatePortfolioName: (name) => set(
        produce((state) => {
          state.portfolioName = name;
          state.isDirty = true;
        })
      ),
      
      updateTotalInvestment: (amount) => set(
        produce((state) => {
          state.totalInvestment = amount;
          state.isDirty = true;
        })
      ),
      
      // Evaluación de riesgo
      setRiskAnswer: (questionId, answer) => set(
        produce((state) => {
          state.riskAssessment.answers[questionId] = answer;
          state.isDirty = true;
        })
      ),
      
      calculateRiskProfile: () => set(
        produce((state) => {
          const answers = state.riskAssessment.answers;
          const questionCount = Object.keys(answers).length;
          
          if (questionCount < riskAssessmentQuestions.length) {
            // No todas las preguntas han sido respondidas
            return;
          }
          
          // Sumar puntuación total (cada respuesta ya tiene un valor numérico)
          let totalScore = 0;
          const answerValues = Object.values(answers) as number[];
          answerValues.forEach(value => {
            totalScore += value;
          });
          
          const maxPossibleScore = riskAssessmentQuestions.length * 4; // Asumiendo que cada pregunta tiene un máximo de 4 puntos
          const percentageScore = (totalScore / maxPossibleScore) * 100;
          
          // Asignar perfil basado en el porcentaje
          if (percentageScore < 20) {
            state.riskAssessment.calculatedProfile = 'conservative';
          } else if (percentageScore < 40) {
            state.riskAssessment.calculatedProfile = 'moderate';
          } else if (percentageScore < 60) {
            state.riskAssessment.calculatedProfile = 'balanced';
          } else if (percentageScore < 80) {
            state.riskAssessment.calculatedProfile = 'growth';
          } else {
            state.riskAssessment.calculatedProfile = 'aggressive';
          }
          
          state.isDirty = true;
        })
      ),
      
      // Selección de empresas
      toggleCompanySelection: (companyId) => set(
        produce((state) => {
          const index = state.selectedCompanies.indexOf(companyId);
          
          if (index >= 0) {
            // Remover si ya está seleccionada
            state.selectedCompanies.splice(index, 1);
            
            // También eliminar cualquier posición asociada
            const posIndex = state.positions.findIndex((p: Position) => p.companyId === companyId);
            if (posIndex >= 0) {
              state.positions.splice(posIndex, 1);
            }
          } else {
            // Agregar si no está en la lista y no excede el límite
            if (state.selectedCompanies.length < 20) {
              state.selectedCompanies.push(companyId);
            }
          }
          
          state.isDirty = true;
        })
      ),
      
      toggleSectorExclusion: (sector) => set(
        produce((state) => {
          const index = state.excludedSectors.indexOf(sector);
          
          if (index >= 0) {
            state.excludedSectors.splice(index, 1);
          } else {
            state.excludedSectors.push(sector);
          }
          
          state.isDirty = true;
        })
      ),
      
      // Gestión de posiciones
      updatePosition: (companyId, data) => set(
        produce((state) => {
          const existingIndex = state.positions.findIndex((p: Position) => p.companyId === companyId);
          
          if (existingIndex >= 0) {
            // Actualizar posición existente
            Object.assign(state.positions[existingIndex], data);
          } else {
            // Crear nueva posición
            state.positions.push({
              companyId,
              percentage: data.percentage || 0,
              shares: data.shares || 0
            });
          }
          
          state.isDirty = true;
        })
      ),
      
      // Acciones de estado
      resetWizard: () => set(() => ({ 
        ...createInitialState()
      })),
      
      markAsCompleted: () => set(
        produce((state) => {
          state.status = 'completed';
          state.isDirty = false;
        })
      ),
    }),
    {
      name: 'portfolio-wizard-storage',
      storage: createJSONStorage(() => localStorage),
      // Solo persistir entre sesiones si el usuario está en modo draft
      partialize: (state) => 
        state.status === 'draft' ? state : createInitialState(),
    }
  )
); 