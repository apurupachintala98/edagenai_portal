import { Breadcrumb, BreadcrumbItem, Button } from "@carbon/react";
import { DocumentAdd, Help } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  HeaderContainer,
  MainContainer,
  PageContainer,
  PageSection,
  PageSectionHeading,
  PageTitle,
} from "../styled.components";
import {
  ButtonContainer,
  ChartImage,
  LeftSection,
  RightSection,
  TopSection,
} from "./styled.components";
import DataTable from "components/DataTable";
import Header from "components/Header";

import { useWindowDimensions } from "utils/hooks";

import { jobStatusHeaders, jobStatusRows, KPIHeaders, KPIRows } from "./mock";
import chartImage from "assests/images/chart.svg";
import { TypeProps } from "interface";

function Dashboard() {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <MainContainer height={height}>
      <Header zIndex="999" type={TypeProps.Fixed} isSearchEnabled={true} />
      <PageContainer>
        <HeaderContainer>
          <PageTitle>{t("dashboard.title")}</PageTitle>
        </HeaderContainer>
        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{t("dashboard.BreadcrumbHomeText")}</BreadcrumbItem>
        </Breadcrumb>
        {/* Top Layout */}
        <TopSection>
          <LeftSection>
            <DataTable title={t("dashboard.KPIHeaderText")} header={KPIHeaders} row={KPIRows} />
          </LeftSection>
          <RightSection>
            <PageSection>
              <PageSectionHeading>{t("dashboard.jobCompletionHeaderText")}</PageSectionHeading>
              <ChartImage src={chartImage} height={337} />
            </PageSection>
          </RightSection>
        </TopSection>
        {/* Top Layout */}
        {/* JOB Status Layout */}
        <DataTable
          title={t("dashboard.JobStatusHeaderText")}
          header={jobStatusHeaders}
          row={jobStatusRows}
        />
        {/* JOB Status Layout */}
      </PageContainer>
    </MainContainer>
  );
}

export default Dashboard;
