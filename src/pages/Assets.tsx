import { useState, useEffect } from 'react';
import { getAssetsByBase, bases } from '../data/mockData';
import { Asset } from '../types';
import FilterBar from '../components/FilterBar';

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filters, setFilters] = useState({
    base: 'all',
    equipmentType: 'all',
    dateRange: ['2023-01-01', '2023-12-31'] as [string, string],
  });

  useEffect(() => {
    // In a real app, this would be an API call with the filters
    let filteredAssets: Asset[] = [];
    
    if (filters.base === 'all') {
      // Get assets from all bases
      filteredAssets = [...getAssetsByBase('base1'), ...getAssetsByBase('base2'), 
                       ...getAssetsByBase('base3'), ...getAssetsByBase('base4')];
    } else {
      filteredAssets = getAssetsByBase(filters.base);
    }
    
    // Apply equipment type filter if not 'all'
    if (filters.equipmentType !== 'all') {
      filteredAssets = filteredAssets.filter(
        asset => asset.category === filters.equipmentType
      );
    }
    
    setAssets(filteredAssets);
  }, [filters]);

  const handleFilterChange = (newFilters: {
    base: string;
    equipmentType: string;
    dateRange: [string, string];
  }) => {
    setFilters(newFilters);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'expended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBaseName = (baseId: string) => {
    const base = bases.find(b => b.id === baseId);
    return base ? base.name : 'Unknown Base';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Asset Inventory</h1>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                    <div className="text-sm text-gray-500">{asset.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{asset.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.quantity.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getBaseName(asset.base)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
