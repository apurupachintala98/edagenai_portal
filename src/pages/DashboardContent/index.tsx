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
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectTimeline from "../../components/ProjectTimeline";

const usersData = [
  { name: "Non-Prod", value: 35, color: 'hsl(var(--brand-blue))' },
  { name: "Pre-Pod", value: 30, color: 'hsl(var(--brand-teal))' },
  { name: "Prod", value: 10, color: 'hsl(var(--muted-foreground))' },
];

const updatedProgressReportData = [
  { name: 'Non-Prod', value: 42, color: 'hsl(var(--brand-blue))' },
  { name: 'Pre-Prod', value: 28, color: 'hsl(var(--brand-teal))' },
  { name: 'Prod', value: 30, color: 'hsl(var(--muted-foreground))' },
];

const cortexCostData = [
  { name: "Non-Prod", value: 497, value2: 0, color: 'hsl(var(--brand-blue))' },
  { name: "Pre-Pod", value: 2314, value2: 0, color: 'hsl(var(--brand-teal))' },
  { name: "Prod", value: 3100, value2: 0, color: 'hsl(var(--muted-foreground))' },
];

const managerOptions = [
  { id: "1", label: "Anil Kumar" },
  { id: "2", label: "Suman Dawn" },
  { id: "3", label: "Pradip Hazra" },
  { id: "4", label: "Apurupa Chintala" },
  { id: "5", label: "Nitish Patel" },
  { id: "6", label: "Richard Thompson" },
  { id: "7", label: "Rick Skelton" }
];

const currentPhase = [
  { id: "1", label: "Non-Prod" },
  { id: "2", label: "Pre-Prod" },
  { id: "3", label: "Prod" },
];

const platformOptions = [
  { id: "1", label: "Cortex" },
  { id: "2", label: "LLM Platform" },
];

function DashboardContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const [selectedManagers, setSelectedManagers] = useState<any[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<any[]>([]);


  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    inputRef.current?.focus();
    inputRef.current?.click();
  };

  return (
    <MainContainer height={height}>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>{t("dashboard.title")}</PageTitle>
          {/* <ButtonContainer>
            <Button kind="primary" size="lg" onClick={() => {}} renderIcon={DocumentAdd}>
              {t("home.createButtonText")}
            </Button>
            <Button kind="primary" size="lg" onClick={() => {}} renderIcon={Dashboard}>
              {t("home.frameworkButtonText")}
            </Button>
          </ButtonContainer> */}
          <ButtonContainer style={{ display: "flex", gap: "1rem" }}>
            <DropdownButton
              icon={DocumentAdd}
              label={t("home.createButtonText")}
              items= {[
                {label: "CII SmartHelp", url: "https://sit1.evolve.antheminc.com" },
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
              items= {[
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
        <DashboardCard title="Projects" subheading="42 Included EDA and EAI Teams">
          <ProgressDonut data={updatedProgressReportData} />
        </DashboardCard>

        <DashboardCard title="Users" subheading="66 Includes EDA and EAI Teams">
          <DashboardChart data={usersData} />
        </DashboardCard>

        <DashboardCard title="Cortex Cost" subheading="$6577 Provisioned Throughout Cost">
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
                items={managerOptions}
                itemToString={(item) => (item ? item.label : "")}
                placeholder="Search Manager Name"
                selectionFeedback="top"
                onChange={(event) => {
                  setSelectedManagers(event.selectedItems ?? []);
                }}
              />
            </div>

            <div className="w-[280px]">
              <label className="block mb-1 text-sm font-medium">Platform</label>
              <FilterableMultiSelect
                id="platform-multiselect"
                titleText=""
                items={platformOptions}
                itemToString={(item) => (item ? item.label : "")}
                placeholder="Search Platform Name"
                selectionFeedback="top"
                onChange={(event) => {
                  setSelectedPlatforms(event.selectedItems ?? []);
                }}
              />
            </div>

            <div className="w-[280px]">
              <label className="block mb-1 text-sm font-medium">Current Phase</label>
              <FilterableMultiSelect
                id="phase-multiselect"
                titleText=""
                items={currentPhase}
                itemToString={(item) => (item ? item.label : "")}
                placeholder="Search Phase"
                selectionFeedback="top"
                onChange={(event) => {
                  setSelectedPhase(event.selectedItems ?? []);
                }}
              />
            </div>
          </div>
          <div>

            <button
              onClick={handleOpen}
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              <span>2024–25</span>
              <ChevronRight size={16} className="opacity-60" />
            </button>
          </div>
        </div>
      </div>
      <ProjectTimeline />
    </MainContainer>
  );
}

export default DashboardContent;
