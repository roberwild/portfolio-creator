"use client";

import React, { useEffect, useState } from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { getMockCompanies, clearCompaniesCache } from '@/lib/mock/mock-companies';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { Company, IndustrySector, GeographicRegion } from '@/types/portfolio.types';
import { CircleDollarSign, PieChart, PercentIcon, AlertCircle, Lock, Unlock } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';

// Diccionario para los nombres legibles de sectores
const sectorNames: Record<IndustrySector, string> = {
  technology: 'Tecnología',
  healthcare: 'Salud',
  financials: 'Finanzas',
  consumerDiscretionary: 'Consumo discrecional',
  consumerStaples: 'Productos básicos de consumo',
  industrials: 'Industriales',
  energy: 'Energía',
  materials: 'Materiales',
  utilities: 'Servicios públicos',
  realEstate: 'Bienes raíces',
  communication: 'Comunicaciones'
};

// Diccionario para los nombres legibles de regiones
const regionNames: Record<GeographicRegion, string> = {
  us: 'Estados Unidos',
  europe: 'Europa',
  spain: 'España',
  latam: 'Latinoamérica',
  asia: 'Asia',
  other: 'Otras regiones'
};

// Colores para los gráficos
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
  '#82CA9D', '#A4DE6C', '#D0ED57', '#FAACC8', '#F97B72',
  '#8DD1E1', '#7F7F7F', '#E6E6FA', '#FFDEAD', '#FFB6C1'
];

