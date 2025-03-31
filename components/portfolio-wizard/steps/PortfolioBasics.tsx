"use client";

import React from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/utils';

const PortfolioBasics: React.FC = () => {
  const { 
    portfolioName, 
    updatePortfolioName, 
    totalInvestment, 
    updateTotalInvestment 
  } = usePortfolioWizardStore();

  // Manejar el cambio de nombre del portfolio
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePortfolioName(e.target.value);
  };

  // Manejar el cambio en la inversión total (slider)
  const handleInvestmentChange = (value: number[]) => {
    updateTotalInvestment(value[0]);
  };

  // Manejar el cambio en la inversión total (input)
  const handleInvestmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(value)) {
      // Limitar el valor entre el mínimo y máximo del slider
      const limitedValue = Math.max(1000, Math.min(1000000, value));
      updateTotalInvestment(limitedValue);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Información básica</h2>
        <p className="text-muted-foreground">
          Comienza configurando los detalles básicos de tu nuevo portfolio de inversión.
        </p>
      </div>

      {/* Nombre del portfolio */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="portfolio-name">Nombre del portfolio</Label>
          <Input
            id="portfolio-name"
            value={portfolioName}
            onChange={handleNameChange}
            placeholder="Ej: Mi portfolio de crecimiento"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Elige un nombre descriptivo que te ayude a identificar este portfolio en el futuro.
          </p>
        </div>

        {/* Inversión total */}
        <div className="mt-6">
          <Label>Inversión total objetivo</Label>
          <div className="flex items-center mt-2">
            <Slider
              value={[totalInvestment]}
              min={1000}
              max={1000000}
              step={1000}
              onValueChange={handleInvestmentChange}
              className="flex-1 mr-4"
            />
            <Input
              type="text"
              value={formatCurrency(totalInvestment)}
              onChange={handleInvestmentInputChange}
              className="w-32 text-right"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Cantidad total que planeas invertir en este portfolio.
          </p>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">¿Por qué es importante definir estos valores?</h3>
        <p className="text-sm">
          El nombre te ayudará a organizar tus portfolios, mientras que el monto total 
          de inversión es esencial para calcular la asignación de activos posteriormente.
        </p>
      </div>
    </div>
  );
};

export default PortfolioBasics; 