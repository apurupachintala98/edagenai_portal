import { Breadcrumb, BreadcrumbItem, Button } from "@carbon/react";
import { Dashboard, DocumentAdd } from "@carbon/react/icons";
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

function Home() {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const navigate = useNavigate();
  return (
    <MainContainer height={height}>
      <Header zIndex="999" type={TypeProps.Fixed} isSearchEnabled={true} />
      <PageContainer>
        <HeaderContainer>
          <PageTitle>{t("home.title")}</PageTitle>
          <ButtonContainer>
            <Button kind="primary" size="lg" onClick={() => {}} renderIcon={DocumentAdd}>
              {t("home.createButtonText")}
            </Button>
            <Button
              kind="secondary"
              size="lg"
              onClick={() => navigate("/dashboard")}
              renderIcon={Dashboard}
              className="helpButton"
            >
              {t("home.helpButtonText")}
            </Button>
          </ButtonContainer>
        </HeaderContainer>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>{t("home.BreadcrumbHomeText")}</BreadcrumbItem>
        </Breadcrumb>
      </PageContainer>
    </MainContainer>
  );
}

export default Home;
