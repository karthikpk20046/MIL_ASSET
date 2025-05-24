import { useState, useEffect } from 'react';
import { ArrowLeftRight, Clipboard, Package, ShieldAlert, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import FilterBar from '../components/FilterBar';
import { calculateBalanceData } from '../data/mockData';
import { BalanceData } from '../types';

export default function Dashboard() {
  const [filters, setFilters] = useState({
    base: 'base1',
    equipmentType: 'all',
    dateRange: ['2023-01-01', '2023-12-31'] as [string, string],
  });

  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const data = calculateBalanceData(
      filters.base,
      filters.dateRange[0],
      filters.dateRange[1]
    );
    setBalanceData(data);
  }, [filters]);

  const handleFilterChange = (newFilters: {
    base: string;
    equipmentType: string;
    dateRange: [string, string];
  }) => {
    setFilters(newFilters);
  };

  // Chart data for assets movement
  const movementChartData = [
    { name: 'Purchases', value: balanceData?.purchases || 0 },
    { name: 'Transfers In', value: balanceData?.transfersIn || 0 },
    { name: 'Transfers Out', value: balanceData?.transfersOut || 0 },
    { name: 'Assigned', value: balanceData?.assigned || 0 },
    { name: 'Expended', value: balanceData?.expended || 0 },
  ];

  if (!balanceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Asset Management Dashboard</h1>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Opening Balance"
          value={balanceData.opening.toLocaleString()}
          icon={<Clipboard size={24} />}
        />
        <DashboardCard
          title="Closing Balance"
          value={balanceData.closing.toLocaleString()}
          icon={<Package size={24} />}
        />
        <DashboardCard
          title="Net Movement"
          value={balanceData.netMovement.toLocaleString()}
          trend={5}
          icon={<TrendingUp size={24} />}
        />
        <DashboardCard
          title="Assets Expended"
          value={balanceData.expended.toLocaleString()}
          trend={-3}
          icon={<ShieldAlert size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Asset Movement Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={movementChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Asset Movement Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Purchases</span>
              <span className="font-semibold text-green-600">+{balanceData.purchases.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Transfers In</span>
              <span className="font-semibold text-green-600">+{balanceData.transfersIn.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Transfers Out</span>
              <span className="font-semibold text-red-600">-{balanceData.transfersOut.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Assigned</span>
              <span className="font-semibold">{balanceData.assigned.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expended</span>
              <span className="font-semibold text-red-600">-{balanceData.expended.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
