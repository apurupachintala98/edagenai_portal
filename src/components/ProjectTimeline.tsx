import { Category } from "@carbon/icons-react";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useMemo, useRef, useState } from "react";

import ApiService from "../services/ApiService";

import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";
import { Modal } from "@carbon/react";
import ProjectModel from "pages/DashboardContent/ProjectModel";
import { type projectDetails, useProjectDetailsData } from "../hooks/useProjectDetailsData";

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
  isChangedSelectedYears: boolean;
  isModalOpen: boolean;
  modalReady: boolean;
  modalProjectName: string;
  projects?: projectDetails[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectTimeline = ({
  selectedFilters,
  showAllYears,
  selectedYear,
  isChangedSelectedYears,
  isModalOpen,
  modalReady,
  modalProjectName,
  setIsModalOpen,
  projects,
}: ProjectTimelineProps) => {
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [originalSeriesData, setOriginalSeriesData] = useState<any[]>([]);
  const hasFetchedFirstTimeGanttChartData = useRef<boolean>(false);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [filterProjectDetails, setFilterProjectDetails] = useState<projectDetails[]>([]);
  const { projectDetails } = useProjectDetailsData();

  useEffect(() => {
    const filterSeriesData = seriesData.length > 0 ? seriesData.map((i) => i.name) : [];
    if (filterSeriesData.length > 0) {
      const filteredData = projectDetails.filter((item) =>
        filterSeriesData.includes(item.PROJECT_NAME),
      );
      setFilterProjectDetails(filteredData);
    }
  }, [seriesData, projectDetails]);

  useEffect(() => {
    if (
      (selectedFilters &&
        (selectedFilters.managers.length > 0 ||
          selectedFilters.phases.length > 0 ||
          selectedFilters.platforms.length > 0)) ||
      isChangedSelectedYears
    ) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [selectedFilters, isChangedSelectedYears]);

  useEffect(() => {
    if (isFilterApplied) {
      hasFetchedFirstTimeGanttChartData.current = !isFilterApplied;
    }
    const fetchGanttData = async () => {
      try {
        hasFetchedFirstTimeGanttChartData.current = true;
        const apiData = await ApiService.getAllDetailsGanttChart();
        const filteredData = apiData
          .filter((item: any) => {
            const matchesManager =
              selectedFilters.managers.length === 0 ||
              selectedFilters.managers.some((manager) => manager.label === item.ASSIGNEE);
            const matchesPlatform =
              selectedFilters.platforms.length === 0 ||
              selectedFilters.platforms.some((platform) => platform.label === item.PLATFORM); // Only filter, not displayed
            const matchesPhase =
              selectedFilters.phases.length === 0 ||
              selectedFilters.phases.some((phase) => phase.label === item.CURRENT_PHASE);
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
            sl_no: index + 1,
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
              milestone: true,
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
    if (hasFetchedFirstTimeGanttChartData.current) {
      return;
    } else {
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

    const name = point.name || "";
    const startDate = point.start ? Highcharts.dateFormat("%A, %b %e, %Y", point.start) : "—";
    const endDate = point.end ? Highcharts.dateFormat("%A, %b %e, %Y", point.end) : "—";

    return `
      <b>${this.series.name}</b><br/>
      <span style="font-weight: 500">${name}</span><br/>
      ${!point.milestone
        ? `<span>Start: ${startDate}</span><br/><span>End: ${endDate}</span>`
        : `<span>Date: ${startDate}</span>`
      }
    `;
  }

  const ganttOptions = useMemo(
    () => ({
      chart: {
        type: "gantt",
        height: Math.max(originalSeriesData.length * 48, 200),
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
              title: {
                text: "S#",
              },
              labels: {
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  return seriesData[this.pos]?.sl_no ?? "";
                },
              },
            },
            {
              title: {
                text: "Project",
              },
              labels: {
                useHTML: true,
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  //return `&nbsp;&nbsp;&nbsp;${seriesData[this.pos]?.name || ""}`;
                  const projectName = seriesData[this.pos]?.name || "";
                  const projectUrl = `/dashboard?project=${projectName}`;

                  //return `<a style="color: #0f62fe;" href="${projectUrl}">&nbsp;&nbsp;&nbsp;${projectName}</a>`;
                  return `<span 
                  title="${projectName}"
        class="project-link" 
        id="${projectName}" 
        style="color:#0f62fe; cursor:pointer;"
      >
        &nbsp;&nbsp;&nbsp;${projectName}
      </span>`;
                },
                align: "left",
              },
            },
            {
              title: { text: "Manager" },
              labels: {
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  return seriesData[this.pos]?.assignee || "";
                },
              },
            },
            {
              title: { text: "Status" },
              labels: {
                useHTML: true,
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  const status = seriesData[this.pos]?.status || "";
                  const statusColors: Record<string, string> = {
                    Completed: "#16a34a",
                    "On-track": "#2563eb",
                    Delayed: "#dc2626",
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
                },
              },
            },
            {
              title: { text: "Current Phase" },
              labels: {
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  return seriesData[this.pos]?.current_phase || "";
                },
              },
            },
            {
              title: {
                useHTML: true,
                text: `
      <div style="
        display: grid;
        grid-template-columns: repeat(6, 32px);
        gap: 6px;
        justify-content: center;
        align-items: start;
        height: 80px; 
        overflow: visible;
        position: relative;
      ">
        ${["ARCHITECTURE", "UI", "PLATFORM", "DEVOPS", "FRAMEWORK", "MCP"].map(label => `
          <div style="
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
            font-size: 10px;
            font-weight: bold;
            line-height: 1.2;
            white-space: nowrap;
            text-align: start;
            height: 100%;
            overflow: visible;
            display: flex;
            align-items: flex-start; 
            justify-content: center;
          ">${label}</div>
        `).join("")}
      </div>
    `
              },
              labels: {
                useHTML: true,
                align: "center",
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  const rawTech = projectDetails.find(
                    (p) => p.PROJECT_NAME === seriesData[this.pos]?.name
                  );

                  if (!rawTech) return "";

                  const tech = rawTech as unknown as Record<string, boolean>;
                  const keys = ["ARCHITECTURE", "UI", "PLATFORM", "DEVOPS", "FRAMEWORK", "MCP"];
                  return `
  <div style="
    display: grid;
    grid-template-columns: repeat(6, 32px);
    gap: 6px;
    justify-content: center;
  ">
    ${keys
                      .map((key) => {
                        const rawValue = (rawTech as any)[key];
                        // normalize value
                        const active =
                          rawValue === true ||
                          rawValue === "on" ||
                          rawValue === "ON" ||
                          rawValue === "TRUE" ||
                          rawValue === "true" ||
                          rawValue === 1;

                        return `<div style="
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background-color: ${active ? "#0f62fe" : "#e0e0e0"};
        "></div>`;
                      })
                      .join("")}
  </div>
`;
                  //             return `
                  //   <div style="
                  //     display: grid;
                  //     grid-template-columns: repeat(6, 32px);
                  //     gap: 6px;
                  //     justify-content: center;
                  //   ">
                  //     ${keys.map((key) => {
                  //               const active = tech[key];
                  //               return `<div style="
                  //         width: 18px;
                  //         height: 18px;
                  //         border-radius: 4px;
                  //         background-color: ${active ? '#0f62fe' : '#e0e0e0'};
                  //       "></div>`;
                  //             }).join("")}
                  //   </div>
                  // `;
                },
              },
            }

          ],
        },
      },
      xAxis: {
        min: Date.UTC(selectedYear, 0, 1),
        max: Date.UTC(selectedYear, 11, 31),
        tickInterval: 30 * 24 * 3600 * 1000,
        labels: {
          format: "{value:%b}",
          style: {
            fontWeight: "bold",
            fontSize: "0.8em",
          },
        },
        lineColor: "#bbb",
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
        },
      },
      series: [
        {
          name: "Project Tasks",
          data: seriesData,
          color: "#2caffe",
        },
      ],
    }),
    [seriesData],
  );

  return (
    <div className="mt-0 mb-0 ml-1 mr-1 grid">
      <div className="bg-white rounded-md shadow-sm overflow-x-auto" style={{ width: "100%" }}>
        {seriesData.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-lg font-bold">
            No Data Found
          </div>
        ) : (
          <div style={{ minHeight: "400px", maxHeight: "900px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"ganttChart"}
              options={ganttOptions}
            />
          </div>
        )}
      </div>
      <Modal
        open={isModalOpen && modalReady}
        onRequestClose={() => setIsModalOpen(false)}
        passiveModal
        size="lg"
        className={'projectModel'}
      >
        <ProjectModel
          projectDetails={filterProjectDetails}
          modalProjectName={modalProjectName}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};

export default ProjectTimeline;
