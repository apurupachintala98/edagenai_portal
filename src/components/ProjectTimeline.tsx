// import Highcharts from "highcharts";
// import HighchartsGantt from "highcharts/modules/gantt";
// import HighchartsReact from "highcharts-react-official";
// import React, { useState, useEffect, useMemo } from "react";
// import { Category } from "@carbon/icons-react";
// import ApiService from "../services/ApiService";

// if (typeof HighchartsGantt === "function") {
//   HighchartsGantt(Highcharts);
// }

// interface ProjectTimelineProps {
//   selectedFilters: {
//     managers: any[];
//     platforms: any[];
//     phases: any[];
//   };
//   showAllYears: boolean;
// }


// const ProjectTimeline = ({ selectedFilters, showAllYears }: ProjectTimelineProps) => {
//   const [seriesData, setSeriesData] = useState<any[]>([]);
//   const [originalSeriesData, setOriginalSeriesData] = useState<any[]>([]);

//   // useEffect(() => {
//   //   const fetchGanttData = async () => {
//   //     try {
//   //       const apiData = await ApiService.getAllDetailsGanttChart();
//   //       console.log(apiData);

//   //       const mappedData = apiData.map((item: any, index: number) => {
//   //         const baseItem = {
//   //           start: item.START_DT,
//   //           end: item.END_DT,
//   //           name: item.NAME,
//   //           assignee: item.ASSIGNEE,
//   //           status: item.STATUS,
//   //           y: index,
//   //         };

//   //         if (item.STATUS === "Completed") {
//   //           return { ...baseItem, milestone: true };
//   //         }

//   //         return baseItem;
//   //       });

//   //       setSeriesData(mappedData);
//   //       console.log(mappedData);
//   //     } catch (error) {
//   //       console.error("Failed to fetch Gantt chart data:", error);
//   //     }
//   //   };

//   //   fetchGanttData();
//   // }, []);

//   useEffect(() => {
//     const fetchGanttData = async () => {
//       try {
//         const apiData = await ApiService.getAllDetailsGanttChart();
//         console.log(apiData);
  
//         const filteredData = apiData
//           .filter((item: any) => {
//             const matchesManager = selectedFilters.managers.length === 0 || selectedFilters.managers.some(manager => manager.label === item.ASSIGNEE);
//             const matchesPlatform = selectedFilters.platforms.length === 0 || selectedFilters.platforms.some(platform => platform.label === item.PLATFORM);
//             const matchesPhase = selectedFilters.phases.length === 0 || selectedFilters.phases.some(phase => phase.label === item.STATUS);
//             return matchesManager && matchesPlatform && matchesPhase;
//           })
//           .filter((item: any) => {
//             if (showAllYears) {
//               return true;
//             }
//             const startYear = new Date(item.START_DT).getFullYear();
//             return startYear === new Date().getFullYear(); 
//           });
  
//         const mappedData = filteredData.map((item: any, index: number) => {
//           const baseItem = {
//             start: item.START_DT,
//             end: item.END_DT,
//             name: item.NAME,
//             assignee: item.ASSIGNEE,
//             status: item.STATUS,
//             y: index,
//           };
//           if (item.STATUS === "Completed") {
//             return { ...baseItem, milestone: true };
//           }
//           return baseItem;
//         });
//         setOriginalSeriesData(mappedData);
//         setSeriesData(mappedData);
//         console.log(mappedData);
//       } catch (error) {
//         console.error("Failed to fetch Gantt chart data:", error);
//       }
//     };
  
//     fetchGanttData();
//   }, [selectedFilters, showAllYears]); 
  
//   const startDates = seriesData.map((task: any) => new Date(task.start).getTime());
//   const endDates = seriesData.map((task: any) => new Date(task.end).getTime());

//   const minDate = Math.min(...startDates);
//   const maxDate = Math.max(...endDates);

//   const ganttOptions = useMemo(() => ({
//     chart: {
//       type: "gantt",
//       height: (originalSeriesData.length + 1) * 48,
//     },
//     yAxis: {
//       uniqueNames: true,
//       min: 0,
//       max: originalSeriesData.length,
//       type: 'category',
//       grid: {
//         enabled: true,
//         borderColor: 'rgba(0,0,0,0.3)',
//         borderWidth: 1,
//         columns: [
//           {
//             title: { text: 'Task' },
//             labels: {
//               formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
//                 return seriesData[this.pos]?.name || '';
//               }
//             }
//           },
//           {
//             title: { text: 'Manager' },
//             labels: {
//               formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
//                 return seriesData[this.pos]?.assignee || '';
//               }
//             }
//           },
//           {
//             title: { text: 'Status' },
//             labels: {
//               useHTML: true,
//               formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
//                 const status = seriesData[this.pos]?.status || '';
//                 const statusColors: Record<string, string> = {
//                   'Completed': '#16a34a',
//                   'On-track': '#2563eb',
//                   'Delayed': '#dc2626',
//                 };
//                 const color = statusColors[status] || '#6b7280';
//                 return `<span style="
//                     display:inline-block;
//                     padding:2px 6px;
//                     border-radius:12px;
//                     background-color:${color}20;
//                     color:${color};
//                     font-size:11px;
//                   ">${status}</span>`;
//               }
//             }
//           }
//         ]
//       }
//     },
//     xAxis: {
//       min: minDate,
//       max: maxDate,
//       tickInterval: 30 * 24 * 3600 * 1000, // around 1 month
//       labels: {
//         format: '{value:%b}', // <-- Month only (Jan, Feb, etc.)
//         style: {
//           fontWeight: 'bold',
//         },
//       },
//       lineColor: '#bbb',
//       lineWidth: 1,
//       plotBackgroundColor: "#f5f5f5",
//     },
//     rangeSelector: {
//       enabled: true,
//       selected: 0
//   },

