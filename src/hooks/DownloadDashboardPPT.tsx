// import PptxGenJS from "pptxgenjs";

// interface ChartImages {
//   title: string;
//   dataUrl: string;
// }

// const downloadDashboardPPT = (charts: ChartImages[]) => {
//   const pptx = new PptxGenJS();
//   const slide = pptx.addSlide();

//   slide.addText("Dashboard Charts", {
//     x: 0.2,
//     y: 0.2,
//     fontSize: 18,
//     bold: true,
//     color: "363636",
//   });

//   const width = 3.0;
//   const height = 2.0;

//   const positions = [
//     [0.2, 1], [3.4, 1], [6.8, 1],
//     [0.2, 3.5], [3.4, 3.5], [6.8, 3.5],
//   ];

//   charts.slice(0, 6).forEach((chart, idx) => {
//     const [x, y] = positions[idx];

//     // Add chart title above the image
//     slide.addText(chart.title, {
//       x,
//       y: y - 0.3, // slightly above the image
//       fontSize: 12,
//       bold: true,
//       color: "444444",
//       w: width, // match image width
//       align: "center",
//     });

//     // Add the chart image
//     slide.addImage({ data: chart.dataUrl, x, y, w: width, h: height });
//   });

//   pptx.writeFile({ fileName: "DashboardCharts.pptx" });
// };

// export default downloadDashboardPPT;

// ---- DownloadDashboardPPT.ts ----
import PptxGenJS from "pptxgenjs";

export interface ChartImages {
  title: string;
  dataUrl: string;
}

export interface GanttManagerSlide {
  manager: string;
  ganttImageUrl: string;
  projectList: string[];
}

const downloadDashboardPPT = (
  charts: ChartImages[],
  ganttByManager: GanttManagerSlide[]
) => {
  const pptx = new PptxGenJS();

  // Slide 1 - Dashboard Charts Summary
  const chartSlide = pptx.addSlide();
  chartSlide.addText("Project Dashboard Charts", {
    x: 0.2,
    y: 0.2,
    fontSize: 18,
    bold: true,
    color: "363636",
  });

  const width = 3.0;
  const height = 2.0;
  const positions = [
    [0.2, 1], [3.4, 1], [6.8, 1],
    [0.2, 3.3], [3.4, 3.3], [6.8, 3.3],
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

  // Slide for each VP with Gantt chart
  ganttByManager.forEach(({ manager, ganttImageUrl, projectList }) => {
    const slide = pptx.addSlide();
    slide.addText(`Projects for ${manager}`, {
      x: 0.5,
      y: 0.3,
      fontSize: 18,
      bold: true,
      color: "1f4e79",
    });

    slide.addImage({
      data: ganttImageUrl,
      x: 0.5,
      y: 1,
      w: 8.5,
      h: 3.5,
    });

    // const tableData = [
    //   [{ text: "Project Name", options: { bold: true } }],
    //   ...projectList.map((p) => [{ text: p }]),
    // ];

    // slide.addTable(tableData, {
    //   x: 0.5,
    //   y: 4.7,
    //   w: 8.5,
    //   colW: [8.5],
    //   fontSize: 12,
    //   border: { type: "solid", color: "c2c2c2", pt: 1 },
    // });
  });

  pptx.writeFile({ fileName: "DashboardCharts.pptx" });
};

export default downloadDashboardPPT;
