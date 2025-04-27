import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect, useMemo } from "react";
import { Category } from "@carbon/icons-react";
import ApiService from "../services/ApiService";

if (typeof HighchartsGantt === "function") {
  HighchartsGantt(Highcharts);
}

const ProjectTimeline = () => {
  const [seriesData, setSeriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGanttData = async () => {
      try {
        const apiData = await ApiService.getAllDetailsGanttChart();
        console.log(apiData);

        const mappedData = apiData.map((item: any, index: number) => {
          const baseItem = {
            start: item.START_DT,
            end: item.END_DT,
            name: item.NAME,
            assignee: item.ASSIGNEE,
            status: item.STATUS,
            y: index,
          };

          if (item.STATUS === "Completed") {
            return { ...baseItem, milestone: true };
          }

          return baseItem;
        });

        setSeriesData(mappedData);
        console.log(mappedData);
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

  const ganttOptions = useMemo(() => ({
    chart: {
      type: "gantt",
      height: (seriesData.length + 3) * 48,
    },
    yAxis: {
      min: 0,
      max: seriesData.length,
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
      tickInterval: 30 * 24 * 3600 * 1000, // around 1 month
      labels: {
        format: '{value:%b}', // <-- Month only (Jan, Feb, etc.)
        style: {
          fontWeight: 'bold',
        },
      },
      lineColor: '#bbb',
      lineWidth: 1,
      plotBackgroundColor: "#f5f5f5",
    },


    plotOptions: {
      series: {
        pointHeight: 48
      }
    },
    series: [{
      name: "Project Tasks",
      data: seriesData,
    }],
  }), [seriesData]);


  return (
    <div className="mt-6 grid" style={{ margin: "0 20px 40px 20px" }}>
      <div className="bg-white rounded-md shadow-sm overflow-x-auto" style={{ width: '100%', minHeight: '400px', maxHeight: '900px' }}>
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
