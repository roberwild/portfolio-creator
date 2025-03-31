import { faker } from '@faker-js/faker';
import { Company, IndustrySector, GeographicRegion } from '@/types/portfolio.types';
import { v4 as uuidv4 } from 'uuid';

// Definir datos realistas para las empresas
const usCompanies = [
  { name: 'Apple Inc.', ticker: 'AAPL', sector: 'technology' as IndustrySector },
  { name: 'Microsoft Corporation', ticker: 'MSFT', sector: 'technology' as IndustrySector },
  { name: 'Amazon.com Inc.', ticker: 'AMZN', sector: 'technology' as IndustrySector },
  { name: 'Alphabet Inc.', ticker: 'GOOGL', sector: 'technology' as IndustrySector },
  { name: 'Meta Platforms Inc.', ticker: 'META', sector: 'technology' as IndustrySector },
  { name: 'Tesla Inc.', ticker: 'TSLA', sector: 'consumerDiscretionary' as IndustrySector },
  { name: 'Berkshire Hathaway Inc.', ticker: 'BRK.A', sector: 'financials' as IndustrySector },
  { name: 'NVIDIA Corporation', ticker: 'NVDA', sector: 'technology' as IndustrySector },
  { name: 'Johnson & Johnson', ticker: 'JNJ', sector: 'healthcare' as IndustrySector },
  { name: 'JPMorgan Chase & Co.', ticker: 'JPM', sector: 'financials' as IndustrySector },
  { name: 'Visa Inc.', ticker: 'V', sector: 'financials' as IndustrySector },
  { name: 'Procter & Gamble Co.', ticker: 'PG', sector: 'consumerStaples' as IndustrySector },
  { name: 'UnitedHealth Group Inc.', ticker: 'UNH', sector: 'healthcare' as IndustrySector },
  { name: 'Home Depot Inc.', ticker: 'HD', sector: 'consumerDiscretionary' as IndustrySector },
  { name: 'Mastercard Inc.', ticker: 'MA', sector: 'financials' as IndustrySector },
  { name: 'Bank of America Corp.', ticker: 'BAC', sector: 'financials' as IndustrySector },
  { name: 'Pfizer Inc.', ticker: 'PFE', sector: 'healthcare' as IndustrySector },
  { name: 'Walt Disney Co.', ticker: 'DIS', sector: 'communication' as IndustrySector },
  { name: 'Netflix Inc.', ticker: 'NFLX', sector: 'communication' as IndustrySector },
  { name: 'Coca-Cola Co.', ticker: 'KO', sector: 'consumerStaples' as IndustrySector },
  { name: 'Exxon Mobil Corp.', ticker: 'XOM', sector: 'energy' as IndustrySector },
  { name: 'Chevron Corp.', ticker: 'CVX', sector: 'energy' as IndustrySector },
  { name: 'Walmart Inc.', ticker: 'WMT', sector: 'consumerStaples' as IndustrySector },
  { name: 'McDonald\'s Corp.', ticker: 'MCD', sector: 'consumerDiscretionary' as IndustrySector },
  { name: 'Intel Corp.', ticker: 'INTC', sector: 'technology' as IndustrySector },
  { name: 'Cisco Systems Inc.', ticker: 'CSCO', sector: 'technology' as IndustrySector },
  { name: 'Verizon Communications Inc.', ticker: 'VZ', sector: 'communication' as IndustrySector },
  { name: 'AT&T Inc.', ticker: 'T', sector: 'communication' as IndustrySector },
  { name: 'Abbott Laboratories', ticker: 'ABT', sector: 'healthcare' as IndustrySector },
  { name: 'Adobe Inc.', ticker: 'ADBE', sector: 'technology' as IndustrySector },
];

const spanishCompanies = [
  { name: 'Banco Santander, S.A.', ticker: 'SAN', sector: 'financials' as IndustrySector },
  { name: 'Telefónica, S.A.', ticker: 'TEF', sector: 'communication' as IndustrySector },
  { name: 'Inditex (Industria de Diseño Textil)', ticker: 'ITX', sector: 'consumerDiscretionary' as IndustrySector },
  { name: 'Iberdrola, S.A.', ticker: 'IBE', sector: 'utilities' as IndustrySector },
  { name: 'BBVA (Banco Bilbao Vizcaya Argentaria)', ticker: 'BBVA', sector: 'financials' as IndustrySector },
  { name: 'Repsol, S.A.', ticker: 'REP', sector: 'energy' as IndustrySector },
  { name: 'Caixabank, S.A.', ticker: 'CABK', sector: 'financials' as IndustrySector },
  { name: 'Amadeus IT Group', ticker: 'AMS', sector: 'technology' as IndustrySector },
  { name: 'Ferrovial, S.A.', ticker: 'FER', sector: 'industrials' as IndustrySector },
  { name: 'ACS (Actividades de Construcción y Servicios)', ticker: 'ACS', sector: 'industrials' as IndustrySector },
  { name: 'Naturgy Energy Group', ticker: 'NTGY', sector: 'utilities' as IndustrySector },
  { name: 'Endesa, S.A.', ticker: 'ELE', sector: 'utilities' as IndustrySector },
  { name: 'Aena SME, S.A.', ticker: 'AENA', sector: 'industrials' as IndustrySector },
  { name: 'Merlin Properties SOCIMI', ticker: 'MRL', sector: 'realEstate' as IndustrySector },
  { name: 'Cellnex Telecom, S.A.', ticker: 'CLNX', sector: 'communication' as IndustrySector },
  { name: 'Grifols, S.A.', ticker: 'GRF', sector: 'healthcare' as IndustrySector },
  { name: 'Banco de Sabadell, S.A.', ticker: 'SAB', sector: 'financials' as IndustrySector },
  { name: 'Mapfre, S.A.', ticker: 'MAP', sector: 'financials' as IndustrySector },
  { name: 'Red Eléctrica Corporación', ticker: 'REE', sector: 'utilities' as IndustrySector },
  { name: 'Colonial (Inmobiliaria Colonial)', ticker: 'COL', sector: 'realEstate' as IndustrySector },
];

