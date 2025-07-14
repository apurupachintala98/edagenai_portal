// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   LabelList,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts';

// interface DashboardChartProps {
//   data: Array<{
//     name: string;
//     value: number;
//     value2?: number;
//     color?: string;
//     color2?: string;
//   }>;
//   isCurrency?: boolean;
// }

// const DashboardChart = ({ data, isCurrency = false }: DashboardChartProps) => {
//   const formatValue = (value: number) => {
//     const rounded = Math.round(value);
//     return isCurrency ? `$${rounded.toLocaleString()}` : rounded.toLocaleString();
//   };

//   return (
//     <div className="dashboard-card h-full animate-scale-in">
//       <div className="dashboard-card-header" />
//       <div className="dashboard-card-content h-[235px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
//             barCategoryGap={10}
//           >
//             <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
//             <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
//             <YAxis 
//               tickLine={false} 
//               axisLine={false} 
//               fontSize={12}
//               tickFormatter={(value) => formatValue(value)} // <-- Added tickFormatter
//             />
//             <Tooltip
//               formatter={(value: number) => formatValue(value)}
//               contentStyle={{
//                 backgroundColor: 'hsl(var(--background))',
//                 borderColor: 'hsl(var(--border))',
//                 borderRadius: '0.5rem',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
//               }}
//             />
//             <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color || 'hsl(var(--brand-blue))'} />
//               ))}
//               <LabelList 
//                 dataKey="value" 
//                 position="top" 
//                 formatter={(value: any) => formatValue(value as number)}
//                 fontSize={12}
//               />
//             </Bar>
//             {data[0]?.value2 !== undefined && (
//               <Bar dataKey="value2" radius={[4, 4, 0, 0]} barSize={50}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell2-${index}`} fill={entry.color2 || 'hsl(var(--brand-teal))'} />
//                 ))}
//                 <LabelList 
//                   dataKey="value2" 
//                   position="top" 
//                   formatter={(value: any) => formatValue(value as number)}
//                   fontSize={12}
//                 />
//               </Bar>
//             )}
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default DashboardChart;
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
} from 'recharts';

interface DashboardChartProps {
  data: Array<Record<string, any>>;
  isCurrency?: boolean;
}

const DashboardChart = ({ data, isCurrency = false }: DashboardChartProps) => {
  const formatValue = (value: number) => {
    const rounded = Math.round(value);
    return isCurrency ? `$${rounded.toLocaleString()}` : rounded.toLocaleString();
  };

  // Get all keys except 'name' and 'color' fields
  const keys = data?.length > 0
    ? Object.keys(data[0]).filter(
        (key) => key !== 'name' && !key.startsWith('color')
      )
    : [];

  const colorMap: Record<string, string> = {};

  // Assign color from color fields like color, color2, etc.
  keys.forEach((key) => {
    const colorKey = `color${key === 'value' ? '' : keys.indexOf(key) + 1}`;
    const colorFromData = data.find((d) => d[colorKey]);
    if (colorFromData && colorFromData[colorKey]) {
      colorMap[key] = colorFromData[colorKey];
    }
  });

  return (
    <div className="dashboard-card h-full animate-scale-in">
      <div className="dashboard-card-header" />
      <div className="dashboard-card-content h-[235px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            barCategoryGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => formatValue(value)}
            />
            <Tooltip
              formatter={(value: number) => formatValue(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              }}
            />
            {keys.map((key, idx) => (
              <Bar
                key={key}
                dataKey={key}
                radius={[4, 4, 0, 0]}
                barSize={50 / keys.length}
                stackId={undefined} // Optional: add "stackId" if you want stacked bars
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${key}-${index}`}
                    fill={
                      colorMap[key] ||
                      ['#8884d8', '#82ca9d', '#ffc658'][idx % 3] // fallback colors
                    }
                  />
                ))}
                <LabelList
                  dataKey={key}
                  position="top"
                  formatter={(value: any) => formatValue(value as number)}
                  fontSize={12}
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
