"use client";

import React, { useEffect, useState } from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react';

// Pasos del asistente
import InfoModal from './steps/InfoModal';
import PortfolioBasics from './steps/PortfolioBasics';
import RiskAssessment from './steps/RiskAssessment';
import CompanySelection from './steps/CompanySelection';
import PortfolioAllocation from './steps/PortfolioAllocation';
import PortfolioSummary from './steps/PortfolioSummary';

// Indicador de progreso
import WizardProgress from './WizardProgress';

// Diálogo de confirmación
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PortfolioWizard: React.FC = () => {
  // Estado para el diálogo de confirmación de reset
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  
  // Acceder al estado y acciones del store
  const { 
    currentStep, 
    maxStepVisited,
    nextStep, 
    prevStep,
    portfolioName,
    selectedCompanies,
    riskAssessment,
    status,
    markAsCompleted,
    resetWizard
  } = usePortfolioWizardStore();

  // Comprobar si el paso actual está completo y se puede avanzar
  const canProceed = () => {
    switch(currentStep) {
      case -1: // Modal de información
        return true;
      case 0: // Información básica
        return !!portfolioName && portfolioName.trim().length > 0;
      case 1: // Evaluación de riesgo
        return riskAssessment.calculatedProfile !== null;
      case 2: // Selección de empresas
        return selectedCompanies.length > 0;
      case 3: // Asignación del portfolio
        return true; // La validación se hace en el componente
      case 4: // Resumen
        return true;
      default:
        return false;
    }
  };

  // Avanzar al siguiente paso si es posible
  const handleNext = () => {
    if (canProceed()) {
      if (currentStep === 4) {
        // Último paso - completar el portfolio
        markAsCompleted();
      } else {
        nextStep();
      }
    }
  };

  // Manejar el reset del wizard
  const handleReset = () => {
    setShowResetConfirmation(true);
  };

  const confirmReset = () => {
    resetWizard();
    setShowResetConfirmation(false);
  };

  // Renderizar el paso actual
  const renderStep = () => {
    switch(currentStep) {
      case -1:
        return <InfoModal />;
      case 0:
        return <PortfolioBasics />;
      case 1:
        return <RiskAssessment />;
      case 2:
        return <CompanySelection />;
      case 3:
        return <PortfolioAllocation />;
      case 4:
        return <PortfolioSummary />;
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  // El paso de información no debe tener la estructura normal de wizard
  if (currentStep === -1) {
    return (
      <div className="flex flex-col w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 md:p-8 card-enhanced border border-border transition-all duration-300 ease-in-out">
          {renderStep()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      {status === 'completed' ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 animate-fadeIn border border-green-200 dark:border-green-800">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-high-contrast">¡Portfolio creado con éxito!</h2>
          <p className="mb-8 text-lg">Tu portfolio ha sido guardado y puedes verlo en la página de portfolios.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/portfolios'}
              size="lg"
              className="btn-hover-effect"
            >
              Ver mis portfolios
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              onClick={handleReset}
              size="lg"
              className="btn-hover-effect"
            >
              Crear otro portfolio
              <RotateCcw className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Título y botón de reinicio */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-high-contrast">Creación de Portfolio</h2>
            {maxStepVisited > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-destructive border-muted transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Reiniciar</span>
              </Button>
            )}
          </div>
          
          {/* Barra de progreso */}
          <div className="mb-6 bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 card-enhanced border border-border">
            <WizardProgress 
              currentStep={currentStep} 
              maxStepVisited={maxStepVisited}
            />
          </div>
          
          <div className="mb-8 min-h-[450px] bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 md:p-8 card-enhanced border border-border transition-all duration-300 ease-in-out">
            {renderStep()}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="group btn-hover-effect transition-all"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-[-2px] transition-transform" />
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="group btn-hover-effect transition-all"
              size="lg"
            >
              {currentStep === 4 ? 'Completar' : 'Siguiente'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-[2px] transition-transform" />
            </Button>
          </div>
        </>
      )}

      {/* Diálogo de confirmación para resetear el wizard */}
      <AlertDialog open={showResetConfirmation} onOpenChange={setShowResetConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Reiniciar creación de portfolio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará todo el progreso actual y tendrás que comenzar de nuevo.
              Los datos no guardados se perderán.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <AlertCircle className="h-4 w-4 mr-2" />
              Reiniciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PortfolioWizard; 