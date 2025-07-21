import PptxGenJS from "pptxgenjs";

interface ChartImages {
  title: string;
  dataUrl: string;
}

const downloadDashboardPPT = (charts: ChartImages[]) => {
  const pptx = new PptxGenJS();
  const slide = pptx.addSlide();

  slide.addText("Project Dashboard Charts", {
    x: 0.5,
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
    slide.addImage({ data: chart.dataUrl, x, y, w: width, h: height });
  });

  pptx.writeFile({ fileName: "DashboardCharts.pptx" });
};

export default downloadDashboardPPT;