const PortfolioAllocation: React.FC = () => {
  // Move cache clearing to useEffect to prevent it running on every render
  useEffect(() => {
    clearCompaniesCache();
  }, []);
  
  const { 
    selectedCompanies, 
    positions,
    updatePosition,
    totalInvestment,
    toggleCompanySelection,
  } = usePortfolioWizardStore();
  
  const [localPositions, setLocalPositions] = useState<Record<string, { percentage: number; shares: number }>>({});
  const [companies, setCompanies] = useState<Record<string, Company>>({});
  const [allocatedPercentage, setAllocatedPercentage] = useState(0);
  const [allocatedAmount, setAllocatedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [initialDistributionDone, setInitialDistributionDone] = useState(false);
  const [lockedCompanies, setLockedCompanies] = useState<Record<string, boolean>>({});
  
  // Datos para los gráficos
  const [allocationChartData, setAllocationChartData] = useState<Array<{ name: string; value: number; ticker: string }>>([]);
  const [sectorChartData, setSectorChartData] = useState<Array<{ name: string; value: number }>>([]);
  const [regionChartData, setRegionChartData] = useState<Array<{ name: string; value: number }>>([]);
  
  // Distribuir equitativamente
  const distributeEvenly = () => {
    if (selectedCompanies.length === 0 || Object.keys(companies).length === 0) return;
    
    const evenPercentage = 100 / selectedCompanies.length;
    
    const newPositions = { ...localPositions };
    let validCompanyCount = 0;
    
    selectedCompanies.forEach(companyId => {
      const company = companies[companyId];
      if (company) {
        validCompanyCount++;
        const amount = (evenPercentage / 100) * totalInvestment;
        const shares = Math.floor(amount / company.price);
        
        newPositions[companyId] = {
          percentage: evenPercentage,
          shares
        };
      }
    });
    
    // Only update if we have valid companies
    if (validCompanyCount > 0) {
      setLocalPositions(newPositions);
      
      // Update store for all positions
      Object.entries(newPositions).forEach(([id, position]) => {
        updatePosition(id, {
          percentage: position.percentage,
          shares: position.shares
        });
      });
    }
  };
  
  // Cargar datos de empresas seleccionadas
  useEffect(() => {
    console.log("Iniciando carga de empresas seleccionadas:", selectedCompanies);
    
    setIsLoading(true);
    const allCompanies = getMockCompanies();
    
    // Crear un mapa con todas las empresas disponibles
    const companyMap: Record<string, Company> = {};
    allCompanies.forEach(company => {
      companyMap[company.id] = company;
    });
    
    setCompanies(companyMap);
    
    // Inicializar posiciones locales desde el store
    const initialPositions: Record<string, { percentage: number; shares: number }> = {};
    
    if (selectedCompanies && selectedCompanies.length > 0) {
      selectedCompanies.forEach(id => {
        // Ensure the company exists in our map
        if (companyMap[id]) {
          const existingPosition = positions.find(p => p.companyId === id);
          initialPositions[id] = {
            percentage: existingPosition?.percentage || 0,
            shares: existingPosition?.shares || 0
          };
        }
      });
    }
    
    setLocalPositions(initialPositions);
    setIsLoading(false);
    
    console.log("Empresas seleccionadas:", selectedCompanies);
    console.log("Todas las empresas:", companyMap);
    console.log("Posiciones inicializadas:", initialPositions);
  }, [selectedCompanies, positions]);
  
  // Realizar distribución equitativa por defecto si no hay posiciones iniciales
  useEffect(() => {
    if (!isLoading && !initialDistributionDone && 
        selectedCompanies && selectedCompanies.length > 0 && 
        companies && Object.keys(companies).length > 0) {
      
      // Verificar si ya hay porcentajes asignados
      const hasAllocations = selectedCompanies.some(id => {
        if (!companies[id]) return false;
        const position = positions.find(p => p.companyId === id);
        return position && position.percentage > 0;
      });
      
      // Si no hay asignaciones previas, distribuir equitativamente
      if (!hasAllocations) {
        distributeEvenly();
      }
      
      setInitialDistributionDone(true);
    }
  }, [isLoading, initialDistributionDone, selectedCompanies, positions, companies, totalInvestment]);
  
  // Calcular totales cuando cambian las posiciones
  useEffect(() => {
    if (!localPositions) return;
    
    let totalPercent = 0;
    let totalAmount = 0;
    
    Object.entries(localPositions).forEach(([companyId, position]) => {
      if (position) {
        totalPercent += position.percentage || 0;
        
        const company = companies[companyId];
        if (company) {
          totalAmount += ((position.percentage || 0) / 100) * totalInvestment;
        }
      }
    });
    
    setAllocatedPercentage(totalPercent);
    setAllocatedAmount(totalAmount);
  }, [localPositions, companies, totalInvestment]);
  
  // Actualizar datos para los gráficos
  useEffect(() => {
    if (!localPositions || !companies) return;
    
    // Para el gráfico de asignación por empresa
    const allocationData: Array<{ name: string; value: number; ticker: string }> = [];
    
    // Para agrupar sectores y regiones
    const sectorData: Record<string, number> = {};
    const regionData: Record<string, number> = {};
    
    // Llenar los datos
    Object.entries(localPositions).forEach(([companyId, position]) => {
      if (!position) return;
      
      const company = companies[companyId];
      if (company && position.percentage > 0) {
        // Datos de asignación por empresa
        allocationData.push({
          name: company.name,
          value: position.percentage,
          ticker: company.ticker
        });
        
        // Agrupar por sector
        const sectorName = sectorNames[company.sector];
        sectorData[sectorName] = (sectorData[sectorName] || 0) + position.percentage;
        
        // Agrupar por región
        const regionName = regionNames[company.region];
        regionData[regionName] = (regionData[regionName] || 0) + position.percentage;
      }
    });
    
    // Convertir los datos agrupados a formato de gráfico
    const sectorChartData = Object.entries(sectorData).map(([name, value]) => ({
      name,
      value
    }));
    
    const regionChartData = Object.entries(regionData).map(([name, value]) => ({
      name,
      value
    }));
    
    // Actualizar estados
    setAllocationChartData(allocationData);
    setSectorChartData(sectorChartData);
    setRegionChartData(regionChartData);
    
  }, [localPositions, companies]);
  
  // Toggle lock/unlock for a company
  const toggleLock = (companyId: string) => {
    setLockedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };
  
  // Adjust unlocked companies when a company's allocation changes
  const adjustUnlockedCompanies = (
    changedCompanyId: string, 
    newPercentage: number, 
    oldPercentage: number
  ) => {
    if (!localPositions) return localPositions;
    
    const percentageDifference = newPercentage - oldPercentage;
    if (percentageDifference === 0) return localPositions;
    
    // Get all unlocked companies except the one being changed
    const unlocked = Object.keys(localPositions).filter(
      id => id !== changedCompanyId && !lockedCompanies[id]
    );
    
    if (unlocked.length === 0) return localPositions;
    
    // Calculate total percentage of unlocked companies
    const totalUnlockedPercentage = unlocked.reduce(
      (sum, id) => {
        const position = localPositions[id];
        return sum + (position?.percentage || 0);
      }, 
      0
    );
    
    if (totalUnlockedPercentage <= 0) return localPositions;
    
    // Create new positions object
    const newPositions = { ...localPositions };
    
    if (percentageDifference > 0) {
      // If allocation is INCREASED, DECREASE other unlocked companies proportionally
      // Calculate adjustment ratio
      const adjustmentRatio = 1 - (percentageDifference / totalUnlockedPercentage);
      
      // Adjust each unlocked company
      unlocked.forEach(id => {
        const position = newPositions[id];
        if (!position) return;
        
        const currentPercentage = position.percentage || 0;
        const newCompanyPercentage = Math.max(0, currentPercentage * adjustmentRatio);
        
        newPositions[id] = {
          ...position,
          percentage: newCompanyPercentage,
        };
        
        // Recalculate shares based on new percentage
        const company = companies[id];
        if (company) {
          const amount = (newCompanyPercentage / 100) * totalInvestment;
          newPositions[id].shares = Math.floor(amount / company.price);
        }
      });
    } else {
      // If allocation is DECREASED, INCREASE other unlocked companies proportionally
      // Distribute the freed up percentage proportionally to unlocked companies
      unlocked.forEach(id => {
        const position = newPositions[id];
        if (!position) return;
        
        const currentPercentage = position.percentage || 0;
        // Calculate proportional distribution based on current allocation
        const proportion = totalUnlockedPercentage > 0 ? currentPercentage / totalUnlockedPercentage : 1 / unlocked.length;
        // Distribute the freed up percentage (negative percentageDifference)
        const newCompanyPercentage = currentPercentage + (Math.abs(percentageDifference) * proportion);
        
        newPositions[id] = {
          ...position,
          percentage: newCompanyPercentage,
        };
        
        // Recalculate shares based on new percentage
        const company = companies[id];
        if (company) {
          const amount = (newCompanyPercentage / 100) * totalInvestment;
          newPositions[id].shares = Math.floor(amount / company.price);
        }
      });
    }
    
    return newPositions;
  };
  
  // Update position in the store with rebalancing
  const handlePositionChange = (companyId: string, field: 'percentage' | 'shares', value: number) => {
    if (!localPositions || !companies[companyId]) return;
    
    // Ensure the position object exists
    if (!localPositions[companyId]) {
      localPositions[companyId] = { percentage: 0, shares: 0 };
    }
    
    // Get old percentage value for comparison
    const oldPercentage = localPositions[companyId]?.percentage || 0;
    
    let newPositions = {
      ...localPositions,
      [companyId]: {
        ...localPositions[companyId],
        [field]: value
      }
    };
    
    // If percentage changed, recalculate shares
    if (field === 'percentage') {
      const company = companies[companyId];
      if (company) {
        const amount = (value / 100) * totalInvestment;
        const sharesToBuy = Math.floor(amount / company.price);
        newPositions[companyId].shares = sharesToBuy;
      }
      
      // Adjust unlocked companies if percentage changed
      newPositions = adjustUnlockedCompanies(companyId, value, oldPercentage);
    } else if (field === 'shares') {
      // If shares changed, recalculate percentage
      const company = companies[companyId];
      if (company) {
        const amount = value * company.price;
        const newPercentage = (amount / totalInvestment) * 100;
        newPositions[companyId].percentage = newPercentage;
        
        // Adjust unlocked companies
        newPositions = adjustUnlockedCompanies(companyId, newPercentage, oldPercentage);
      }
    }
    
    // Update local state
    setLocalPositions(newPositions);
    
    // Update store for all changed positions
    Object.entries(newPositions).forEach(([id, position]) => {
      if (position) {
        updatePosition(id, {
          percentage: position.percentage,
          shares: position.shares
        });
      }
    });
  };
  
  // Renderizar información del total
  const renderTotalInfo = () => {
    const remainingPercentage = 100 - allocatedPercentage;
    const remainingAmount = totalInvestment - allocatedAmount;
    
    // Colores que representan el estado de la asignación
    let statusColor = 'text-yellow-500';
    if (allocatedPercentage === 100) {
      statusColor = 'text-green-500';
    } else if (allocatedPercentage > 100) {
      statusColor = 'text-red-500';
    }
    
    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex justify-between">
            <span>Resumen de asignación</span>
            <Button 
              onClick={distributeEvenly}
              variant="outline"
              size="sm"
              className="text-sm"
              disabled={selectedCompanies.length === 0}
            >
              Distribuir equitativamente
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PercentIcon className="w-5 h-5 text-muted-foreground" />
                <span>Porcentaje asignado:</span>
              </div>
              <span className={`font-semibold ${statusColor}`}>
                {allocatedPercentage.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PercentIcon className="w-5 h-5 text-muted-foreground" />
                <span>Porcentaje restante:</span>
              </div>
              <span className="font-semibold">
                {remainingPercentage.toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
                <span>Monto asignado:</span>
              </div>
              <span className="font-semibold">
                {formatCurrency(allocatedAmount)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="w-5 h-5 text-muted-foreground" />
                <span>Monto restante:</span>
              </div>
              <span className="font-semibold">
                {formatCurrency(remainingAmount)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Renderizar mensaje de no hay empresas seleccionadas
  const renderNoCompaniesSelected = () => {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No hay empresas seleccionadas para asignar. Por favor, regresa al paso anterior y selecciona algunas empresas para tu portfolio.
        </AlertDescription>
      </Alert>
    );
  };
  
  // Renderizar gráfico para distribución del portfolio
  const renderCharts = () => {
    if (isLoading || selectedCompanies.length === 0) {
      return null;
    }
    
    // Renderizador personalizado para las etiquetas del gráfico de empresa
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
      if (percent < 0.05) return null; // No mostrar etiquetas pequeñas
      
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      );
    };
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Análisis y diversificación del portfolio</CardTitle>
          <CardDescription>
            Visualiza cómo está distribuida tu inversión por empresa, sector y región geográfica.
            Una cartera bien diversificada reduce el riesgo y mejora el potencial de rendimiento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="allocation">
            <TabsList className="mb-4">
              <TabsTrigger value="allocation">Empresas</TabsTrigger>
              <TabsTrigger value="sector">Sectores</TabsTrigger>
              <TabsTrigger value="region">Regiones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="allocation" className="mt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={allocationChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {allocationChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Legend formatter={(value, entry) => {
                      const item = allocationChartData.find(d => d.name === value);
                      return item ? `${value} (${item.ticker})` : value;
                    }} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="sector" className="mt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sectorChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sectorChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="region" className="mt-0">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={regionChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };
  
  // Renderizar la tabla de asignación
  const renderAllocationTable = () => {
    if (isLoading) {
      return <div className="text-center py-4">Cargando empresas...</div>;
    }
    
    console.log("Render table - selectedCompanies:", selectedCompanies);
    console.log("Render table - companies keys:", Object.keys(companies));
    
    if (selectedCompanies.length === 0) {
      return renderNoCompaniesSelected();
    }
    
    // Verificar que las empresas existen en el mapa
    const validCompanies = selectedCompanies.filter(id => companies[id]);
    if (validCompanies.length === 0) {
      return <div className="text-center py-4">No se encontraron datos para las empresas seleccionadas.</div>;
    }
    
    return (
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Empresa</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Asignación (%)</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Acciones</TableHead>
                <TableHead className="w-[160px]">Distribución</TableHead>
                <TableHead className="w-[40px]">Bloqueo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validCompanies.map(companyId => {
                const company = companies[companyId];
                // Esta comprobación no debería ser necesaria ya que filtramos antes, pero por seguridad:
                if (!company) return null;

                const position = localPositions[companyId] || { percentage: 0, shares: 0 };
                const investmentAmount = (position.percentage / 100) * totalInvestment;
                const isLocked = lockedCompanies[companyId] || false;
                
                return (
                  <TableRow key={companyId}>
                    <TableCell className="font-medium">
                      <div>{company.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{company.ticker}</div>
                    </TableCell>
                    <TableCell>${company.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={position.percentage}
                          min={0}
                          max={100}
                          step={0.1}
                          onChange={(e) => handlePositionChange(
                            companyId, 
                            'percentage', 
                            parseFloat(e.target.value) || 0
                          )}
                          className="w-16"
                          disabled={isLocked && selectedCompanies.length > 1}
                        />
                        <span>%</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(investmentAmount)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={position.shares}
                          min={0}
                          onChange={(e) => handlePositionChange(
                            companyId, 
                            'shares', 
                            parseInt(e.target.value) || 0
                          )}
                          className="w-16"
                          disabled={isLocked && selectedCompanies.length > 1}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Slider
                          value={[position.percentage]}
                          min={0}
                          max={100}
                          step={0.1}
                          onValueChange={(value) => handlePositionChange(companyId, 'percentage', value[0])}
                          disabled={isLocked && selectedCompanies.length > 1}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleLock(companyId)}
                        className="hover:bg-muted"
                        title={isLocked ? "Desbloquear asignación" : "Bloquear asignación"}
                      >
                        {isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Asignación del portfolio</h2>
        <p className="text-muted-foreground">
          Define qué porcentaje de tu inversión total quieres asignar a cada empresa seleccionada.
          Usa el icono de candado para bloquear asignaciones que no quieres que cambien automáticamente.
        </p>
      </div>
      
      {renderTotalInfo()}
      {renderCharts()}
      {renderAllocationTable()}
    </div>
  );
};

export default PortfolioAllocation; 