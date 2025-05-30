import { Category } from "@carbon/icons-react";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useMemo, useRef, useState } from "react";

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
  isChangedSelectedYears: boolean;
}

const ProjectTimeline = ({
  selectedFilters,
  showAllYears,
  selectedYear,
  isChangedSelectedYears,
}: ProjectTimelineProps) => {
  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [originalSeriesData, setOriginalSeriesData] = useState<any[]>([]);
  const hasFetchedFirstTimeGanttChartData = useRef<boolean>(false);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

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
        /*const apiData = [
          {
            START_DT: "2025-01-01",
            END_DT: "2025-04-30",
            NAME: "CII Smart Help V2",
            ASSIGNEE: "Anil",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-02-28",
            NAME: "Health OS Chart Abstraction (Hybrid Medical Record Review)",
            ASSIGNEE: "Anil",
            STATUS: "Completed",
            PLATFORM: "Open AI (GPT 4o-mini) / Bio BERT",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-30",
            NAME: "Chart Chase Explorer (Risk Accuracy)",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Open AI ",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-12",
            NAME: "CII AI Insights",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-03-17",
            END_DT: "2025-07-11",
            NAME: "VBC Contract Ingestion and Simulation",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Open AI",
            CURRENT_PHASE: "Inception",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-08-04",
            NAME: "Mapsphere - Data Mapping Audit Automation",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-30",
            NAME: "HEDIS Assist",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2024-09-23",
            END_DT: "2024-11-15",
            NAME: "Network AI - Contract Assist (IQT)",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "SLIP",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2024-01-04",
            END_DT: "2025-04-25",
            NAME: "Network AI - Seamless E2E Onboarding",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-03-28",
            NAME: "Network Tranformation - AIDA (AI DART Assist)",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-03-28",
            NAME: "Network AI - Predictive Issue Resolution",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2024-06-03",
            END_DT: "2024-08-16",
            NAME: "Provider Contract AI (Provider Modernization)",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "SLIP",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2024-01-15",
            END_DT: "2025-02-14",
            NAME: "Roster Automation (RMA.AI)",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-04-25",
            NAME: "RMA CW (Compatability Wizard)",
            ASSIGNEE: "Ninad",
            STATUS: "Completed",
            PLATFORM: "SLIP",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2024-01-16",
            END_DT: "2025-12-01",
            NAME: "Elixir - Safety Net",
            ASSIGNEE: "Ninad",
            STATUS: "NA",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Inception",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-06-06",
            NAME: "EDM3 Cost of Care Trend and Micro Trend",
            ASSIGNEE: "Nancy",
            STATUS: "On-Track",
            PLATFORM: "Fabric CoPilot",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2024-01-15",
            END_DT: "2025-04-25",
            NAME: "CoC Intelli Q",
            ASSIGNEE: "Venkat",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2024-01-19",
            END_DT: "2025-12-02",
            NAME: "SDoH Community Insights Builder",
            ASSIGNEE: "Venkat",
            STATUS: "On-Hold",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-09-26",
            NAME: "Medicaid RFP",
            ASSIGNEE: "Nancy",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-01-02",
            END_DT: "2025-05-31",
            NAME: "COC Transformative Initiative - Ideation",
            ASSIGNEE: "Nancy",
            STATUS: "On-Track",
            PLATFORM: "AIDOCS ",
            CURRENT_PHASE: "Design",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-31",
            NAME: "COC Transformative Initiative - Policy & Trend",
            ASSIGNEE: "Nancy",
            STATUS: "On-Track",
            PLATFORM: "iDiscovery",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-31",
            NAME: "COC Transformative Initiative - CAO",
            ASSIGNEE: "Nancy",
            STATUS: "On-Track",
            PLATFORM: "TIMBER",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-03-17",
            END_DT: "2025-07-25",
            NAME: "Clinical Intelligence - TRC Measures",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Horizon",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-02-28",
            NAME: "Clara.ai",
            ASSIGNEE: "Anil",
            STATUS: "Completed",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Production",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-31",
            NAME: "DF Assist",
            ASSIGNEE: "Venkat",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-06-28",
            NAME: "OSPREY ",
            ASSIGNEE: "Venkat",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-05-30",
            NAME: "Semantic Mapper",
            ASSIGNEE: "Venkat",
            STATUS: "On-Track",
            PLATFORM: "Horizon",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-04-01",
            END_DT: "2025-09-26",
            NAME: "Data Fly Wheel",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-02-03",
            END_DT: "2025-06-27",
            NAME: "ARB Scheduler Assistant ",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-09-26",
            NAME: "Data Genie",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-04-03",
            END_DT: "2025-06-27",
            NAME: "Milliman Agent",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-02-10",
            END_DT: "2025-08-29",
            NAME: "Metaverse",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Neo4J, Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-06-27",
            NAME: "Framework Assist",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-02-10",
            END_DT: "2025-06-27",
            NAME: "DIP (Data Intelligence PLatform) Portal",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-01-01",
            END_DT: "2025-06-27",
            NAME: "EDA Ontology",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex & Neo4J",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-03-24",
            END_DT: "2025-06-27",
            NAME: "EDA LO Assist ",
            ASSIGNEE: "Venkat",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-04-01",
            END_DT: "2025-05-30",
            NAME: "Hybrid MRR - Chatbot for Reviewers",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "OpenAI - LLM Gateway",
            CURRENT_PHASE: "Inception",
          },
          {
            START_DT: "2025-04-01",
            END_DT: "2025-06-27",
            NAME: "TMV (Total Member View) - Chatbot",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Horizon",
            CURRENT_PHASE: "Inception",
          },
          {
            START_DT: "2025-04-01",
            END_DT: "2025-07-03",
            NAME: "Clinical Intelligence - Member Clinical Summary",
            ASSIGNEE: "Anil",
            STATUS: "On-Track",
            PLATFORM: "Horizon",
            CURRENT_PHASE: "Inception",
          },
          {
            START_DT: "2025-05-01",
            END_DT: "2025-06-28",
            NAME: "DevOps Assist ",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "",
          },
          {
            START_DT: "2025-05-02",
            END_DT: "2025-06-28",
            NAME: "DIP - Foundation ",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-05-02",
            END_DT: "2025-06-28",
            NAME: "MCP Server",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-05-02",
            END_DT: "2025-06-28",
            NAME: "Digital Data Sandbox",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Test",
          },
          {
            START_DT: "2025-04-14",
            END_DT: "2025-07-11",
            NAME: "CREM Agent",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
          {
            START_DT: "2025-04-21",
            END_DT: "2025-06-27",
            NAME: "OHCA (Office of Healthcare Affordability) Agent",
            ASSIGNEE: "Sanjay",
            STATUS: "On-Track",
            PLATFORM: "Cortex",
            CURRENT_PHASE: "Build",
          },
        ];*/
        console.log(apiData);

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
      ${
        !point.milestone
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
                text: "SL NO.",
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
                formatter(this: Highcharts.AxisLabelsFormatterContextObject) {
                  //return `&nbsp;&nbsp;&nbsp;${seriesData[this.pos]?.name || ""}`;
                  const projectName = seriesData[this.pos]?.name || "";
                  const projectUrl = `/dashboard?project=${projectName}`; 
                  return `<a style="color: #0f62fe;" href="${projectUrl}">&nbsp;&nbsp;&nbsp;${projectName}</a>`;
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
    <div className="mt-6 grid" style={{ margin: "0 20px 30px 20px" }}>
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
    </div>
  );
};

export default ProjectTimeline;
