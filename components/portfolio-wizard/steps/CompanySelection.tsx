"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard-store';
import { getMockCompanies, clearCompaniesCache } from '@/lib/mock/mock-companies';
import { filterCompanies, CompanyFilterOptions } from '@/lib/data/company-filters';
import { Company, GeographicRegion, IndustrySector } from '@/types/portfolio.types';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import CompanyFilters from './CompanyFilters';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

const CompanySelection = () => {
  // Limpiar caché para asegurar IDs consistentes
  clearCompaniesCache();
  
  const { selectedCompanies, toggleCompanySelection, excludedSectors, nextStep } = usePortfolioWizardStore();
  const allCompanies = useMemo(() => getMockCompanies(), []);
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<CompanyFilterOptions>({
    excludedSectors
  });
  
  // Apply filters whenever filterOptions or globalFilter changes
  const companies = useMemo(() => {
    return filterCompanies(allCompanies, {
      ...filterOptions,
      searchQuery: globalFilter
    });
  }, [allCompanies, filterOptions, globalFilter]);
  
  // Update excluded sectors when they change in the store
  useEffect(() => {
    setFilterOptions(prev => ({
      ...prev,
      excludedSectors
    }));
  }, [excludedSectors]);
  
  // Handle filter changes from CompanyFilters component
  const handleFiltersChange = (filters: CompanyFilterOptions) => {
    setFilterOptions(prev => ({
      ...prev,
      ...filters,
      excludedSectors // Always keep the excluded sectors from the store
    }));
  };

  // Define table columns
  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      {
        id: 'select',
        header: () => null,
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
            Company
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const company = row.original;
          return (
            <div>
              <div className="font-medium">{company.name}</div>
              <div className="text-sm text-gray-500">{company.ticker}</div>
            </div>
          );
        },
      },
      {
        accessorKey: 'sector',
        header: ({ column }) => (
          <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
            Sector
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const sector = row.getValue('sector') as IndustrySector;
          return (
            <div className="capitalize">
              {sector.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          );
        },
      },
      {
        accessorKey: 'region',
        header: ({ column }) => (
          <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
            Region
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const region = row.getValue('region') as GeographicRegion;
          return <div className="capitalize">{region}</div>;
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const price = parseFloat(row.getValue('price'));
          return <div>{formatCurrency(price)}</div>;
        },
        sortingFn: 'basic',
      },
      {
        accessorKey: 'dividendYield',
        header: ({ column }) => (
          <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
            Dividend Yield
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const dividendYield = parseFloat(row.getValue('dividendYield'));
          return <div>{(dividendYield * 100).toFixed(2)}%</div>;
        },
        sortingFn: 'basic',
      },
      {
        accessorKey: 'volatility',
        header: ({ column }) => (
          <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
            Volatility
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const volatility = parseFloat(row.getValue('volatility'));
          return <div>{(volatility * 100).toFixed(2)}%</div>;
        },
        sortingFn: 'basic',
      },
    ],
    []
  );
  
  // Set up the table
  const table = useReactTable({
    data: companies,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection: Object.fromEntries(
        selectedCompanies.map(id => {
          const index = companies.findIndex(c => c.id === id);
          return index !== -1 ? [index, true] : [];
        }).filter(arr => arr.length > 0)
      ),
    },
    enableRowSelection: row => {
      // Disable selection if we already have 20 companies selected
      // and this one isn't already selected
      const companyId = row.original.id;
      const isAlreadySelected = selectedCompanies.includes(companyId);
      
      return isAlreadySelected || selectedCompanies.length < 20;
    },
    onRowSelectionChange: (updater) => {
      const currentState = table.getState().rowSelection;
      const newState = typeof updater === 'function' ? updater(currentState) : updater;
      
      // Update selectedCompanies in the store based on the selection
      Object.entries(newState).forEach(([rowIndex, isSelected]) => {
        const companyId = companies[Number(rowIndex)].id;
        const isAlreadySelected = selectedCompanies.includes(companyId);
        
        if (isSelected && !isAlreadySelected) {
          toggleCompanySelection(companyId);
        } else if (!isSelected && isAlreadySelected) {
          toggleCompanySelection(companyId);
        }
      });
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    enableMultiSort: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Filters sidebar */}
      <div className="md:col-span-1">
        <CompanyFilters onFiltersChange={handleFiltersChange} />
      </div>
      
      {/* Table content */}
      <div className="md:col-span-3 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Select Companies</h2>
          <span className="text-sm text-gray-500">
            {selectedCompanies.length} of 20 companies selected
          </span>
        </div>

        <div className="flex items-center py-4">
          <Input
            placeholder="Search companies..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          {selectedCompanies.length >= 20 && (
            <div className="ml-2 text-sm text-amber-600">
              Maximum of 20 companies reached
            </div>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b-2 border-gray-200 dark:border-gray-700">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-semibold text-gray-800 dark:text-gray-200 py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={
                      !row.getCanSelect() 
                        ? "opacity-50 cursor-not-allowed" 
                        : "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                    onClick={() => {
                      if (row.getCanSelect()) {
                        row.toggleSelected(!row.getIsSelected());
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySelection; 