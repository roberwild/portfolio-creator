import React from 'react';
import PortfolioWizard from '@/components/portfolio-wizard/PortfolioWizard';

export const metadata = {
  title: 'Crear Portfolio | Portfolio Creator',
  description: 'Crea tu portfolio de inversión personalizado',
};

export default function CrearPortfolioPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Crear nuevo portfolio</h1>
      <PortfolioWizard />
    </div>
  );
} 