import { Breadcrumb, BreadcrumbItem, Dropdown, FilterableMultiSelect, Button, OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { useTranslation } from "react-i18next";
import { DropdownButton } from "components/DropdownButton";
import { useNavigate } from "react-router-dom";
import { Dashboard, DocumentAdd } from "@carbon/react/icons";
import DashboardChart from "components/DashboardChart"; // Bar chart
import ProgressDonut from "../../components/ProgressDonut/ProgressDonut";
import {
  HeaderContainer,
  MainContainer,
  PageContainer,
  PageTitle,
} from "../styled.components";
import { useWindowDimensions } from "utils/hooks";
import { DashboardCardsWrapper, ButtonContainer } from "./styled.components";
import DashboardCard from "pages/DashboardCard";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectTimeline from "../../components/ProjectTimeline";
import ApiService from "../../services/ApiService";
import { useProjectData } from "../../hooks/useProjectData";

const usersData = [
  { name: "Non-Prod", value: 31, color: 'hsl(var(--brand-blue))' },
  { name: "Pre-Pod", value: 28, color: 'hsl(var(--brand-teal))' },
  { name: "Prod", value: 7, color: 'hsl(var(--muted-foreground))' },
];

const cortexCostData = [
  { name: "January", value: 428.56, color: 'hsl(var(--brand-blue))' },
  { name: "February", value: 2313.92, color: 'hsl(var(--brand-teal))' },
  { name: "March", value: 5291.54, color: 'hsl(var(--muted-foreground))' },
  { name: "April", value: 1743.26, color: 'hsl(var(--warning))' },
];

function DashboardContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const [selectedFilters, setSelectedFilters] = useState({
    managers: [] as any[],
    platforms: [] as any[],
    phases: [] as any[],
  });
  const [progressReportData, setProgressReportData] = useState<any[]>([]);
  const [dashboardTotals, setDashboardTotals] = useState({
    totalProjects: 0,
    totalUsers: 0,
    totalCost: 0,
  });
  const [dropdownOptions, setDropdownOptions] = useState({
    managers: [] as any[],
    platforms: [] as any[],
    phases: [] as any[],
  });
  const { projects, loading, fetchProjects } = useProjectData();
  const [showAllYears, setShowAllYears] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOpen = () => {
    inputRef.current?.focus();
    inputRef.current?.click();
  };

  useEffect(() => {
    const totalUsers = usersData.reduce((acc, item) => acc + (item.value || 0), 0);
    const totalCost = cortexCostData.reduce((acc, item) => acc + (item.value || 0), 0);

    setDashboardTotals((prev) => ({
      ...prev,
      totalUsers,
      totalCost,
    }));
  }, []);

  useEffect(() => {
    const fetchProgressReportData = async () => {
      try {
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

    fetchProgressReportData();
  }, []);

  const handleMultiSelectChange = (field: "managers" | "platforms" | "phases", selectedItems: any[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [field]: selectedItems ?? [],
    }));
  };

  useEffect(() => {
    if (projects.length > 0) {
      const uniqueManagers = Array.from(new Set(projects.map((item) => item.STAFF_VP))).filter(Boolean);
      const uniquePlatforms = Array.from(new Set(projects.map((item) => item.LLM_PLATFORM))).filter(Boolean);
      const uniquePhases = Array.from(new Set(projects.map((item) => item.STATUS))).filter(Boolean);

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

  return (
    <MainContainer height={height}>
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
          <BreadcrumbItem isCurrentPage>
            {t("dashboard.BreadcrumbHomeText")}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageContainer>

      {/* 3-Column Layout for Charts */}
      <DashboardCardsWrapper>
        <DashboardCard title="Projects" subheading={`${dashboardTotals.totalProjects} Included all Projects`}>
          <ProgressDonut data={progressReportData} />
        </DashboardCard>

        <DashboardCard title="Users" subheading={`${dashboardTotals.totalUsers} Includes all Users`}>
          <DashboardChart data={usersData} />
        </DashboardCard>

        <DashboardCard title="Cortex Cost" subheading={`$${dashboardTotals.totalCost.toFixed(2)} Provisioned Throughout Cost`}>
          <DashboardChart data={cortexCostData} />
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

            {/* <button
              onClick={handleOpen}
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              <span>2024–25</span>
              <ChevronRight size={16} className="opacity-60" />
            </button> */}
            <button
              onClick={() => setShowAllYears(true)}
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              <span>2025</span>
              <ChevronRight size={16} className="opacity-60" />
            </button>

          </div>
        </div>
      </div>
      <ProjectTimeline 
  selectedFilters={selectedFilters} 
  showAllYears={showAllYears} 
/>
    </MainContainer>
  );
}

export default DashboardContent;
