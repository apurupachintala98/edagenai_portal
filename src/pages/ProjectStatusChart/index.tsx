import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { useNavigate } from "react-router-dom";

import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";

import { useWindowDimensions } from "utils/hooks";

function ProjectStatusChart() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  return (
    <MainContainer>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Project Status Chart</PageTitle>
        </HeaderContainer>
        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Project Status Chart</BreadcrumbItem>
        </Breadcrumb>
      </PageContainer>
    </MainContainer>
  );
}

export default ProjectStatusChart;
