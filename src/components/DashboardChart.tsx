import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface DashboardChartProps {
  data: Array<{
    name: string;
    value: number;
    value2?: number;
    color?: string;
    color2?: string;
  }>;
}

const DashboardChart = ({ data}: DashboardChartProps) => {
  return (
    <div className="dashboard-card h-full animate-scale-in">
      <div className="dashboard-card-header">
      </div>
      <div className="dashboard-card-content h-[235px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            barCategoryGap={10} // Adjusts space between categories
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || 'hsl(var(--brand-blue))'} />
              ))}
            </Bar>
            {data[0]?.value2 !== undefined && (
              <Bar dataKey="value2" radius={[4, 4, 0, 0]} barSize={50}>
                {data.map((entry, index) => (
                  <Cell key={`cell2-${index}`} fill={entry.color2 || 'hsl(var(--brand-teal))'} />
                ))}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default DashboardChart;
