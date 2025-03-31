"use client";

import React from 'react';
import Image from 'next/image';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Shield, 
  Target, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const InfoModal: React.FC = () => {
  const { nextStep } = usePortfolioWizardStore();

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="rounded-full bg-primary/10 p-3 mb-4">
          <Info className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-high-contrast">
          Bienvenido al Creador de Portfolios
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Una herramienta que te ayudará a diseñar y gestionar tu cartera de inversiones de manera personalizada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="overflow-hidden border-border hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Personalización Total</h3>
                <p className="text-muted-foreground">
                  Crea portfolios adaptados a tus objetivos financieros, horizonte temporal y tolerancia al riesgo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Gestión de Riesgos</h3>
                <p className="text-muted-foreground">
                  Evaluamos tu perfil de riesgo y te ayudamos a construir una cartera diversificada y equilibrada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Diversificación Inteligente</h3>
                <p className="text-muted-foreground">
                  Selecciona entre diversas empresas y sectores para optimizar el rendimiento de tu portfolio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border hover:border-primary/50 transition-colors duration-300 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Análisis en Tiempo Real</h3>
                <p className="text-muted-foreground">
                  Visualiza el rendimiento proyectado y compara diferentes estrategias de inversión.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
        <h3 className="font-semibold text-lg mb-3 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Cómo funciona
        </h3>
        <ol className="space-y-3 pl-6 list-decimal">
          <li className="text-muted-foreground">
            <span className="text-high-contrast font-medium">Información básica:</span> Define el nombre y la inversión inicial de tu portfolio.
          </li>
          <li className="text-muted-foreground">
            <span className="text-high-contrast font-medium">Evaluación de riesgo:</span> Responde un breve cuestionario para determinar tu perfil de inversor.
          </li>
          <li className="text-muted-foreground">
            <span className="text-high-contrast font-medium">Selección de empresas:</span> Elige las empresas en las que deseas invertir.
          </li>
          <li className="text-muted-foreground">
            <span className="text-high-contrast font-medium">Asignación de activos:</span> Distribuye tus fondos entre las empresas seleccionadas.
          </li>
          <li className="text-muted-foreground">
            <span className="text-high-contrast font-medium">Resumen final:</span> Revisa y confirma tu portfolio antes de guardarlo.
          </li>
        </ol>
      </div>

      <div className="text-center">
        <Button 
          onClick={nextStep} 
          size="lg" 
          className="btn-hover-effect px-8"
        >
          Comenzar ahora
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          Puedes guardar tu progreso en cualquier momento y retomarlo más tarde.
        </p>
      </div>
    </div>
  );
};

export default InfoModal; 