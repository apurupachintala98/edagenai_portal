// DownloadDashboardPPT.tsx
import React from "react";
import PptxGenJS from "pptxgenjs";

interface ChartImages {
    title: string;
    dataUrl: string;
}

interface DownloadDashboardPPTProps {
    charts: ChartImages[]; // 6 chart image data with base64 URLs
}

const DownloadDashboardPPT: React.FC<DownloadDashboardPPTProps> = ({ charts }) => {
    const handleDownload = () => {
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
            [0.5, 1], [3.8, 1], [7.1, 1],
            [0.5, 3.3], [3.8, 3.3], [7.1, 3.3],
        ];

        charts.slice(0, 6).forEach((chart, idx) => {
            const [x, y] = positions[idx];
            slide.addImage({ data: chart.dataUrl, x, y, w: width, h: height });
        });

        pptx.writeFile({ fileName: "DashboardCharts.pptx" });
    };

    return (
        <button onClick={handleDownload} className="download-btn">
            Download Presentation
        </button>
    );
};

export default DownloadDashboardPPT;
