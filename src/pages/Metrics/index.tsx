import {
  Breadcrumb,
  BreadcrumbItem,
} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import { useWindowDimensions } from "utils/hooks";

function Metrics() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  return (
    <MainContainer>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Metrics</PageTitle>
        </HeaderContainer>
        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Metrics</BreadcrumbItem>
        </Breadcrumb>
        <div style={{ display: "flex", height: "70vh", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Coming Soon!!</h1>
          <p style={{ fontSize: "16px", color: "#6b7280", marginTop: "12px" }}>
            Exciting updates are on the way. Please check back later.
          </p>
        </div>
      </PageContainer>
    </MainContainer>
  );
}

export default Metrics;