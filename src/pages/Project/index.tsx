import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { useNavigate } from "react-router-dom";

import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";

import { useWindowDimensions } from "utils/hooks";

function Project() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  return (
    <MainContainer height={height}>
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
    </MainContainer>
  );
}

export default Project;
