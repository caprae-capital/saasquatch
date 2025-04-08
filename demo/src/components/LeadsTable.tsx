import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Lead, Project } from '../types';

const columnHelper = createColumnHelper<Lead>();

interface LeadsTableProps {
  data: Lead[];
  projects: Project[];
  selectedProject: string;
  onProjectChange: (projectId: string) => void;
}

export function LeadsTable({ data: initialData, projects, selectedProject, onProjectChange }: LeadsTableProps) {
  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    columnHelper.accessor('grade', {
      header: 'Grade',
      cell: info => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          info.getValue() === 'green' ? 'bg-emerald-100 text-emerald-800' :
          info.getValue() === 'yellow' ? 'bg-amber-100 text-amber-800' :
          info.getValue() === 'red' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {info.getValue() || 'Ungraded'}
        </span>
      ),
    }),
    columnHelper.accessor('company', {
      header: 'Company',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('decisionMaker', {
      header: 'CEO/Decision Maker',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('website', {
      header: 'Website',
      cell: info => (
        <a href={`https://${info.getValue()}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('industry', {
      header: 'Industry',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('productCategory', {
      header: 'Product/Service Category',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('businessType', {
      header: 'Business Type',
      cell: info => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('internName', {
      header: 'Intern Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('headquarters', {
      header: 'Headquarters',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('employees', {
      header: 'Employees',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('revenue', {
      header: 'Revenue',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('revenueSource', {
      header: 'Rev Source',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('linkedIn', {
      header: 'LinkedIn',
      cell: info => (
        <a href={`https://${info.getValue()}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          View
        </a>
      ),
    }),
    columnHelper.accessor('yearFounded', {
      header: 'Year Founded',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('ownerLinkedIn', {
      header: "Owner's LinkedIn",
      cell: info => (
        <a href={`https://${info.getValue()}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          View
        </a>
      ),
    }),
    columnHelper.accessor('ownerAge', {
      header: 'Owner Age',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-bold text-gray-900">Leads</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                      {headerGroup.headers.map(header => (
                        <th 
                          key={header.id} 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      {row.getVisibleCells().map(cell => (
                        <td 
                          key={cell.id} 
                          className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}