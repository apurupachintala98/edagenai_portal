import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { Category } from "@carbon/icons-react";
import ApiService from "../services/ApiService";

if (typeof HighchartsGantt === "function") {
  HighchartsGantt(Highcharts);
}



// const seriesData = [
//     {
//       start: "2017-01-15 08:00",
//       end: "2017-06-20 16:00",
//       name: "Start prototype",
//       assignee: "Richards",
//       status: "Delayed",
//       y: 0
//     },
//     {
//       start: "2017-03-10 08:00",
//       end: "2017-11-15 16:00",
//       name: "Develop",
//       assignee: "Michaels",
//       status: "On-track",
//       y: 1
//     },
//     {
//       start: "2017-05-05 16:00",
//       end: "2017-08-05 16:00",
//       name: "Prototype done",
//       assignee: "Richards",
//       milestone: true,
//       status: "On-track",
//       y: 2
//     },
//     {
//       start: "2017-07-20 08:00",
//       end: "2017-10-30 16:00",
//       name: "Test prototype",
//       assignee: "Richards",
//       status: "Completed",
//       y: 3
//     },
//     {
//       start: "2017-10-01 08:00",
//       end: "2017-12-15 16:00",
//       name: "Run acceptance tests",
//       assignee: "Halliburton",
//       status: "Delayed",
//       y: 4
//     }
//   ];

//   const startDates = seriesData.map(task => new Date(task.start).getTime());
//   const endDates = seriesData.map(task => new Date(task.end).getTime());

//   const minDate = Math.min(...startDates);
//   const maxDate = Math.max(...endDates);


// const ganttOptions = {
//     chart: {
//         type: "gantt",
//         height: seriesData.length * 48 + 80, // approximate height to match all rows
//         width: null,
//     },
//     // yAxis: {
//     //     min: 0,
//     //     max: seriesData.length - 0.5,
//     //     // labels: { enabled: false },
//     //     // grid: { enabled: false }
//     //     type: 'category',
//     //     grid: {
//     //         enabled: true,
//     //         borderColor: 'rgba(0,0,0,0.3)',
//     //         borderWidth: 1,
//     //         columns: [{
//     //             title: {
//     //                 text: 'Project'
//     //             },
//     //             labels: {
//     //                 format: '{point.name}'
//     //             }
//     //         }, {
//     //             title: {
//     //                 text: 'Assignee'
//     //             },
//     //             labels: {
//     //                 format: '{point.assignee}'
//     //             }
//     //         }, {
//     //             title: {
//     //                 text: 'Est. days'
//     //             },
//     //             labels: {
//     //                 format: '{(divide (subtract point.x2 point.x) ' +
//     //                     '86400000):.2f}'
//     //             }
//     //         }, {
//     //             labels: {
//     //                 format: '{point.start:%e. %b}'
//     //             },
//     //             title: {
//     //                 text: 'Start date'
//     //             }
//     //         }, {
//     //             title: {
//     //                 text: 'End date'
//     //             },
//     //             offset: 30,
//     //             labels: {
//     //                 format: '{point.end:%e. %b}'
//     //             }
//     //         }]
//     //     }
//     // },
//     yAxis: {
//         min: 0,
//         max: seriesData.length - 1,
//         type: 'category',
//         grid: {
//           enabled: true,
//           borderColor: 'rgba(0,0,0,0.3)',
//           borderWidth: 1,
//           columns: [
//             {
//               title: { text: 'Task' },
//               labels: {
//                 formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
//                   return seriesData[this.pos]?.name || '';
//                 }
//               }
//             },
//             {
//               title: { text: 'Assignee' },
//               labels: {
//                 formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
//                   return seriesData[this.pos]?.assignee || '';
//                 }
//               }
//             },
//             {
//               title: { text: 'Status' },
//               labels: {
//                 useHTML: true,
//                 formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
//                   const status = seriesData[this.pos]?.status || '';
//                   const statusColors: Record<string, string> = {
//                     'Completed': '#16a34a',
//                     'On-track': '#2563eb',
//                     'Delayed': '#dc2626',
//                   };
//                   const color = statusColors[status] || '#6b7280';

//                   return `<span style="
//                     display:inline-block;
//                     padding:2px 6px;
//                     border-radius:12px;
//                     background-color:${color}20;
//                     color:${color};
//                     font-size:11px;
//                   ">${status}</span>`;
//                 }
//               }
//             }
//           ]
//         }
//       },
//     xAxis: {
//         min: minDate,
//         max: maxDate,
//         tickInterval: 30 * 24 * 3600 * 1000, // approx 1 month
//         labels: {
//             format: '{value:%b}', // Jan, Feb, Mar
//             style: {
//                 fontWeight: 'bold'
//             }
//         },
//         lineColor: '#bbb',
//         lineWidth: 1,
//         plotBackgroundColor: "#f5f5f5"
//     },
//     plotOptions: {
//         series: {
//             pointHeight: 48
//         }
//     },
//     series: [
//         {
//             name: "Project Tasks",
//             data: seriesData
//         }
//     ]
// };



const ProjectTimeline = () => {
  const [seriesData, setSeriesData] = useState<any[]>([]);
  useEffect(() => {
    const fetchGanttData = async () => {
      try {
        const apiData = await ApiService.getAllDetailsGanttChart();
        console.log(apiData);
        const mappedData = apiData.map((item: any, index: number) => ({
          start: item.START_DATE,
          end: item.END_DATE,
          name: item.NAME,
          assignee: item.ASSIGNEE,
          status: item.STATUS,
          milestone: item.MILESTONE || false,
          y: index,
        }));
        setSeriesData(mappedData);
      } catch (error) {
        console.error("Failed to fetch Gantt chart data:", error);
      }
    };
    fetchGanttData();
  }, []);

  const startDates = seriesData.map((task: any) => new Date(task.start).getTime());
  const endDates = seriesData.map((task: any) => new Date(task.end).getTime());

  const minDate = Math.min(...startDates);
  const maxDate = Math.max(...endDates);

  const ganttOptions = {
    chart: {
      type: "gantt",
      height: seriesData.length * 48 + 80,
    },
    yAxis: {
      min: 0,
      max: seriesData.length - 1,
      type: 'category',
      grid: {
        enabled: true,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        columns: [
          {
            title: { text: 'Task' },
            labels: {
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                return seriesData[this.pos]?.name || '';
              }
            }
          },
          {
            title: { text: 'Assignee' },
            labels: {
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                return seriesData[this.pos]?.assignee || '';
              }
            }
          },
          {
            title: { text: 'Status' },
            labels: {
              useHTML: true,
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                const status = seriesData[this.pos]?.status || '';
                const statusColors: Record<string, string> = {
                  'Completed': '#16a34a',
                  'On-track': '#2563eb',
                  'Delayed': '#dc2626',
                };
                const color = statusColors[status] || '#6b7280';
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
          }
        ]
      }
    },
    xAxis: {
      min: minDate,
      max: maxDate,
      tickInterval: 30 * 24 * 3600 * 1000,
      labels: {
        format: '{value:%b}',
        style: {
          fontWeight: 'bold'
        }
      },
      lineColor: '#bbb',
      lineWidth: 1,
      plotBackgroundColor: "#f5f5f5"
    },
    plotOptions: {
      series: {
        pointHeight: 48
      }
    },
    series: [
      {
        name: "Project Tasks",
        data: seriesData
      }
    ]
  };


  return (
    <div className="mt-6 grid" style={{ margin: "0 20px" }}>
      <div className="bg-white rounded-md shadow-sm overflow-x-auto" style={{ width: '100%', minHeight: '400px' }}>
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
