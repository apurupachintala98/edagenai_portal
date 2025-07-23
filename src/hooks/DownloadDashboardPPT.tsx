import PptxGenJS from "pptxgenjs";
import { type projectDetails } from "../hooks/useProjectDetailsData";


export interface ChartImages {
  title: string;
  dataUrl: string;
}

export interface GanttManagerSlide {
  manager: string;
  projectList: string[];
}

const downloadDashboardPPT = (
  charts: ChartImages[],
  ganttByManager: GanttManagerSlide[],
  projectDetails: projectDetails[]
) => {
  const pptx = new PptxGenJS();

  const chartSlide = pptx.addSlide();
  chartSlide.addText("Project Dashboard Charts", {
    x: 0.2,
    y: 0.2,
    fontSize: 18,
    bold: true,
    color: "363636",
  });
  const statusColors: Record<
    string,
    { fill: { color: string }; color: string }
  > = {
    "Completed": { fill: { color: "#d1fae5" }, color: "#15803d" },
    "On-track": { fill: { color: "#dbeafe" }, color: "#1d4ed8" },
    "Delayed": { fill: { color: "#fee2e2" }, color: "#b91c1c" },
  };


  const width = 3.0;
  const height = 2.0;

  const positions = [
    [0.2, 1], [3.4, 1], [6.8, 1],
    [0.2, 3.5], [3.4, 3.5], [6.8, 3.5],
  ];

  charts.slice(0, 6).forEach((chart, idx) => {
    const [x, y] = positions[idx];
    chartSlide.addText(chart.title, {
      x,
      y: y - 0.3,
      fontSize: 12,
      bold: true,
      color: "444444",
      w: width,
      align: "center",
    });
    chartSlide.addImage({ data: chart.dataUrl, x, y, w: width, h: height });
  });

  ganttByManager.forEach(({ manager, projectList }) => {
    const slide = pptx.addSlide();
    slide.addText(`Projects for ${manager}`, {
      x: 0.5,
      y: 0.3,
      fontSize: 18,
      bold: true,
      color: "1f4e79",
    });

    const filteredProjects: PptxGenJS.TableRow[] = projectDetails
      .filter((p) => p.STAFF_VP === manager)
      .map((p, idx) => {
        const status = p.STATUS || "—";
        const statusStyle = statusColors[status] || {
          fill: { color: "#ffffff" },
          color: "#000000",
        };

        return [
          { text: String(idx + 1), options: {} },
          { text: p.PROJECT_NAME || "—", options: {} },
          { text: p.STAFF_VP || "—", options: {} },
          {
            text: status,
            options: {
              fill: statusStyle.fill,
              color: statusStyle.color,
            },
          },
          { text: p.CURRENT_PHASE || "—", options: {} },
          { text: p.DEPLOYMENT_DATE || "—", options: {} },
        ];
      });

    const tableData: PptxGenJS.TableRow[] = [
      [
        { text: "SL NO.", options: { bold: true } },
        { text: "Project", options: { bold: true } },
        { text: "Manager", options: { bold: true } },
        { text: "Status", options: { bold: true } },
        { text: "Current Phase", options: { bold: true } },
        { text: "Deployment Date", options: { bold: true } },

      ],
      ...filteredProjects,
    ];


    slide.addTable(tableData, {
      x: 0.5,
      y: 1.0,
      w: 9.0,
      colW: [0.8, 3.5, 1.2, 1.2, 1.2, 2.0],
      fontSize: 11,
      border: { type: "solid", color: "c2c2c2", pt: 1 },
      align: "left",
    });
  });


  pptx.writeFile({ fileName: "DashboardCharts.pptx" });
};

export default downloadDashboardPPT;
