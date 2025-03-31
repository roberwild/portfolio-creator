import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function HomePage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Crea y gestiona tus portfolios de inversión
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Nuestra plataforma te permite crear portfolios de inversión personalizados,
          evaluando tu perfil de riesgo y ayudándote a seleccionar las mejores opciones
          de empresas para invertir.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="md:text-lg">
            <Link href="/crear-portfolio">
              Crear nuevo portfolio
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="md:text-lg">
            <Link href="/portfolios">
              Ver mis portfolios
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Evaluación de riesgo</h2>
            <p className="text-muted-foreground">
              Determina tu perfil de inversión a través de un cuestionario 
              personalizado para ajustar las recomendaciones a tu tolerancia al riesgo.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Selección de empresas</h2>
            <p className="text-muted-foreground">
              Explora un catálogo de empresas organizadas por sector y elige 
              las que mejor se adapten a tu estrategia de inversión.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Distribución de activos</h2>
            <p className="text-muted-foreground">
              Asigna porcentajes a cada activo de tu portfolio para equilibrar
              riesgo y rendimiento según tus objetivos financieros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
