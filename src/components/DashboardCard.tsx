import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  className?: string;
}

export default function DashboardCard({ title, value, icon, trend, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {trend !== undefined && (
            <div className={`flex items-center mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <span className="text-sm">
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-xs ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
