"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { getMockCompanies, clearCompaniesCache } from '@/lib/mock/mock-companies';
import { formatCurrency } from '@/lib/utils';
import { Company, Position } from '@/types/portfolio.types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertCircle, CheckCircle2, Bookmark, Coins, TrendingUp, PieChart } from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Wrapper to safely render components that might throw errors
const SafeRender: React.FC<{
  children: React.ReactNode,
  fallback: React.ReactNode
}> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Caught error in SafeRender:', event.error);
      setHasError(true);
      // Prevent default error handling
      event.preventDefault();
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// Simple emergency fallback component
const SimplePortfolioSummary: React.FC = () => {
  const { 
    portfolioName,
    totalInvestment,
    riskAssessment,
    selectedCompanies,
  } = usePortfolioWizardStore();
  
  // Move cache clearing to useEffect to prevent it running on every render
  useEffect(() => {
    clearCompaniesCache();
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary-foreground">Resumen del Portfolio</h2>
        <p className="text-secondary-foreground/90">
          Revisa los detalles de tu portfolio antes de crearlo.
        </p>
      </div>
      
      {/* Información básica simplificada */}
      <Card className="shadow-sm card-enhanced border-border">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">Detalles básicos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Bookmark className="h-4 w-4" />
                Nombre del Portfolio
              </h3>
              <p className="text-lg font-semibold text-secondary-foreground">{portfolioName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Coins className="h-4 w-4" />
                Inversión Total
              </h3>
              <p className="text-lg font-semibold text-secondary-foreground">{formatCurrency(totalInvestment)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4" />
                Perfil de Riesgo
              </h3>
              <p className="text-lg font-semibold text-secondary-foreground capitalize">
                {riskAssessment.calculatedProfile || 'No calculado'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <PieChart className="h-4 w-4" />
                Empresas Seleccionadas
              </h3>
              <p className="text-lg font-semibold text-secondary-foreground">
                {selectedCompanies.length} empresas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Empresas seleccionadas simplificadas */}
      <Card className="shadow-sm card-enhanced border-border">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">
            Empresas Seleccionadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md">
            <p className="text-center text-muted-foreground">
              Has seleccionado {selectedCompanies.length} empresas para tu portfolio.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Próximos pasos */}
      <Card className="shadow-sm card-enhanced border-border">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">Próximos pasos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-secondary-foreground">
            Al completar este portfolio, podrás:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li className="text-secondary-foreground">
              Ver el rendimiento proyectado basado en datos históricos
            </li>
            <li className="text-secondary-foreground">
              Recibir alertas sobre cambios importantes en tus inversiones
            </li>
            <li className="text-secondary-foreground">
              Realizar ajustes y rebalanceos periódicamente
            </li>
            <li className="text-secondary-foreground">
              Comparar tu portfolio con índices de referencia
            </li>
          </ul>
        </CardContent>
        <CardFooter className="text-sm border-t bg-muted/20 py-3 text-secondary-foreground/80">
          Haz clic en "Completar" para crear tu portfolio y comenzar a seguir su desempeño.
        </CardFooter>
      </Card>
    </div>
  );
};

const PortfolioSummary: React.FC = () => {
  return (
    <SafeRender
      fallback={<SimplePortfolioSummary />}
    >
      <OriginalPortfolioSummary />
    </SafeRender>
  );
};

// The original component renamed
const OriginalPortfolioSummary: React.FC = () => {
  // Move cache clearing to useEffect to prevent it running on every render
  useEffect(() => {
    clearCompaniesCache();
  }, []);
  
  const { 
    portfolioName,
    totalInvestment,
    riskAssessment,
    selectedCompanies,
    positions,
    excludedSectors
  } = usePortfolioWizardStore();
  
  // Obtener detalles de las empresas
  const companies = useMemo(() => {
    try {
      console.log('companies calculation started');
      console.log('selectedCompanies:', JSON.stringify(selectedCompanies, null, 2));
      
      if (!selectedCompanies) {
        console.log('selectedCompanies is undefined or null');
        return [];
      }
      
      if (!Array.isArray(selectedCompanies)) {
        console.log('selectedCompanies is not an array:', typeof selectedCompanies);
        return [];
      }
      
      if (selectedCompanies.length === 0) {
        console.log('selectedCompanies is empty array');
        return [];
      }
      
      const allCompanies = getMockCompanies();
      console.log('All companies count:', allCompanies.length);
      
      const filteredCompanies = allCompanies.filter(company => 
        company && company.id && selectedCompanies.includes(company.id)
      );
      
      console.log('Filtered companies count:', filteredCompanies.length);
      
      return filteredCompanies;
    } catch (error) {
      console.error('Error in companies calculation:', error);
      return [];
    }
  }, [selectedCompanies]);
  
  // Verificar si el portfolio está completamente asignado (100%)
  const totalAllocation = useMemo(() => {
    if (!positions || positions.length === 0) return 0;
    return positions.reduce((sum, position) => sum + (position?.percentage || 0), 0);
  }, [positions]);
  
  // Mapear empresas con sus posiciones
  const positionsWithDetails = useMemo(() => {
    try {
      console.log('positionsWithDetails calculation started');
      console.log('positions:', JSON.stringify(positions, null, 2));
      console.log('companies:', JSON.stringify(companies, null, 2));
      
      if (!positions) {
        console.log('positions is undefined or null');
        return [];
      }
      
      if (!Array.isArray(positions)) {
        console.log('positions is not an array:', typeof positions);
        return [];
      }
      
      if (positions.length === 0) {
        console.log('positions is empty array');
        return [];
      }
      
      if (!companies) {
        console.log('companies is undefined or null');
        return [];
      }
      
      if (!Array.isArray(companies)) {
        console.log('companies is not an array:', typeof companies);
        return [];
      }
      
      if (companies.length === 0) {
        console.log('companies is empty array');
        return [];
      }
      
      // Safely filter and map with detailed logging
      console.log('Filtering positions with valid companyId');
      const filteredPositions = positions.filter(position => {
        const isValid = !!position && !!position.companyId;
        if (!isValid) console.log('Invalid position found:', position);
        return isValid;
      });
      
      console.log('Filtered positions length:', filteredPositions.length);
      
      // Map each position to include its company details
      const mappedPositions = filteredPositions.map(position => {
        const company = companies.find(c => c.id === position.companyId);
        
        if (!company) {
          console.log(`Company not found for position with companyId: ${position.companyId}`);
        }
        
        return {
          position,
          company
        };
      });
      
      console.log('Mapped positions length:', mappedPositions.length);
      
      // Filter out items with no company and sort
      const result = mappedPositions
        .filter(item => !!item.company)
        .sort((a, b) => b.position.percentage - a.position.percentage);
      
      console.log('Final positionsWithDetails length:', result.length);
      return result;
    } catch (error) {
      console.error('Error in positionsWithDetails calculation:', error);
      return [];
    }
  }, [positions, companies]);
  
  // Datos para el pie chart
  const pieChartData = useMemo(() => {
    try {
      console.log('pieChartData calculation started');
      console.log('positionsWithDetails:', JSON.stringify(positionsWithDetails, null, 2));
      console.log('totalInvestment:', totalInvestment);
      
      if (!positionsWithDetails) {
        console.log('positionsWithDetails is undefined or null');
        return [];
      }
      
      if (!Array.isArray(positionsWithDetails)) {
        console.log('positionsWithDetails is not an array:', typeof positionsWithDetails);
        return [];
      }
      
      if (positionsWithDetails.length === 0) {
        console.log('positionsWithDetails is empty array');
        return [];
      }
      
      // More detailed filtering with logging
      const filteredData = positionsWithDetails.filter(item => {
        const hasCompany = !!item?.company;
        const hasPosition = !!item?.position;
        
        if (!hasCompany) console.log('Item missing company:', item);
        if (!hasPosition) console.log('Item missing position:', item);
        
        return hasCompany && hasPosition;
      });
      
      console.log('Filtered data length:', filteredData.length);
      
      // Safe mapping with detailed logging
      const chartData = filteredData.map((item, index) => {
        console.log(`Processing item ${index}:`, item);
        
        const { position, company } = item;
        
        // Verify all required properties exist
        if (!position) {
          console.log(`Item ${index} has no position`);
          return {
            name: 'Unknown',
            value: 0,
            fill: '#cccccc',
            ticker: '--',
            amount: 0
          };
        }
        
        if (!company) {
          console.log(`Item ${index} has no company`);
          return {
            name: 'Unknown',
            value: position.percentage || 0,
            fill: '#cccccc',
            ticker: '--',
            amount: ((position.percentage || 0) / 100) * totalInvestment
          };
        }
        
        // Safe access to all properties
        const name = company.name || 'Unknown';
        const percentage = position.percentage || 0;
        const companyId = company.id || '0';
        const ticker = company.ticker || '--';
        const amount = (percentage / 100) * totalInvestment;
        
        console.log(`Item ${index} processed successfully:`, {
          name, percentage, companyId, ticker, amount
        });
        
        return {
          name,
          value: percentage,
          fill: getRandomColor(companyId),
          ticker,
          amount
        };
      });
      
      console.log('pieChartData calculation completed successfully');
      console.log('Final chart data:', chartData);
      
      return chartData;
    } catch (error) {
      console.error('Error in pieChartData calculation:', error);
      // Return empty array to avoid crashes
      return [];
    }
  }, [positionsWithDetails, totalInvestment]);
  
  // Función para generar colores aleatorios pero consistentes basados en un ID
  const getRandomColor = (id: string) => {
    try {
      if (!id) {
        console.warn('Empty ID passed to getRandomColor, using default');
        return '#cccccc';
      }
      
      const colors = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DF3', 
        '#EA5455', '#3FA796', '#9B59B6', '#34495E', '#16A085',
        '#27AE60', '#E67E22', '#F1C40F', '#E74C3C', '#8E44AD'
      ];
      
      // Usar el ID para seleccionar un color de la lista
      const colorIndex = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
      return colors[colorIndex];
    } catch (error) {
      console.error('Error in getRandomColor:', error);
      return '#cccccc'; // Default color in case of error
    }
  };
  
  // Componente para el tooltip personalizado del pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border p-2 rounded-md text-xs shadow-md">
          <p className="font-semibold">{data.name} ({data.ticker})</p>
          <p className="text-muted-foreground">{data.value.toFixed(1)}%</p>
          <p className="font-medium">{formatCurrency(data.amount)}</p>
        </div>
      );
    }
    return null;
  };
  
  // Renderizar información del perfil de riesgo
  const renderRiskProfile = () => {
    if (!riskAssessment.calculatedProfile) return null;
    
    const profiles = {
      conservative: {
        title: "Conservador",
        description: "Prefieres inversiones seguras con menor riesgo.",
        color: "bg-blue-50 dark:bg-blue-950",
        borderColor: "border-blue-200 dark:border-blue-800",
        textColor: "text-blue-800 dark:text-blue-200"
      },
      moderate: {
        title: "Moderado",
        description: "Equilibrio entre seguridad y crecimiento.",
        color: "bg-green-50 dark:bg-green-950",
        borderColor: "border-green-200 dark:border-green-800",
        textColor: "text-green-800 dark:text-green-200"
      },
      balanced: {
        title: "Equilibrado",
        description: "Balance entre riesgo y rendimiento potencial.",
        color: "bg-yellow-50 dark:bg-yellow-950",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        textColor: "text-yellow-800 dark:text-yellow-200"
      },
      growth: {
        title: "Crecimiento",
        description: "Prioridad al crecimiento con tolerancia al riesgo.",
        color: "bg-orange-50 dark:bg-orange-950",
        borderColor: "border-orange-200 dark:border-orange-800",
        textColor: "text-orange-800 dark:text-orange-200"
      },
      aggressive: {
        title: "Agresivo",
        description: "Maximización de rendimientos asumiendo alto riesgo.",
        color: "bg-red-50 dark:bg-red-950",
        borderColor: "border-red-200 dark:border-red-800",
        textColor: "text-red-800 dark:text-red-200"
      }
    };
    
    const profile = profiles[riskAssessment.calculatedProfile];
    
    return (
      <Card className={`${profile.color} ${profile.borderColor} border shadow-sm`}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-lg ${profile.textColor} flex items-center gap-2`}>
            <PieChart className="h-5 w-5" />
            {profile.title}
          </CardTitle>
          <CardDescription className={profile.textColor}>{profile.description}</CardDescription>
        </CardHeader>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-secondary-foreground">Resumen del Portfolio</h2>
        <p className="text-secondary-foreground/90">
          Revisa los detalles de tu portfolio antes de crearlo.
        </p>
      </div>
      
      {/* Información básica */}
      <Card className="shadow-sm card-enhanced border-border">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">Detalles básicos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Bookmark className="h-4 w-4" />
                Nombre del Portfolio
              </h3>
              <p className="text-lg font-semibold text-secondary-foreground">{portfolioName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <Coins className="h-4 w-4" />
                Inversión Total
              </h3>
              <p className="text-lg font-semibold text-secondary-foreground">{formatCurrency(totalInvestment)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4" />
                Perfil de Riesgo
              </h3>
              {renderRiskProfile()}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                <PieChart className="h-4 w-4" />
                Estado de Asignación
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {Math.abs(totalAllocation - 100) < 0.1 ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                    <span className="font-medium text-green-700 dark:text-green-500">
                      Completamente asignado (100%)
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                    <span className="font-medium text-yellow-700 dark:text-yellow-500">
                      {totalAllocation > 100 
                        ? `Sobreasignado (${totalAllocation.toFixed(1)}%)`
                        : `Asignación parcial (${totalAllocation.toFixed(1)}%)`
                      }
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Asignación del portfolio */}
      <Card className="shadow-sm card-enhanced border-border">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">
            Asignación del Portfolio
          </CardTitle>
          <CardDescription className="text-secondary-foreground/80">
            {(selectedCompanies?.length || 0)} {(selectedCompanies?.length || 0) === 1 ? 'empresa' : 'empresas'} seleccionada{(selectedCompanies?.length || 0) !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico de asignación */}
            <div className="h-80 flex items-center justify-center">
              {pieChartData && pieChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill || '#cccccc'} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value, entry, index) => {
                        const item = pieChartData[index];
                        return (
                          <span className="text-xs font-medium text-secondary-foreground">
                            {value} {item ? `(${item.ticker})` : ''}
                          </span>
                        );
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-muted-foreground flex items-center justify-center h-full">
                  <p>No hay datos para mostrar</p>
                </div>
              )}
            </div>

            {/* Tabla de asignación */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold text-secondary-foreground">Empresa</TableHead>
                    <TableHead className="font-semibold text-secondary-foreground">Ticker</TableHead>
                    <TableHead className="text-right font-semibold text-secondary-foreground">Porcentaje</TableHead>
                    <TableHead className="text-right font-semibold text-secondary-foreground">Acciones</TableHead>
                    <TableHead className="text-right font-semibold text-secondary-foreground">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positionsWithDetails && positionsWithDetails.length > 0 ? (
                    positionsWithDetails.map(({ position, company }) => {
                      if (!company || !position) return null;
                      return (
                        <TableRow key={position.companyId} className="hover:bg-muted/30">
                          <TableCell className="font-medium text-secondary-foreground">
                            {company.name}
                          </TableCell>
                          <TableCell className="font-mono text-secondary-foreground">
                            {company.ticker}
                          </TableCell>
                          <TableCell className="text-right font-medium text-secondary-foreground">
                            {position.percentage.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-right text-secondary-foreground">
                            {position.shares}
                          </TableCell>
                          <TableCell className="text-right font-medium text-secondary-foreground">
                            {formatCurrency((position.percentage / 100) * totalInvestment)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No hay posiciones para mostrar
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableCaption className="px-4 py-3 text-secondary-foreground/70 bg-muted/20 border-t">
                  Información actualizada a {new Date().toLocaleDateString()}
                </TableCaption>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Próximos pasos */}
      <Card className="shadow-sm card-enhanced border-border">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">Próximos pasos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-secondary-foreground">
            Al completar este portfolio, podrás:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li className="text-secondary-foreground">
              Ver el rendimiento proyectado basado en datos históricos
            </li>
            <li className="text-secondary-foreground">
              Recibir alertas sobre cambios importantes en tus inversiones
            </li>
            <li className="text-secondary-foreground">
              Realizar ajustes y rebalanceos periódicamente
            </li>
            <li className="text-secondary-foreground">
              Comparar tu portfolio con índices de referencia
            </li>
          </ul>
        </CardContent>
        <CardFooter className="text-sm border-t bg-muted/20 py-3 text-secondary-foreground/80">
          Haz clic en "Completar" para crear tu portfolio y comenzar a seguir su desempeño.
        </CardFooter>
      </Card>
    </div>
  );
};

export default PortfolioSummary; 