import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { HeaderContainer, PageContainer, PageTitle } from "../styled.components";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
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
    </PageContainer>
  );
}

export default Home;
