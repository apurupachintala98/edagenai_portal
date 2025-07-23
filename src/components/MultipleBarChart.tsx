/* eslint-disable react/prop-types */
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

interface DataItem {
  name: string;
  slvr: number;
  gld: number;
  plat: number;
}

interface MultipleBarChartProps {
  data: DataItem[];
}

const MultipleBarChart: React.FC<MultipleBarChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    name: item.name,
    Silver: item.slvr,
    Gold: item.gld,
    Platinum: item.plat,
  }));

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Silver" fill="#1e5ae6" />
          <Bar dataKey="Gold" fill="#17a19c" />
          <Bar dataKey="Platinum" fill="#64748b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultipleBarChart;
