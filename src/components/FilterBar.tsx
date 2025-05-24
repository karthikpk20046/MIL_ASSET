import { useState } from 'react';
import { bases } from '../data/mockData';
import { format } from 'date-fns';

interface FilterBarProps {
  onFilterChange: (filters: {
    base: string;
    equipmentType: string;
    dateRange: [string, string];
  }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [base, setBase] = useState('all');
  const [equipmentType, setEquipmentType] = useState('all');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleFilterChange = () => {
    onFilterChange({
      base,
      equipmentType,
      dateRange: [startDate, endDate],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="base" className="block text-sm font-medium text-gray-700 mb-1">
            Base
          </label>
          <select
            id="base"
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          >
            <option value="all">All Bases</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>
                {base.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700 mb-1">
            Equipment Type
          </label>
          <select
            id="equipmentType"
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="vehicle">Vehicles</option>
            <option value="weapon">Weapons</option>
            <option value="ammunition">Ammunition</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleFilterChange}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