/**
 * Genera datos de empresas mock para su uso en la aplicación
 * @returns Array de objetos Company con datos simulados
 */
export const generateMockCompanies = (): Company[] => {
  const companies: Company[] = [];
  
  // Generar empresas de EE.UU. con datos consistentes
  usCompanies.forEach(companyData => {
    // Semilla basada en el ticker para generar valores consistentes
    faker.seed(companyData.ticker.charCodeAt(0) * 100);
    
    // Generar un ID consistente basado en el ticker
    const id = `company-${companyData.ticker.toLowerCase()}-${companyData.ticker.charCodeAt(0)}${companyData.ticker.length}`;
    
    companies.push({
      id,
      name: companyData.name,
      ticker: companyData.ticker,
      sector: companyData.sector,
      region: 'us',
      marketCap: faker.number.float({ min: 1000000000, max: 3000000000000, fractionDigits: 2 }),
      price: faker.number.float({ min: 10, max: 5000, fractionDigits: 2 }),
      dividendYield: faker.number.float({ min: 0, max: 6, fractionDigits: 2 }),
      volatility: faker.number.float({ min: 0.1, max: 0.8, fractionDigits: 2 }),
      historicalReturns: {
        '1m': faker.number.float({ min: -10, max: 10, fractionDigits: 2 }),
        '3m': faker.number.float({ min: -20, max: 30, fractionDigits: 2 }),
        '1y': faker.number.float({ min: -30, max: 100, fractionDigits: 2 }),
        '5y': faker.number.float({ min: -20, max: 400, fractionDigits: 2 }),
      },
      logoUrl: `https://asset.brandfetch.io/id${companyData.ticker.replace(/[^A-Za-z0-9]/g, '')}/logo`
    });
  });
  
  // Generar empresas españolas con datos consistentes
  spanishCompanies.forEach(companyData => {
    // Semilla basada en el ticker para generar valores consistentes
    faker.seed(companyData.ticker.charCodeAt(0) * 100);
    
    // Generar un ID consistente basado en el ticker
    const id = `company-${companyData.ticker.toLowerCase()}-${companyData.ticker.charCodeAt(0)}${companyData.ticker.length}`;
    
    companies.push({
      id,
      name: companyData.name,
      ticker: companyData.ticker,
      sector: companyData.sector,
      region: 'spain',
      marketCap: faker.number.float({ min: 500000000, max: 100000000000, fractionDigits: 2 }),
      price: faker.number.float({ min: 2, max: 500, fractionDigits: 2 }),
      dividendYield: faker.number.float({ min: 0, max: 8, fractionDigits: 2 }),
      volatility: faker.number.float({ min: 0.15, max: 0.6, fractionDigits: 2 }),
      historicalReturns: {
        '1m': faker.number.float({ min: -10, max: 10, fractionDigits: 2 }),
        '3m': faker.number.float({ min: -15, max: 20, fractionDigits: 2 }),
        '1y': faker.number.float({ min: -25, max: 50, fractionDigits: 2 }),
        '5y': faker.number.float({ min: -30, max: 200, fractionDigits: 2 }),
      },
      logoUrl: `https://asset.brandfetch.io/id${companyData.ticker.replace(/[^A-Za-z0-9]/g, '')}/logo`
    });
  });

  return companies;
};

/**
 * Filtra empresas según criterios específicos
 * @param companies Array de empresas a filtrar
 * @param filters Criterios de filtrado opcionales
 * @returns Array de empresas filtradas
 */
export const getFilteredCompanies = (
  companies: Company[],
  filters?: {
    sector?: IndustrySector[],
    region?: GeographicRegion[],
    minMarketCap?: number,
    maxMarketCap?: number,
    minDividendYield?: number,
    excludedSectors?: IndustrySector[]
  }
): Company[] => {
  if (!filters) return companies;
  
  return companies.filter(company => {
    // Filtrar por sector
    if (filters.sector && filters.sector.length > 0) {
      if (!filters.sector.includes(company.sector)) {
        return false;
      }
    }
    
    // Filtrar por sectores excluidos
    if (filters.excludedSectors && filters.excludedSectors.includes(company.sector)) {
      return false;
    }
    
    // Filtrar por región
    if (filters.region && filters.region.length > 0) {
      if (!filters.region.includes(company.region)) {
        return false;
      }
    }
    
    // Filtrar por capitalización de mercado
    if (filters.minMarketCap && company.marketCap < filters.minMarketCap) {
      return false;
    }
    if (filters.maxMarketCap && company.marketCap > filters.maxMarketCap) {
      return false;
    }
    
    // Filtrar por rendimiento de dividendos
    if (filters.minDividendYield && company.dividendYield < filters.minDividendYield) {
      return false;
    }
    
    return true;
  });
};

// Caché de empresas para mejorar el rendimiento
let companiesCache: Company[] | null = null;

/**
 * Borra el caché de empresas para forzar una nueva generación
 * Útil cuando se necesita garantizar IDs consistentes
 */
export const clearCompaniesCache = (): void => {
  companiesCache = null;
};

/**
 * Obtiene los datos de empresas, usando caché para optimizar el rendimiento
 * @returns Array de objetos Company
 */
export const getMockCompanies = (): Company[] => {
  if (!companiesCache) {
    companiesCache = generateMockCompanies();
    console.log("Generado nuevo caché de empresas con IDs consistentes");
  }
  return companiesCache;
}; 