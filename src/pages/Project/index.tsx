import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { useNavigate } from "react-router-dom";

import { HeaderContainer, PageContainer, PageTitle } from "../styled.components";

function Project() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle>Project</PageTitle>
      </HeaderContainer>
      <Breadcrumb>
        <BreadcrumbItem>
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
            Home
          </div>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Project</BreadcrumbItem>
      </Breadcrumb>
    </PageContainer>
  );
}

export default Project;
