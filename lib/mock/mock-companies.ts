import { faker } from '@faker-js/faker';
import { Company, IndustrySector, GeographicRegion } from '@/types/portfolio.types';

// Configuración para generar datos consistentes
faker.seed(123);

// Lista de tickers de ejemplo
const tickers = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX', 'PYPL', 'ADBE',
  'CSCO', 'INTC', 'AMD', 'CRM', 'AVGO', 'QCOM', 'ORCL', 'IBM', 'UBER', 'SPOT',
  'SAN', 'BBVA', 'TEF', 'ITX', 'REP', 'ELE', 'IBE', 'AMS', 'FER', 'MAP',
  'MC', 'CABK', 'SAB', 'ACS', 'ENG', 'IDR', 'MTS', 'AENA', 'COL', 'GRF'
];

// Lista de nombres de empresas de ejemplo
const companyNames = [
  'Apple Inc.', 'Microsoft Corporation', 'Alphabet Inc.', 'Amazon.com Inc.', 'Meta Platforms, Inc.', 
  'Tesla, Inc.', 'NVIDIA Corporation', 'Netflix, Inc.', 'PayPal Holdings, Inc.', 'Adobe Inc.',
  'Cisco Systems, Inc.', 'Intel Corporation', 'Advanced Micro Devices, Inc.', 'Salesforce, Inc.', 
  'Broadcom Inc.', 'Qualcomm Incorporated', 'Oracle Corporation', 'IBM Corporation', 'Uber Technologies, Inc.', 
  'Spotify Technology S.A.',
  'Banco Santander, S.A.', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Telefónica, S.A.', 'Industria de Diseño Textil, S.A.', 
  'Repsol, S.A.', 'Endesa, S.A.', 'Iberdrola, S.A.', 'Amadeus IT Group, S.A.', 'Ferrovial, S.A.', 
  'MAPFRE, S.A.',
  'LVMH Moët Hennessy Louis Vuitton SE', 'CaixaBank, S.A.', 'Banco Sabadell, S.A.', 'ACS, Actividades de Construcción y Servicios, S.A.', 
  'Enagás, S.A.', 'Indra Sistemas, S.A.', 'ArcelorMittal, S.A.', 'Aena SME, S.A.', 'Inmobiliaria Colonial, SOCIMI, S.A.', 
  'Grifols, S.A.'
];

// Sectores disponibles
const sectors: IndustrySector[] = [
  'technology', 'healthcare', 'financials', 'consumerDiscretionary', 
  'consumerStaples', 'industrials', 'energy', 'materials', 
  'utilities', 'realEstate', 'communication'
];

// Regiones disponibles
const regions: GeographicRegion[] = [
  'us', 'europe', 'spain', 'latam', 'asia', 'other'
];

/**
 * Genera una lista de empresas mock con datos realistas
 * @returns Lista de empresas para usar en la aplicación
 */
function generateCompanies(): Company[] {
  const companies: Company[] = [];
  
  // Crear empresas basadas en los tickers y nombres de ejemplo
  for (let i = 0; i < tickers.length; i++) {
    const ticker = tickers[i];
    const name = companyNames[i];
    
    // Semilla específica para cada empresa para generar datos consistentes
    faker.seed(ticker.charCodeAt(0) * 1000 + ticker.charCodeAt(ticker.length - 1));
    
    // Generar un ID consistente basado en el ticker en lugar de un UUID aleatorio
    // Esto asegura que cada empresa tenga siempre el mismo ID
    const id = `company-${ticker.toLowerCase()}-${ticker.charCodeAt(0)}${ticker.charCodeAt(ticker.length - 1)}`;
    
    // Generar datos de la empresa
    const company: Company = {
      id,
      name,
      ticker,
      sector: faker.helpers.arrayElement(sectors),
      region: faker.helpers.arrayElement(regions),
      marketCap: faker.number.int({ min: 1000000000, max: 3000000000000 }),
      price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
      dividendYield: faker.number.float({ min: 0, max: 0.06, fractionDigits: 4 }),
      volatility: faker.number.float({ min: 0.1, max: 0.8, fractionDigits: 2 }),
      historicalReturns: {
        '1m': faker.number.float({ min: -0.15, max: 0.15, fractionDigits: 4 }),
        '3m': faker.number.float({ min: -0.25, max: 0.25, fractionDigits: 4 }),
        '1y': faker.number.float({ min: -0.4, max: 0.5, fractionDigits: 4 }),
        '5y': faker.number.float({ min: -0.6, max: 1.5, fractionDigits: 4 })
      },
      logoUrl: `https://example.com/logos/${ticker.toLowerCase()}.png`
    };
    
    companies.push(company);
  }

  // Asegurar que haya empresas en cada sector
  sectors.forEach(sector => {
    // Si no hay empresas en este sector, asignar al menos una
    if (!companies.some(c => c.sector === sector)) {
      const randomIndex = faker.number.int({ min: 0, max: companies.length - 1 });
      companies[randomIndex].sector = sector;
    }
  });
  
  return companies;
}

// Caché de empresas para mejorar el rendimiento
let companiesCache: Company[] | null = null;

/**
 * Borra el caché de empresas para forzar una nueva generación
 * Útil cuando se necesita garantizar IDs consistentes
 */
export function clearCompaniesCache(): void {
  companiesCache = null;
  console.log("Caché de empresas borrado en lib/mock/mock-companies.ts");
}

/**
 * Obtiene los datos de empresas, usando caché para optimizar el rendimiento
 * @returns Lista de empresas para usar en la aplicación
 */
export function getMockCompanies(): Company[] {
  if (!companiesCache) {
    companiesCache = generateCompanies();
    console.log("Nuevo caché generado en lib/mock/mock-companies.ts");
  }
  return [...companiesCache]; // Devolver copia para evitar mutaciones accidentales
} 