import { Breadcrumb, BreadcrumbItem, Button, Dropdown, FilterableMultiSelect, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { Dashboard, DocumentAdd } from "@carbon/react/icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFilteredProgressData } from "../../hooks/useFilteredProgressData";
import ProgressDonut from "../../components/ProgressDonut/ProgressDonut";
import ProjectTimeline from "../../components/ProjectTimeline";
import {
  HeaderContainer,
  MainContainer,
  PageContainer,
  PageTitle,
} from "../styled.components";
import { ButtonContainer, DashboardCardsWrapper } from "./styled.components";
import DashboardChart from "components/DashboardChart"; // Bar chart
import { DropdownButton } from "components/DropdownButton";

import ApiService from "../../services/ApiService";

import { useWindowDimensions } from "utils/hooks";

import { useProjectData } from "../../hooks/useProjectData";

import DashboardCard from "pages/DashboardCard";
import { Label } from "recharts";

function DashboardContent() {
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
  });
  const [progressReportData, setProgressReportData] = useState<any[]>([]);
  const [dashboardTotals, setDashboardTotals] = useState({
    totalProjects: 0,
    totalUsers: 0,
    totalCost: 0,
  });
  const {
    progressData,
    totalProjects,
    rawProjectData,
    filterAndSetProgressData,
    loadAndFilterProjectData,
  } = useFilteredProgressData();

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

  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpen = () => {
    inputRef.current?.focus();
    inputRef.current?.click();
  };
  const hasFetchedAllProjectDetails = useRef<boolean>(false);
  const hasFetchedGanttChart = useRef<boolean>(false);

  useEffect(() => {
    const fetchDashboardUsersAndCosts = async () => {
      try {
        console.log("Fetching dashboard users and cost details...");

        const [usersRes, costRes] = await Promise.all([
          ApiService.getAllUsersDetails(),
          ApiService.getAllCostsDetails(),
        ]);

        console.log("Raw Users Response:", usersRes);
        console.log("Raw Costs Response:", costRes);

        const colorPalette = [
          'hsl(var(--brand-blue))',
          'hsl(var(--brand-teal))',
          'hsl(var(--muted-foreground))',
          'hsl(var(--warning))',
          'hsl(var(--brand-blue-light))',
        ];

        const usersWithColor = usersRes.map((item: any, index: number) => ({
          name: item.NAME || `User ${index + 1}`,
          value: Number(item.VALUE) || 0,
          color: colorPalette[index % colorPalette.length],
        }));

        const costsWithColor = costRes.map((item: any, index: number) => ({
          name: item.NAME || `Month ${index + 1}`,
          value: Number(item.VALUE) || 0,
          color: colorPalette[index % colorPalette.length],
        }));

        console.log("Formatted Users Data:", usersWithColor);
        console.log("Formatted Costs Data:", costsWithColor);

        setDashboardData({
          users: usersWithColor,
          costs: costsWithColor,
        });

        const totalUsers = usersWithColor.reduce((acc: number, item: any) => acc + item.value, 0);
        const totalCost = costsWithColor.reduce((acc: number, item: any) => acc + item.value, 0);

        console.log("Calculated Total Users:", totalUsers);
        console.log("Calculated Total Cost:", totalCost);

        setDashboardTotals((prev) => ({
          ...prev,
          totalUsers,
          totalCost,
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
        console.log(apiData);

        const coloredData = apiData.map((item: any, index: number) => ({
          name: item.NAME,
          value: item.VALUE,
          color:
            index % 3 === 0
              ? 'hsl(var(--brand-blue))'
              : index % 3 === 1
                ? 'hsl(var(--brand-teal))'
                : 'hsl(var(--muted-foreground))',
        }));

        setProgressReportData(coloredData);
        const totalProjects = coloredData.reduce((acc: any, item: any) => acc + (item.value || 0), 0);
        setDashboardTotals((prev) => ({
          ...prev,
          totalProjects,
        }));
        console.log(coloredData);
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

const fetchFilteredProjectsByManager = async () => {
  try {
    const selectedManagers = selectedFilters.managers.map((m) => m.label);

    if (selectedManagers.length === 0) {
      console.warn("No manager selected for filtering.");
      return;
    }

    const filteredProjects = projects.filter((project: any) =>
      selectedManagers.includes(project.STAFF_VP)
    );

    console.log("Filtered Projects by Manager:", filteredProjects);

    // Count environments
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

    console.log("Pre-Prod Count:", preProdCount);
    console.log("Prod Count:", prodCount);
    console.log("Non-Prod Count:", nonProdCount);
    console.log("Total Filtered Projects:", filteredProjects.length);

  } catch (error) {
    console.error("Failed to fetch or filter project data:", error);
  }
};



  // const handleMultiSelectChange = (field: "managers" | "platforms" | "phases", selectedItems: any[]) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [field]: selectedItems ?? [],
  //   }));
  // };
 const handleMultiSelectChange = (field: "managers" | "platforms" | "phases", selectedItems: any[]) => {
  setSelectedFilters((prev) => {
    const newFilters = {
      ...prev,
      [field]: selectedItems ?? [],
    };

    // Trigger filter only when manager selection changes
    if (field === "managers") {
      setTimeout(() => fetchFilteredProjectsByManager(), 0);
    }

    return newFilters;
  });
};

  useEffect(() => {
    if (projects.length > 0) {
      const uniqueManagers = Array.from(new Set(projects.map((item) => item.STAFF_VP))).filter(Boolean);
      const uniquePlatforms = Array.from(new Set(projects.map((item) => item.LLM_PLATFORM))).filter(Boolean);
      const uniquePhases = Array.from(new Set(projects.map((item) => item.CURRENT_PHASE))).filter(Boolean);

      setDropdownOptions({
        managers: uniqueManagers.map((manager, index) => ({ id: String(index + 1), label: manager })),
        platforms: uniquePlatforms.map((platform, index) => ({ id: String(index + 1), label: platform })),
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

  return (
    <MainContainer>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>{t("dashboard.title")}</PageTitle>
          <ButtonContainer style={{ display: "flex", gap: "1rem" }}>
            <DropdownButton
              icon={DocumentAdd}
              label={t("home.createButtonText")}
              items={[
                { label: "CII SmartHelp", url: "https://sit1.evolve.antheminc.com" },
                { label: "Clara.ai", url: "https://sit1.evolve.antheminc.com" },
                { label: "EDM IntelliQ", url: "/" },
                { label: "Prov360", url: "/" },
                { label: "RMA.ai", url: "/" },
                { label: "IQT", url: "/" },
                { label: "Privia", url: "/" }]}

            />
            <DropdownButton
              icon={Dashboard}
              label={t("home.frameworkButtonText")}
              items={[
                { label: "LLM Gateway", url: "/llm-gateway" },
                { label: "Data FlyWheel", url: "http://10.126.192.122:5020/" },
                { label: "RAG Chat Assist (Hedis)", url: "http://10.126.192.122:3020/" },
                { label: "Text2SQL (SafetyNet)", url: "http://10.126.192.122:3010/" },
                { label: "Workflow Manager (ARB Scheduler)", url: "https://arbassist.edagenaidev.awsdns.internal.das/" },
                { label: "Semantic Router (ARB Assist)", url: "https://arbassist.edagenaidev.awsdns.internal.das/" },
                { label: "Data Genie", url: "http://10.126.192.122:3040/" },
                { label: "Knowledge Graph (EDA Ontology)", url: "/" },
                { label: "Conversational Chat", url: "http://10.126.192.122:3050/" },
                { label: "FHIR Chat", url: "http://10.126.192.122:3090/" },
              ]}
            />
          </ButtonContainer>
        </HeaderContainer>

        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            {t("dashboard.BreadcrumbHomeText")}
          </BreadcrumbItem>
        </Breadcrumb>

        {/* 3-Column Layout for Charts */}
        <DashboardCardsWrapper>
          <DashboardCard title="Projects" subheading={`Total Projects : ${dashboardTotals.totalProjects}`}>
            <ProgressDonut data={progressReportData} />
          </DashboardCard>

          <DashboardCard title="Users" subheading={`Total Users: ${dashboardTotals.totalUsers}`}>
            <DashboardChart
              data={dashboardData.users}
            />
          </DashboardCard>

          <DashboardCard title="Cortex Cost" subheading={`Total Cost for the Projects : $${Math.round(dashboardTotals.totalCost).toLocaleString()}`}>            <DashboardChart
            data={dashboardData.costs}
            isCurrency
          />
          </DashboardCard>
        </DashboardCardsWrapper>

        {/* Projects Status Section */}
        <div className="mt-6 p-6 rounded-lg">
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
        />
      </PageContainer>


    </MainContainer>
  );
}

export default DashboardContent;

