import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

interface DashboardChartProps {
  data: Array<{
    NAME: string;
    SLVR: number;
    GLD: number;
    PLAT: number;
  }>;
}

const MultipleBarChart = ({ data }: DashboardChartProps) => {
 
  // Convert field names for better readability
  const formattedData = data.map((item) => ({
    name: item.NAME,
    Silver: item.SLVR,
    Gold: item.GLD,
    Platinum: item.PLAT,
  }));

  const keys = ['Silver', 'Gold', 'Platinum'];
  const colorMap: Record<string, string> = {
    Silver: '#8884d8',
    Gold: '#82ca9d',
    Platinum: '#ffc658',
  };

  return (
    <div className="dashboard-card h-full animate-scale-in">
      <div className="dashboard-card-header" />
      <div className="dashboard-card-content h-[235px]">
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            barCategoryGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
            />
            <Legend />
            {keys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colorMap[key]}
                radius={[4, 4, 0, 0]}
                barSize={50 / keys.length}
              >
                <LabelList
                  dataKey={key}
                  position="top"
                  fontSize={12}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer> */}
        <div style={{ height: 300, backgroundColor: '#f9f9f9' }}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={formattedData}
      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Silver" fill="#8884d8" />
      <Bar dataKey="Gold" fill="#82ca9d" />
      <Bar dataKey="Platinum" fill="#ffc658" />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
};

export default MultipleBarChart;
