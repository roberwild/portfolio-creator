"use client";

import React from 'react';
import { Check, ChevronRight, MousePointerClick, Info } from 'lucide-react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  maxStepVisited: number;
}

const steps = [
  { id: -1, name: "Información" },
  { id: 0, name: "Información Básica" },
  { id: 1, name: "Evaluación de Riesgo" },
  { id: 2, name: "Selección de Empresas" },
  { id: 3, name: "Asignación de Portfolio" },
  { id: 4, name: "Resumen" }
];

const WizardProgress: React.FC<WizardProgressProps> = ({ 
  currentStep, 
  maxStepVisited 
}) => {
  const { goToStep } = usePortfolioWizardStore();

  // Función para manejar el clic en un paso
  const handleStepClick = (stepId: number) => {
    // Solo permitir navegar a pasos ya visitados o al siguiente paso
    if (stepId <= maxStepVisited) {
      goToStep(stepId);
    }
  };

  // Solo mostrar la barra de progreso si estamos más allá del paso de información
  if (currentStep === -1) {
    return null;
  }

  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol className="space-y-4 md:flex md:space-x-2 md:space-y-0">
          {steps.filter(step => step.id >= 0).map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = maxStepVisited > step.id;
            const isVisited = maxStepVisited >= step.id;
            
            // Determinar el estado visual del paso
            let stepStatus = "upcoming";
            if (isActive) stepStatus = "current";
            if (isCompleted) stepStatus = "complete";
            
            return (
              <li key={step.id} className="md:flex-1">
                <div 
                  className={`group flex flex-col border-l-4 md:border-l-0 md:border-t-4 py-2 pl-4 md:pl-0 md:pt-4 md:pb-0 
                    ${isVisited ? 'cursor-pointer' : 'cursor-not-allowed'} 
                    ${isVisited ? 'hover:bg-primary/5 transition-colors duration-200' : ''}
                    ${isActive ? 'border-t-primary' : isCompleted ? 'border-t-primary/70' : 'border-t-gray-200 dark:border-t-gray-700'}
                    relative rounded-sm`}
                  onClick={() => handleStepClick(step.id)}
                  role="button"
                  tabIndex={isVisited ? 0 : -1}
                  aria-disabled={!isVisited}
                  aria-current={isActive ? 'step' : undefined}
                  title={isVisited ? `Ir al paso: ${step.name}` : 'Este paso aún no está disponible'}
                >
                  {isVisited && !isActive && (
                    <div className="absolute top-0 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center text-xs text-primary">
                      <MousePointerClick className="h-3 w-3 mr-1" />
                      <span className="hidden md:inline">Clic para ir</span>
                    </div>
                  )}
                  
                  <span 
                    className={`flex items-center text-sm font-medium ${
                      isActive 
                        ? 'text-primary' 
                        : isCompleted 
                          ? 'text-primary' 
                          : isVisited 
                            ? 'text-primary/70'
                            : 'text-muted-foreground'
                    } ${isVisited ? 'group-hover:text-primary group-hover:font-semibold transition-all duration-200' : ''}`}
                  >
                    <span 
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isActive 
                          ? 'bg-primary text-white border-2 border-primary/20' 
                          : isCompleted 
                            ? 'bg-primary text-white' 
                            : isVisited 
                              ? 'border-2 border-primary/40 text-primary group-hover:border-primary'
                              : 'border-2 border-muted-foreground/30 text-muted-foreground'
                      } mr-2 transition-colors duration-300 ${isVisited && !isActive && !isCompleted ? 'group-hover:bg-primary/10' : ''}`}
                      aria-hidden="true"
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </span>
                    <span className="text-high-contrast">{step.name}</span>
                  </span>
                  
                  {index < steps.filter(s => s.id >= 0).length - 1 && (
                    <ChevronRight 
                      className={`hidden md:block h-5 w-5 absolute right-0 top-4 ${
                        isCompleted ? 'text-primary' : 'text-muted-foreground/40'
                      }`}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default WizardProgress; 