import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Mis Portfolios | Portfolio Creator',
  description: 'Gestiona tus portfolios de inversión personalizados',
};

export default function PortfoliosPage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Portfolios</h1>
        <Button asChild>
          <Link href="/crear-portfolio">
            Crear nuevo portfolio
          </Link>
        </Button>
      </div>
      
      <div className="bg-muted p-10 rounded-lg text-center">
        <h2 className="text-xl font-medium mb-4">No tienes portfolios todavía</h2>
        <p className="text-muted-foreground mb-6">
          Crea tu primer portfolio para comenzar a gestionar tus inversiones
        </p>
        <Button asChild size="lg">
          <Link href="/crear-portfolio">
            Comenzar
          </Link>
        </Button>
      </div>
    </div>
  );
} 