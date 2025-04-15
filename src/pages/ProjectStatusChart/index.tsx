import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { useNavigate } from "react-router-dom";

import { HeaderContainer, PageContainer, PageTitle } from "../styled.components";

function ProjectStatusChart() {
  const navigate = useNavigate();
  return (
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
  );
}

export default ProjectStatusChart;
