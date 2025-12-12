import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Column,
  Dropdown,
  FilterableMultiSelect,
  Grid,
  Modal,
  OverflowMenu,
  OverflowMenuItem,
  Tooltip,
  Loading,
} from "@carbon/react";
import {
  Dashboard,
  DocumentAdd,
  IbmCloudProjects,
  UserMultiple,
  BusinessProcesses,
  DataCategorical,
  Platforms,
  PresentationFile,
  Chat,
  SalesOps /*CurrencyDollar*/,
} from "@carbon/react/icons";
import { ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProgressDonut from "../../components/ProgressDonut/ProgressDonut";
import PieDonutChart from "../../components/ProgressDonut/PieDonutChart";
import ProjectTimeline from "../../components/ProjectTimeline";
import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import { ButtonContainer, DashboardCardsWrapper } from "./styled.components";
import DashboardChart from "components/DashboardChart"; // Bar chart
import MultipleBarChart from "components/MultipleBarChart";
import { DropdownButton } from "components/DropdownButton";
import ChatWidget from "components/ChatWidget";
import { toPng } from 'html-to-image';
import downloadDashboardPPT, { GanttManagerSlide } from '../../hooks/DownloadDashboardPPT';
import ApiService from "../../services/ApiService";
import { createRoot } from 'react-dom/client';
import { useWindowDimensions } from "utils/hooks";
import { useProjectData } from "../../hooks/useProjectData";
import DashboardCard from "pages/DashboardCard";
import { Label } from "recharts";
import { type projectDetails, useProjectDetailsData } from "../../hooks/useProjectDetailsData";
import ProjectModel from "./ProjectModel";
import Carousel from "components/Carousel";

interface DashboardContentProps {
  containerWidth: number;
}

interface DashboardTotals {
  totalProjects: number;
  totalUsers: number;
  totalCost: number;
  totalProgramTypes: number;
  totalBUProjects: number;
  totalPlatforms: number;
}

function DashboardContent({ containerWidth }: DashboardContentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const [selectedFilters, setSelectedFilters] = useState({
    managers: [] as any[],
    platforms: [] as any[],
    phases: [] as any[],
  });
  const [dashboardData, setDashboardData] = useState({
    users: [] as any[],
    costs: [] as any[],
    programTypes: [] as any[],
    bus: [] as any[],
    platforms: [] as any[],
  });
  const [progressReportData, setProgressReportData] = useState<any[]>([]);
  const [dashboardTotals, setDashboardTotals] = useState<DashboardTotals>({
    totalProjects: 0,
    totalUsers: 0,
    totalCost: 0,
    totalProgramTypes: 0,
    totalBUProjects: 0,
    totalPlatforms: 0,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [filteredProjectDonut, setFilteredProjectDonut] = useState<any[] | null>(null);
  const [dropdownOptions, setDropdownOptions] = useState({
    managers: [] as any[],
    platforms: [] as any[],
    phases: [] as any[],
  });
  const { projects, loading, fetchProjects } = useProjectData();
  const [showAllYears, setShowAllYears] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [isChangedSelectedYears, setIsChangedSelectedYears] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReady, setModalReady] = useState(false);
  const [modalProjectName, setModalProjectName] = useState("");
  const { projectDetails } = useProjectDetailsData();
  const [staffVpCostData, setStaffVpCostData] = useState<any[]>([]);
  const [showNoCostModal, setShowNoCostModal] = useState(false);



  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpen = () => {
    inputRef.current?.focus();
    inputRef.current?.click();
  };
  const hasFetchedAllProjectDetails = useRef<boolean>(false);
  const hasFetchedGanttChart = useRef<boolean>(false);



  const chartRefs = {
    status: useRef(null),
    platform: useRef(null),
    bu: useRef(null),
    fundType: useRef(null),
    users: useRef(null),
    cost: useRef(null),
  };

  useEffect(() => {
    const fetchDashboardUsersAndCosts = async () => {
      try {
        const [usersRes, costRes, programTypeRes, buRes, platformRes] = await Promise.all([
          ApiService.getAllUsersDetails(),
          ApiService.getAllCostsDetails(),
          ApiService.getAllProgramTypeDetails(),
          ApiService.getAllBUDetails(),
          ApiService.getAllLlmPfDetails(),
        ]);
        const colorPalette = [
          "#1e5ae6", // brand-blue
          "#17a19c", // brand-teal
          "#64748b", // muted-foreground
          "#f59f05", // warning
          "#3399ff", // brand-blue-light
        ];

        const costsWithColor = costRes.map((item: any, index: number) => ({
          name: item.NAME || `Month ${index + 1}`,
          value: Number(item.VALUE) || 0,
          color: colorPalette[index % colorPalette.length],
        }));
        const programTypeWithColor = programTypeRes
          .filter((item: any) => item.VALUE !== 0)
          .map((item: any, index: number) => ({
            name: item.NAME,
            value: item.VALUE,
            color: colorPalette[index % colorPalette.length],
          }));

        const buWithColor = buRes
          .filter((item: any) => item.VALUE !== 0)
          .map((item: any, index: number) => ({
            name: item.NAME,
            value: item.VALUE,
            color: colorPalette[index % colorPalette.length],
          }));
        const platformWithColor = platformRes
          .filter((item: any) => item.VALUE !== 0)
          .map((item: any, index: number) => ({
            name: item.NAME,
            value: item.VALUE,
            color: colorPalette[index % colorPalette.length],
          }));

        setDashboardData({
          users: usersRes,
          costs: costsWithColor,
          programTypes: programTypeWithColor,
          bus: buWithColor,
          platforms: platformWithColor,
        });

        setDashboardTotals((prev) => ({
          ...prev,
          totalUsers: usersRes.reduce(
            (acc: number, item: { slvr: number; gld: number; plat: number }) =>
              acc + (item.slvr || 0) + (item.gld || 0) + (item.plat || 0),
            0
          ),
          totalCost: costsWithColor.reduce((acc: any, item: { value: any; }) => acc + item.value, 0),
          totalProgramTypes: programTypeWithColor.reduce((acc: any, item: { value: any; }) => acc + item.value, 0),
          totalBUProjects: buWithColor.reduce((acc: any, item: { value: any; }) => acc + item.value, 0),
          totalPlatforms: platformWithColor.reduce((acc: any, item: { value: any; }) => acc + item.value, 0),
        }));
      } catch (error) {
        console.error("Failed to fetch dashboard users or costs:", error);
      }
    };

    fetchDashboardUsersAndCosts();
  }, []);

  useEffect(() => {
    const fetchProgressReportData = async () => {
      try {
        hasFetchedAllProjectDetails.current = true;
        const apiData = await ApiService.getAllDetailsProjects();

        const coloredData = apiData.filter((item: { VALUE: number; }) => item.VALUE !== 0).map((item: any, index: number) => ({
          name: item.NAME,
          value: item.VALUE,
          color:
            index % 3 === 0
              ? "#1e5ae6"
              : index % 3 === 1
                ? "#17a19c"
                : "#64748b",
        }));

        setProgressReportData(coloredData);
        const totalProjects = coloredData.reduce(
          (acc: any, item: any) => acc + (item.value || 0),
          0,
        );
        setDashboardTotals((prev) => ({
          ...prev,
          totalProjects,
        }));
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      }
    };
    if (hasFetchedAllProjectDetails.current) {
      return;
    } else {
      fetchProgressReportData();
    }
  }, []);

  useEffect(() => {
    const isAnyFilterApplied = () =>
      selectedFilters.managers.length > 0 ||
      selectedFilters.platforms.length > 0 ||
      selectedFilters.phases.length > 0;

    if (isAnyFilterApplied()) {
      fetchFilteredProjectsForCharts();
    } else {
      setFilteredProjectDonut(null);
      setDashboardTotals((prev) => ({
        ...prev,
        totalProjects: progressReportData.reduce((acc, item) => acc + (item.value || 0), 0),
      }));
    }
  }, [
    selectedFilters.managers,
    selectedFilters.platforms,
    selectedFilters.phases,
    progressReportData,
  ]);

  const fetchFilteredProjectsForCharts = async () => {
    try {
      const selectedManagers = selectedFilters.managers.map((m) => m.label);
      if (selectedManagers.length === 0) {
        console.warn("No manager selected for filtering.");
        return;
      }

      const filteredProjects = projects.filter((project: any) =>
        selectedManagers.includes(project.STAFF_VP),
      );

      let preProdCount = 0;
      let prodCount = 0;
      let nonProdCount = 0;

      filteredProjects.forEach((project: any) => {
        const env = project.DERIVED_ENV?.toLowerCase();
        if (env === "pre-prod" || env === "preprod") {
          preProdCount++;
        } else if (env === "prod") {
          prodCount++;
        } else {
          nonProdCount++;
        }
      });

      const donutData = [
        {
          name: "Prod",
          value: prodCount,
          color: "#1e5ae6",
        },
        {
          name: "Pre-Prod",
          value: preProdCount,
          color: "#17a19c",
        },
        {
          name: "Non-Prod",
          value: nonProdCount,
          color: "#64748b",
        },
      ];

      //filter donatData and pass non zero value only
      const filterDonatData = donutData.length > 0 ? donutData.filter(item => item.value !== 0) : [];

      setFilteredProjectDonut(filterDonatData);
      setDashboardTotals((prev) => ({
        ...prev,
        totalProjects: filteredProjects.length,
      }));
    } catch (error) {
      console.error("Failed to fetch or filter project data:", error);
    }
  };

  const handleMultiSelectChange = async (
    field: "managers" | "platforms" | "phases",
    selectedItems: any[],
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [field]: selectedItems ?? [],
    }));

    if (field === "managers") {
      if (selectedItems.length === 0) {
        setStaffVpCostData([]);
        // Reset to default total cost
        setDashboardTotals((prev) => ({
          ...prev,
          totalCost: dashboardData.costs.reduce((acc, item) => acc + item.value, 0),
        }));
      } else {
        try {
          const selectedVpNames = selectedItems.map((m) => m.label);
          const apiData = await ApiService.getAllStaffVpDetails();

          // Filter only selected managers
          const filtered = apiData.filter((item: any) =>
            selectedVpNames.includes(item.STAFF_VP)
          );
          if (filtered.length === 0) {
            setStaffVpCostData([]);
            setDashboardTotals((prev) => ({
              ...prev,
              totalCost: 0,
            }));
            setShowNoCostModal(true);
            return;
          }

          // Aggregate costs by month
          const monthMap = new Map<string, number>();

          filtered.forEach((item: any) => {
            const month = item.NAME?.substring(0, 3); // Use 'NAME' for month
            const currentValue = monthMap.get(month) || 0;
            const value = Number(item.VALUE) || 0;
            monthMap.set(month, currentValue + value);
          });

          const colorPalette = [
            "#1e5ae6", "#17a19c", "#64748b", "#f59f05",
            "#3399ff", "#ff5733", "#8e44ad", "#00b894",
            "#e17055", "#6c5ce7", "#fab1a0", "#ffeaa7"
          ];

          const monthOrder = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];

          const formatted = monthOrder
            .filter((month) => monthMap.has(month))
            .map((month, i) => ({
              name: month,
              value: parseFloat(monthMap.get(month)!.toFixed(2)),
              color: colorPalette[i % colorPalette.length],
            }));

          setStaffVpCostData(formatted);

          const totalFilteredCost = formatted.reduce((acc, cur) => acc + cur.value, 0);
          setDashboardTotals((prev) => ({
            ...prev,
            totalCost: totalFilteredCost,
          }));
        } catch (error) {
          console.error("Failed to transform VP cost data:", error);
        }
      }
    }
  };

  const captureAllCharts = async () => {
    const chartImages = await Promise.all([
      { title: 'Projects by Status', ref: chartRefs.status },
      { title: 'Projects by Platform', ref: chartRefs.platform },
      { title: 'Projects by BU', ref: chartRefs.bu },
      { title: 'Projects by Fund Type', ref: chartRefs.fundType },
      { title: 'Projects by Users', ref: chartRefs.users },
      { title: 'Projects by Cost', ref: chartRefs.cost },
    ].map(async ({ title, ref }) => {
      const dataUrl = await toPng(ref.current!);
      return { title, dataUrl };
    }));

    return chartImages;
  };

  const captureGanttSlides = async () => {
    const ganttSlides: GanttManagerSlide[] = [];

    const managers = Array.from(new Set(projects.map((p) => p.STAFF_VP))).filter(Boolean);

    for (const manager of managers) {
      const managerProjects: projectDetails[] = projects
        .filter((p) => p.STAFF_VP === manager)
        .map((p, idx) => ({
          ...p,
          SL_NO: typeof p.SL_NO === "string" ? Number(p.SL_NO) || idx + 1 : p.SL_NO,
        }));

      ganttSlides.push({
        manager,
        projectList: managerProjects.map((p) => p.PROJECT_NAME),
      });
    }

    return ganttSlides;
  };

  const handleDownloadPresentation = async () => {
    setIsDownloading(true);
    try {
      const chartImages = await captureAllCharts();
      const ganttSlides = await captureGanttSlides();
      await downloadDashboardPPT(chartImages, ganttSlides, projectDetails);
    } catch (error) {
      console.error("Failed to generate presentation:", error);
    } finally {
      setIsDownloading(false);
    }
  };


  useEffect(() => {
    if (projects.length > 0) {
      const uniqueManagers = Array.from(new Set(projects.map((item) => item.STAFF_VP))).filter(
        Boolean,
      );
      const uniquePlatforms = Array.from(new Set(projects.map((item) => item.LLM_PLATFORM))).filter(
        Boolean,
      );
      const uniquePhases = Array.from(new Set(projects.map((item) => item.CURRENT_PHASE))).filter(
        Boolean,
      );

      setDropdownOptions({
        managers: uniqueManagers.map((manager, index) => ({
          id: String(index + 1),
          label: manager,
        })),
        platforms: uniquePlatforms.map((platform, index) => ({
          id: String(index + 1),
          label: platform,
        })),
        phases: uniquePhases.map((phase, index) => ({ id: String(index + 1), label: phase })),
      });
    }
  }, [projects]);

  useEffect(() => {
    setSelectedFilters({
      managers: [],
      platforms: [],
      phases: [],
    });
  }, [projects]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        hasFetchedGanttChart.current = true;
        const apiData = await ApiService.getAllDetailsGanttChart();
        const yearsSet = new Set<number>();

        apiData.forEach((item: any) => {
          const startYear = new Date(item.START_DT).getFullYear();
          const endYear = new Date(item.END_DT).getFullYear();
          yearsSet.add(startYear);
          yearsSet.add(endYear);
        });

        const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);
        setAvailableYears(sortedYears);
        if (sortedYears.length > 0) {
          setSelectedYear(sortedYears[sortedYears.length - 1]); // default to latest year
        }
      } catch (error) {
        console.error("Failed to fetch years from Gantt chart:", error);
      }
    };
    if (hasFetchedGanttChart.current) {
      return;
    } else {
      fetchYears();
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("project-link")) {
        const projectName = target.id;
        setModalProjectName(projectName);
        if (projectName) {
          setModalReady(true);
          setIsModalOpen(true);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <MainContainer>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>{t("dashboard.title")}</PageTitle>
          {/* <ButtonContainer style={{ display: "flex", gap: "1rem" }}>
            <Button
              size="lg"
              hasIconOnly
              title="Download Presentation"
              style={{ borderRadius: "6px", position: "relative", width: "48px", height: "48px" }}
              disabled={isDownloading}
              onClick={handleDownloadPresentation}
            >
              {isDownloading ? (
                <Loading withOverlay={false} small description="Downloading..." />
              ) : (
                <PresentationFile />
              )}
            </Button>

            <DropdownButton
              icon={<DocumentAdd />}
              label={t("home.createButtonText")}
              items={[
                { label: "CII SmartHelp", url: "https://sit1.evolve.antheminc.com" },
                { label: "Clara.ai", url: "https://sit1.evolve.antheminc.com" },
                { label: "EDM IntelliQ", url: "/" },
                { label: "Prov360", url: "/" },
                { label: "RMA.ai", url: "/" },
                { label: "IQT", url: "/" },
                { label: "Privia", url: "/" },
              ]}
            />
            <DropdownButton
              icon={<Dashboard />}
              label={t("home.frameworkButtonText")}
              items={[
                { label: "LLM Gateway", url: "/llm-gateway" },
                { label: "Data FlyWheel", url: "http://10.126.192.122:5020/" },
                { label: "RAG Chat Assist (Hedis)", url: "http://10.126.192.122:3020/" },
                { label: "Text2SQL (SafetyNet)", url: "http://10.126.192.122:3010/" },
                {
                  label: "Workflow Manager (ARB Scheduler)",
                  url: "https://arbassist.edagenaidev.awsdns.internal.das/",
                },
                {
                  label: "Semantic Router (ARB Assist)",
                  url: "https://arbassist.edagenaidev.awsdns.internal.das/",
                },
                { label: "Data Genie", url: "http://10.126.192.122:3040/" },
                { label: "Knowledge Graph (EDA Ontology)", url: "/" },
                { label: "Conversational Chat", url: "http://10.126.192.122:3050/" },
                { label: "FHIR Chat", url: "http://10.126.192.122:3090/" },
              ]}
            />
          </ButtonContainer> */}
        </HeaderContainer>

        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{t("dashboard.BreadcrumbHomeText")}</BreadcrumbItem>
        </Breadcrumb>

        <DashboardCardsWrapper>
          <Carousel width={containerWidth}>
            <DashboardCard
              title="Projects by Status"
              icon={<IbmCloudProjects size={20} />}
              subheading={`Total Projects: ${dashboardTotals.totalProjects}`}
            >
              <div ref={chartRefs.status}>
                <ProgressDonut data={filteredProjectDonut ?? progressReportData} />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Projects by Platform"
              icon={<Platforms size={20} />}
              subheading={`Total Platforms: ${dashboardTotals.totalPlatforms}`}
            >
              <div ref={chartRefs.platform}>
                <PieDonutChart data={dashboardData.platforms} />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Projects by BU"
              icon={<BusinessProcesses size={20} />}
              subheading={`Total BU Projects: ${dashboardTotals.totalBUProjects}`}
            >
              <div ref={chartRefs.bu}>
                <DashboardChart data={dashboardData.bus} />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Projects by Fund Type"
              icon={<DataCategorical size={20} />}
              subheading={`Total Funds: ${dashboardTotals.totalProgramTypes}`}
            >
              <div ref={chartRefs.fundType}>

                <ProgressDonut data={dashboardData.programTypes} />
              </div>
            </DashboardCard>


            <DashboardCard
              title="Projects by Users"
              icon={<UserMultiple size={20} />}
              subheading={`Total Users: ${dashboardTotals.totalUsers}`}
            >
              <div ref={chartRefs.users}>
                <MultipleBarChart data={dashboardData.users} />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Projects by Cortex Cost"
              icon={<DollarSign size={20} />}
              subheading={`Total Cost for the Projects: $${Math.round(
                dashboardTotals.totalCost,
              ).toLocaleString()}`}
            >
              <div ref={chartRefs.cost}>
                <DashboardChart
                  data={staffVpCostData.length > 0 ? staffVpCostData : dashboardData.costs}
                  isCurrency
                />
              </div>
            </DashboardCard>

          </Carousel>
        </DashboardCardsWrapper>

        {/* Projects Status Section */}
        <div className="mt-0 pt-6 pb-6 pl-1 pr-1 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Projects Status</h3>
          <div className="flex flex-wrap gap-4 items-end justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="w-[280px]">
                <label className="block mb-1 text-sm font-medium">Manager</label>
                <FilterableMultiSelect
                  id="manage-multiselect"
                  titleText=""
                  items={dropdownOptions.managers}
                  itemToString={(item) => (item ? item.label : "")}
                  placeholder="Search Manager Name"
                  selectionFeedback="top"
                  onChange={(event) => handleMultiSelectChange("managers", event.selectedItems)}
                />
              </div>

              <div className="w-[280px]">
                <label className="block mb-1 text-sm font-medium">Platform</label>
                <FilterableMultiSelect
                  id="platform-multiselect"
                  titleText=""
                  items={dropdownOptions.platforms}
                  itemToString={(item) => (item ? item.label : "")}
                  placeholder="Search Platform Name"
                  selectionFeedback="top"
                  onChange={(event) => handleMultiSelectChange("platforms", event.selectedItems)}
                />
              </div>

              <div className="w-[280px]">
                <label className="block mb-1 text-sm font-medium">Current Phase</label>
                <FilterableMultiSelect
                  id="phase-multiselect"
                  titleText=""
                  items={dropdownOptions.phases}
                  itemToString={(item) => (item ? item.label : "")}
                  placeholder="Search Phase"
                  selectionFeedback="top"
                  onChange={(event) => handleMultiSelectChange("phases", event.selectedItems)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center bg-blue-600 text-white rounded-lg px-6 py-2 gap-4">
                <button
                  onClick={() => {
                    const currentIndex = availableYears.indexOf(selectedYear);
                    if (currentIndex > 0) {
                      setSelectedYear(availableYears[currentIndex - 1]);
                      setIsChangedSelectedYears(true);
                    }
                  }}
                  disabled={availableYears.indexOf(selectedYear) === 0}
                  className="flex items-center justify-center disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-lg font-semibold">{selectedYear}</span>
                <button
                  onClick={() => {
                    const currentIndex = availableYears.indexOf(selectedYear);
                    if (currentIndex < availableYears.length - 1) {
                      setSelectedYear(availableYears[currentIndex + 1]);
                      setIsChangedSelectedYears(true);
                    }
                  }}
                  disabled={availableYears.indexOf(selectedYear) === availableYears.length - 1}
                  className="flex items-center justify-center disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProjectTimeline
          selectedFilters={selectedFilters}
          showAllYears={showAllYears}
          selectedYear={selectedYear}
          isChangedSelectedYears={isChangedSelectedYears}
          isModalOpen={isModalOpen}
          modalReady={modalReady}
          setIsModalOpen={() => setIsModalOpen(false)}
          modalProjectName={modalProjectName}
          projects={undefined}
        />
      </PageContainer>
      <ChatWidget />
      <Modal
  open={showNoCostModal}
  size="sm"
  modalHeading="No Cortex Cost Data"
  passiveModal={true}
  onRequestClose={() => setShowNoCostModal(false)}
>
  <p style={{ marginBottom: '1rem' }}>
    The selected manager(s) currently do not have any Cortex Cost data to display.
  </p>
</Modal>



    </MainContainer>
  );
}

export default DashboardContent;
