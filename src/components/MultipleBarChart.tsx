import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface MultipleBarChartProps {
  data: Array<{
    NAME: string;
    SLVR: number;
    GLD: number;
    PLAT: number;
  }>;
}

function MultipleBarChart({ data }: MultipleBarChartProps) {
  // Transform keys to lowercase or more readable labels if needed
  const formattedData = data.map((item) => ({
    name: item.NAME,
    uv: item.SLVR,
    pv: item.GLD,
    amt: item.PLAT,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Silver" fill="#8884d8" />
        <Bar dataKey="Gold" fill="#82ca9d" />
        <Bar dataKey="Platinum" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MultipleBarChart;
