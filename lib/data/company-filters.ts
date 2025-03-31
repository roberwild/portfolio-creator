import { Company, IndustrySector, GeographicRegion } from '@/types/portfolio.types';

export interface CompanyFilterOptions {
  sectors?: IndustrySector[];
  excludedSectors?: IndustrySector[];
  regions?: GeographicRegion[];
  minMarketCap?: number;
  maxMarketCap?: number;
  minDividendYield?: number;
  maxVolatility?: number;
  searchQuery?: string;
}

/**
 * Filters companies based on provided criteria
 * @param companies List of companies to filter
 * @param filters Filter criteria
 * @returns Filtered list of companies
 */
export function filterCompanies(
  companies: Company[], 
  filters: CompanyFilterOptions
): Company[] {
  if (!filters || Object.keys(filters).length === 0) {
    return companies;
  }
  
  return companies.filter(company => {
    // Filter by sector inclusion
    if (filters.sectors && filters.sectors.length > 0) {
      if (!filters.sectors.includes(company.sector)) {
        return false;
      }
    }
    
    // Filter by sector exclusion
    if (filters.excludedSectors && filters.excludedSectors.length > 0) {
      if (filters.excludedSectors.includes(company.sector)) {
        return false;
      }
    }
    
    // Filter by region
    if (filters.regions && filters.regions.length > 0) {
      if (!filters.regions.includes(company.region)) {
        return false;
      }
    }
    
    // Filter by market capitalization
    if (filters.minMarketCap && company.marketCap < filters.minMarketCap) {
      return false;
    }
    
    if (filters.maxMarketCap && company.marketCap > filters.maxMarketCap) {
      return false;
    }
    
    // Filter by dividend yield
    if (filters.minDividendYield && company.dividendYield < filters.minDividendYield) {
      return false;
    }
    
    // Filter by volatility
    if (filters.maxVolatility && company.volatility > filters.maxVolatility) {
      return false;
    }
    
    // Filter by search query (match name or ticker)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = company.name.toLowerCase().includes(query);
      const matchesTicker = company.ticker.toLowerCase().includes(query);
      
      if (!matchesName && !matchesTicker) {
        return false;
      }
    }
    
    // Company passed all filters
    return true;
  });
}

/**
 * Gets a list of companies filtered by an excluded sectors list
 * Useful for providing portfolio suggestions that respect user preferences
 */
export function getCompaniesExcludingSectors(
  companies: Company[],
  excludedSectors: IndustrySector[]
): Company[] {
  if (!excludedSectors || excludedSectors.length === 0) {
    return companies;
  }
  
  return companies.filter(company => !excludedSectors.includes(company.sector));
}

/**
 * Gets company suggestions based on risk profile and other criteria
 * @param companies Available companies
 * @param riskProfile User's risk profile
 * @param excludedSectors Sectors to exclude
 * @param limit Maximum number of suggestions
 * @returns Suggested companies
 */
export function getSuggestedCompanies(
  companies: Company[],
  riskProfile: string,
  excludedSectors: IndustrySector[] = [],
  limit: number = 10
): Company[] {
  // Filter out excluded sectors
  const availableCompanies = getCompaniesExcludingSectors(companies, excludedSectors);
  
  // Determine volatility thresholds based on risk profile
  let maxVolatility = 1.0; // Allow all by default
  
  switch (riskProfile) {
    case 'conservative':
      maxVolatility = 0.25;
      break;
    case 'moderate':
      maxVolatility = 0.4;
      break;
    case 'balanced':
      maxVolatility = 0.6;
      break;
    case 'growth':
      maxVolatility = 0.75;
      break;
    // For aggressive, allow all volatilities
  }
  
  // Filter companies based on volatility
  const filtered = availableCompanies.filter(
    company => company.volatility <= maxVolatility
  );
  
  // Sort by a combined score of risk-adjusted returns
  // Higher for more aggressive profiles, lower for conservative
  const sortedCompanies = [...filtered].sort((a, b) => {
    const scoreA = calculateCompanyScore(a, riskProfile);
    const scoreB = calculateCompanyScore(b, riskProfile);
    return scoreB - scoreA; // Descending order
  });
  
  // Return the top N companies
  return sortedCompanies.slice(0, limit);
}

/**
 * Calculate a score for a company based on risk profile
 * This is a simplified model that weighs different factors
 * based on the risk profile
 */
function calculateCompanyScore(company: Company, riskProfile: string): number {
  // Extract metrics
  const { dividendYield, volatility, historicalReturns } = company;
  const yearReturn = historicalReturns['1y'];
  
  // Base weights
  let dividendWeight = 1;
  let volatilityWeight = -1; // Negative because lower volatility is better
  let returnWeight = 1;
  
  // Adjust weights based on risk profile
  switch (riskProfile) {
    case 'conservative':
      dividendWeight = 3;
      volatilityWeight = -3;
      returnWeight = 0.5;
      break;
    case 'moderate':
      dividendWeight = 2;
      volatilityWeight = -2;
      returnWeight = 1;
      break;
    case 'balanced':
      dividendWeight = 1;
      volatilityWeight = -1;
      returnWeight = 1.5;
      break;
    case 'growth':
      dividendWeight = 0.5;
      volatilityWeight = -0.5;
      returnWeight = 2;
      break;
    case 'aggressive':
      dividendWeight = 0.2;
      volatilityWeight = 0; // Ignores volatility for aggressive
      returnWeight = 3;
      break;
  }
  
  // Calculate final score
  return (
    dividendWeight * dividendYield * 100 +
    volatilityWeight * volatility +
    returnWeight * yearReturn
  );
} 