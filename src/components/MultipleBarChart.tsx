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
  NAME: string;
  SLVR: number;
  GLD: number;
  PLAT: number;
}

interface MultipleBarChartProps {
  data: DataItem[];
}

const MultipleBarChart: React.FC<MultipleBarChartProps> = ({ data }) => {
  const formattedData = data.map((item: DataItem) => ({
    name: item.NAME,
    Silver: item.SLVR,
    Gold: item.GLD,
    Platinum: item.PLAT,
  }));

  console.log(formattedData);

  return (
    <div style={{ height: 300 }}>
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
  );
};

export default MultipleBarChart;