//     plotOptions: {
//       series: {
//         pointHeight: 48
//       }
//     },
//     series: [{
//       name: "Project Tasks",
//       data: seriesData,
//     }],
//   }), [seriesData]);


//   return (
//     <div className="mt-6 grid" style={{ margin: "0 20px 30px 20px" }}>
//       <div className="bg-white rounded-md shadow-sm overflow-x-auto" style={{ width: '100%', minHeight: '400px', maxHeight: '900px' }}>
//         <HighchartsReact
//           highcharts={Highcharts}
//           constructorType={"ganttChart"}
//           options={ganttOptions}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProjectTimeline;
import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect, useMemo } from "react";
import ApiService from "../services/ApiService";

if (typeof HighchartsGantt === "function") {
  HighchartsGantt(Highcharts);
}

const ProjectTimeline = ({ selectedFilters, showAllYears }: any) => {
  const [originalSeriesData, setOriginalSeriesData] = useState<any[]>([]);
  const [seriesData, setSeriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGanttData = async () => {
      try {
        const apiData = await ApiService.getAllDetailsGanttChart();

        const mappedData = apiData.map((item: any, index: number) => ({
          start: item.START_DT,
          end: item.END_DT,
          name: item.NAME,
          manager: item.MANAGER || item.ASSIGNEE || "", // manager or assignee fallback
          platform: item.PLATFORM || "",
          status: item.STATUS,
          y: index,
          ...(item.STATUS === "Completed" && { milestone: true }),
        }));

        setOriginalSeriesData(mappedData);
        setSeriesData(mappedData);
      } catch (error) {
        console.error("Failed to fetch Gantt chart data:", error);
      }
    };

    fetchGanttData();
  }, []);

  useEffect(() => {
    if (originalSeriesData.length === 0) return;

    let filtered = [...originalSeriesData];

    if (selectedFilters) {
      filtered = filtered.filter((item: any) => {
        const matchesManager = selectedFilters.managers.length === 0 || selectedFilters.managers.some((manager: { label: any; }) => manager.label === item.manager);
        const matchesPlatform = selectedFilters.platforms.length === 0 || selectedFilters.platforms.some((platform: { label: any; }) => platform.label === item.platform);
        const matchesPhase = selectedFilters.phases.length === 0 || selectedFilters.phases.some((phase: { label: any; }) => phase.label === item.status);
        return matchesManager && matchesPlatform && matchesPhase;
      });
    }

    if (!showAllYears) {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(item => new Date(item.start).getFullYear() === currentYear);
    }

    setSeriesData(filtered);
  }, [selectedFilters, showAllYears, originalSeriesData]);

  const minDate = useMemo(() => {
    const dates = originalSeriesData.map((item) => new Date(item.start).getTime());
    return dates.length ? Math.min(...dates) : Date.now();
  }, [originalSeriesData]);

  const maxDate = useMemo(() => {
    const dates = originalSeriesData.map((item) => new Date(item.end).getTime());
    return dates.length ? Math.max(...dates) : Date.now();
  }, [originalSeriesData]);

  const ganttOptions = useMemo(() => ({
    chart: {
      type: "gantt",
      height: (originalSeriesData.length + 1) * 48, // Fixed height based on original data
    },
    yAxis: {
      uniqueNames: true,
      min: 0,
      max: originalSeriesData.length,
      type: "category",
      grid: {
        enabled: true,
        borderColor: "rgba(0,0,0,0.3)",
        borderWidth: 1,
        columns: [
          {
            title: { text: "Task" },
            labels: {
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                return originalSeriesData[this.pos]?.name || "";
              }
            }
          },
          {
            title: { text: "Manager" },
            labels: {
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                return originalSeriesData[this.pos]?.manager || "";
              }
            }
          },
          {
            title: { text: "Status" },
            labels: {
              useHTML: true,
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                const status = originalSeriesData[this.pos]?.status || "";
                const statusColors: Record<string, string> = {
                  Completed: "#16a34a",
                  "On-track": "#2563eb",
                  Delayed: "#dc2626",
                  "On-Hold": "#f59e0b",
                  "Stability Issues": "#9333ea",
                  NA: "#6b7280",
                };
                const color = statusColors[status] || "#6b7280";
                return `<span style="
                  display:inline-block;
                  padding:2px 6px;
                  border-radius:12px;
                  background-color:${color}20;
                  color:${color};
                  font-size:11px;
                ">${status}</span>`;
              }
            }
          },
        ]
      }
    },
    xAxis: {
      min: minDate,
      max: maxDate,
      tickInterval: 30 * 24 * 3600 * 1000, // ~1 month
      labels: {
        format: "{value:%b %Y}",
        style: {
          fontWeight: "bold",
        },
      },
      lineColor: "#bbb",
      lineWidth: 1,
      plotBackgroundColor: "#f5f5f5",
    },
    plotOptions: {
      series: {
        pointHeight: 48,
      }
    },
    series: [
      {
        name: "Project Tasks",
        data: seriesData,
      }
    ]
  }), [seriesData, originalSeriesData, minDate, maxDate]);

  return (
    <div className="mt-6 grid" style={{ margin: "0 20px 30px 20px" }}>
      <div className="bg-white rounded-md shadow-sm overflow-x-auto" style={{ width: "100%", minHeight: "400px", maxHeight: "900px" }}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"ganttChart"}
          options={ganttOptions}
        />
      </div>
    </div>
  );
};

export default ProjectTimeline;
