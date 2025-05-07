import { Category } from "@carbon/icons-react";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useMemo, useRef,useState } from "react";

import ApiService from "../services/ApiService";

import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";


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
  const hasFetchedGanttChartData = useRef<boolean>(false);
  const hasFetchedFirstTimeGanttChartData = useRef<boolean>(false);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  useEffect(()=>{
    if((selectedFilters && (selectedFilters.managers.length > 0 || selectedFilters.phases.length > 0 || selectedFilters.platforms.length > 0))){
      setIsFilterApplied(true);
    }else{
      setIsFilterApplied(false);
    }
  },[selectedFilters]);

  useEffect(() => {
    if(isFilterApplied){
      hasFetchedFirstTimeGanttChartData.current = !isFilterApplied;
    }
    const fetchGanttData = async () => {
      try {
        hasFetchedFirstTimeGanttChartData.current = true;
        const apiData = await ApiService.getAllDetailsGanttChart();
        console.log(apiData);

        const filteredData = apiData
          .filter((item: any) => {
            const matchesManager = selectedFilters.managers.length === 0 || selectedFilters.managers.some(manager => manager.label === item.ASSIGNEE);
            const matchesPlatform = selectedFilters.platforms.length === 0 || selectedFilters.platforms.some(platform => platform.label === item.PLATFORM); // Only filter, not displayed
            const matchesPhase = selectedFilters.phases.length === 0 || selectedFilters.phases.some(phase => phase.label === item.CURRENT_PHASE);
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
            current_phase: item.CURRENT_PHASE,
            y: index,
          };
          if (item.STATUS === "Completed") {
            const deploymentDate = new Date(item.DEPLOYMENT_DT || item.END_DT).getTime(); // fallback to END_DT
            return {
              ...baseItem,
              start: deploymentDate,
              end: deploymentDate,
              milestone: true
            };
          }
          return baseItem;
        });
        setOriginalSeriesData(mappedData);
        setSeriesData(mappedData);
      } catch (error) {
        console.error("Failed to fetch Gantt chart data:", error);
      }
    };
    if(hasFetchedFirstTimeGanttChartData.current){
      return;
    }else{
      fetchGanttData();
    }
    
  }, [selectedFilters, showAllYears, selectedYear, isFilterApplied]);

  function ganttTooltipFormatter(this: any): string {
    const point = this.point as Highcharts.Point & {
      name?: string;
      start?: number;
      end?: number;
      milestone?: boolean;
    };

    const name = point.name || '';
    const startDate = point.start
      ? Highcharts.dateFormat('%A, %b %e, %Y', point.start)
      : '—';
    const endDate = point.end
      ? Highcharts.dateFormat('%A, %b %e, %Y', point.end)
      : '—';

    return `
      <b>${this.series.name}</b><br/>
      <span style="font-weight: 500">${name}</span><br/>
      ${!point.milestone
        ? `<span>Start: ${startDate}</span><br/><span>End: ${endDate}</span>`
        : `<span>Date: ${startDate}</span>`
      }
    `;
  }


  const ganttOptions = useMemo(() => ({
    chart: {
      type: "gantt",
      height: Math.max((originalSeriesData.length) * 48, 200),
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
            title: { text: 'Project' },
            labels: {
              useHTML: true,
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                const name = seriesData[this.pos]?.name || '';
                return `<span style="display: block; text-align: left;">${name}</span>`;
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
          },
          {
            title: { text: 'Current Phase' },
            labels: {
              formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                return seriesData[this.pos]?.current_phase || '';
              }
            }
          },
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
    tooltip: {
      useHTML: true,
      formatter: ganttTooltipFormatter,
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
