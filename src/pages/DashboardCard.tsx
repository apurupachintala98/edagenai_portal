
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  subheading?: string;
}

const DashboardCard = ({ title, subheading, children }: DashboardCardProps) => {
  return (
    <div className="dashboard-card h-full animate-scale-in">
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        {subheading && (
          <div className="bg-yellow-200 text-sm px-4 py-2 rounded-md flex items-center gap-2 w-fit">
            <span className="bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
            {subheading}
          </div>
        )}
      </div>
      <div className="dashboard-card-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
