"use client";

import React, { useState } from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { IndustrySector, GeographicRegion } from '@/types/portfolio.types';
import { CompanyFilterOptions } from '@/lib/data/company-filters';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

// Define sector display names
const sectorDisplayNames: Record<IndustrySector, string> = {
  technology: 'Technology',
  healthcare: 'Healthcare',
  financials: 'Financials',
  consumerDiscretionary: 'Consumer Discretionary',
  consumerStaples: 'Consumer Staples',
  industrials: 'Industrials',
  energy: 'Energy',
  materials: 'Materials',
  utilities: 'Utilities',
  realEstate: 'Real Estate',
  communication: 'Communication'
};

// Define region display names
const regionDisplayNames: Record<GeographicRegion, string> = {
  us: 'United States',
  europe: 'Europe',
  spain: 'Spain',
  latam: 'Latin America',
  asia: 'Asia',
  other: 'Other Regions'
};

interface CompanyFiltersProps {
  onFiltersChange: (filters: CompanyFilterOptions) => void;
}

export const CompanyFilters = ({ onFiltersChange }: CompanyFiltersProps) => {
  const { excludedSectors, toggleSectorExclusion } = usePortfolioWizardStore();
  
  // Local filter state
  const [selectedSectors, setSelectedSectors] = useState<IndustrySector[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<GeographicRegion[]>([]);
  const [marketCapRange, setMarketCapRange] = useState<[number, number]>([0, 1000]);
  const [minDividendYield, setMinDividendYield] = useState<number>(0);
  const [maxVolatility, setMaxVolatility] = useState<number>(100); // 100% volatility
  
  // Update filters in parent component
  const updateFilters = () => {
    onFiltersChange({
      sectors: selectedSectors.length > 0 ? selectedSectors : undefined,
      regions: selectedRegions.length > 0 ? selectedRegions : undefined,
      minMarketCap: marketCapRange[0] > 0 ? marketCapRange[0] * 1_000_000_000 : undefined,
      maxMarketCap: marketCapRange[1] < 1000 ? marketCapRange[1] * 1_000_000_000 : undefined,
      minDividendYield: minDividendYield > 0 ? minDividendYield / 100 : undefined,
      maxVolatility: maxVolatility < 100 ? maxVolatility / 100 : undefined,
    });
  };
  
  // Handle sector selection
  const handleSectorChange = (sector: IndustrySector, checked: boolean) => {
    setSelectedSectors(prev => {
      const newSectors = checked 
        ? [...prev, sector]
        : prev.filter(s => s !== sector);
      
      return newSectors;
    });
    
    // Update filters after state change
    setTimeout(updateFilters, 0);
  };
  
  // Handle region selection
  const handleRegionChange = (region: GeographicRegion, checked: boolean) => {
    setSelectedRegions(prev => {
      const newRegions = checked 
        ? [...prev, region]
        : prev.filter(r => r !== region);
      
      return newRegions;
    });
    
    // Update filters after state change
    setTimeout(updateFilters, 0);
  };
  
  // Handle market cap range change
  const handleMarketCapChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setMarketCapRange(range);
    
    // Update filters
    setTimeout(updateFilters, 0);
  };
  
  // Handle dividend yield change
  const handleDividendYieldChange = (value: number[]) => {
    const yield_value = value[0];
    setMinDividendYield(yield_value);
    
    // Update filters
    setTimeout(updateFilters, 0);
  };
  
  // Handle volatility change
  const handleVolatilityChange = (value: number[]) => {
    const volatility = value[0];
    setMaxVolatility(volatility);
    
    // Update filters
    setTimeout(updateFilters, 0);
  };
  
  // Handle sector exclusion
  const handleSectorExclusion = (sector: IndustrySector) => {
    toggleSectorExclusion(sector);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSectors([]);
    setSelectedRegions([]);
    setMarketCapRange([0, 1000]);
    setMinDividendYield(0);
    setMaxVolatility(100);
    onFiltersChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
      
      {/* Active filters */}
      <div className="flex flex-wrap gap-2">
        {selectedSectors.map(sector => (
          <Badge 
            key={sector} 
            variant="secondary"
            className="flex items-center gap-1"
          >
            {sectorDisplayNames[sector]}
            <button
              onClick={() => handleSectorChange(sector, false)}
              className="ml-1 h-3 w-3 rounded-full"
            >
              ×
            </button>
          </Badge>
        ))}
        
        {selectedRegions.map(region => (
          <Badge 
            key={region} 
            variant="secondary"
            className="flex items-center gap-1"
          >
            {regionDisplayNames[region]}
            <button
              onClick={() => handleRegionChange(region, false)}
              className="ml-1 h-3 w-3 rounded-full"
            >
              ×
            </button>
          </Badge>
        ))}
        
        {marketCapRange[0] > 0 && (
          <Badge variant="secondary">
            Min. Market Cap: ${marketCapRange[0]}B
          </Badge>
        )}
        
        {marketCapRange[1] < 1000 && (
          <Badge variant="secondary">
            Max. Market Cap: ${marketCapRange[1]}B
          </Badge>
        )}
        
        {minDividendYield > 0 && (
          <Badge variant="secondary">
            Min. Dividend: {minDividendYield}%
          </Badge>
        )}
        
        {maxVolatility < 100 && (
          <Badge variant="secondary">
            Max. Volatility: {maxVolatility}%
          </Badge>
        )}
      </div>
      
      <Accordion type="multiple" className="w-full">
        {/* Sector filter */}
        <AccordionItem value="sectors">
          <AccordionTrigger>Sectors</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(sectorDisplayNames).map(([key, name]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`sector-${key}`}
                    checked={selectedSectors.includes(key as IndustrySector)}
                    onCheckedChange={(checked) => 
                      handleSectorChange(key as IndustrySector, checked === true)
                    }
                  />
                  <Label 
                    htmlFor={`sector-${key}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Region filter */}
        <AccordionItem value="regions">
          <AccordionTrigger>Regions</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(regionDisplayNames).map(([key, name]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`region-${key}`}
                    checked={selectedRegions.includes(key as GeographicRegion)}
                    onCheckedChange={(checked) => 
                      handleRegionChange(key as GeographicRegion, checked === true)
                    }
                  />
                  <Label 
                    htmlFor={`region-${key}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Market Cap filter */}
        <AccordionItem value="marketCap">
          <AccordionTrigger>Market Capitalization</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>${marketCapRange[0]}B</span>
                <span>${marketCapRange[1] === 1000 ? '1T+' : `${marketCapRange[1]}B`}</span>
              </div>
              <Slider 
                min={0}
                max={1000}
                step={10}
                value={[marketCapRange[0], marketCapRange[1]]}
                onValueChange={handleMarketCapChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Dividend Yield filter */}
        <AccordionItem value="dividendYield">
          <AccordionTrigger>Dividend Yield</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Min: {minDividendYield}%</span>
              </div>
              <Slider 
                min={0}
                max={10}
                step={0.1}
                value={[minDividendYield]}
                onValueChange={handleDividendYieldChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Volatility filter */}
        <AccordionItem value="volatility">
          <AccordionTrigger>Volatility</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Max: {maxVolatility}%</span>
              </div>
              <Slider 
                min={0}
                max={100}
                step={5}
                value={[maxVolatility]}
                onValueChange={handleVolatilityChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Excluded Sectors */}
        <AccordionItem value="excludedSectors">
          <AccordionTrigger>Excluded Sectors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Sectors marked here will be completely excluded from your portfolio
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(sectorDisplayNames).map(([key, name]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`excluded-sector-${key}`}
                      checked={excludedSectors.includes(key as IndustrySector)}
                      onCheckedChange={() => 
                        handleSectorExclusion(key as IndustrySector)
                      }
                    />
                    <Label 
                      htmlFor={`excluded-sector-${key}`}
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CompanyFilters; 