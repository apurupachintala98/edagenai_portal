import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect, useMemo } from "react";
import { Category } from "@carbon/icons-react";
import ApiService from "../services/ApiService";

if (typeof HighchartsGantt === "function") {
  HighchartsGantt(Highcharts);
}

interface ProjectTimelineProps {
  selectedFilters: {
    managers: any[];
    platforms: any[];
    phases: any[];
  };
  showAllYears: boolean;
  selectedYear: number;
}


const ProjectTimeline = ({ selectedFilters, showAllYears, selectedYear }: ProjectTimelineProps) => {
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [originalSeriesData, setOriginalSeriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGanttData = async () => {
      try {
        const apiData = await ApiService.getAllDetailsGanttChart();
        console.log(apiData);

        const filteredData = apiData
          .filter((item: any) => {
            const matchesManager = selectedFilters.managers.length === 0 || selectedFilters.managers.some(manager => manager.label === item.ASSIGNEE);
            const matchesPlatform = selectedFilters.platforms.length === 0 || selectedFilters.platforms.some(platform => platform.label === item.PLATFORM); // Only filter, not displayed
            const matchesPhase = selectedFilters.phases.length === 0 || selectedFilters.phases.some(phase => phase.label === item.STATUS);
            return matchesManager && matchesPlatform && matchesPhase;
          })
          .filter((item: any) => {
            if (showAllYears) {
              return true;
            }
            const startYear = new Date(item.START_DT).getFullYear();
            const endYear = new Date(item.END_DT).getFullYear();
            return startYear === selectedYear || endYear === selectedYear;
          });

        const mappedData = filteredData.map((item: any, index: number) => {
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
        setOriginalSeriesData(mappedData);
        setSeriesData(mappedData);
        console.log(mappedData);
      } catch (error) {
        console.error("Failed to fetch Gantt chart data:", error);
      }
    };

    fetchGanttData();
  }, [selectedFilters, showAllYears, selectedYear]);

  const ganttOptions = useMemo(() => ({
    chart: {
      type: "gantt",
      height: Math.max((originalSeriesData.length + 1) * 48, 400),
    },
    yAxis: {
      uniqueNames: true,
      min: 0,
      max: originalSeriesData.length,
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
            title: { text: 'Manager' },
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
      min: Date.UTC(selectedYear, 0, 1),
      max: Date.UTC(selectedYear, 11, 31),
      tickInterval: 30 * 24 * 3600 * 1000,
      labels: {
        format: '{value:%b}',
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
        pointHeight: 36, 
        colorByPoint: false,
      }
    },
    series: [{
      name: "Project Tasks",
      data: seriesData,
      color: '#2caffe',
    }],
  }), [seriesData]);


  return (
    <div className="mt-6 grid" style={{ margin: "0 20px 30px 20px" }}>
      <div className="bg-white rounded-md shadow-sm overflow-x-auto" style={{ width: '100%' }}>
        {seriesData.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-lg font-bold">
            No Data Found
          </div>
        ) : (
          <div style={{ minHeight: '400px', maxHeight: '900px' }}>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"ganttChart"}
              options={ganttOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline;
