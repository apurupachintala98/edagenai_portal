import { useTranslation } from "react-i18next";

import {
  AuthContainer,
  AvatarImage,
  Container,
  Logo,
  LogoContainer,
  LogoutContainer,
  RightHeaderContainer,
  SearchField,
  TagLine,
} from "./styled.components";

import { checkValidUserInfo } from "utils/common/index";
import { useLogout } from "utils/hooks";
import { Home } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import avatar from "assests/images/avatar.svg";
import LogoImg from "assests/images/Logo.svg";
import { useAuth } from "contexts/AuthContext";
import { HeaderProps, TypeProps } from "interface";

function Header({
  zIndex,
  type = TypeProps.Auto,
  isSearchEnabled = false,
  sidebarType = "full",
  currentTab = "",
  dynamicWidth
}: HeaderProps) {
  const { t } = useTranslation();
  const { isAuthenticated, userInfo } = useAuth();
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  return (
    <Container zIndex={zIndex} type={type} ref={dynamicWidth}>
      <div>
        <LogoContainer>
          {/* <Logo src={LogoImg} alt="logo" /> */}
          {/* <TagLine>
              {currentTab === "dashboard"
                ? "Data Intelligence Platform"
                : "Elevance Data Intelligence Platform Dashboard"}
            </TagLine> */}
          <TagLine>
            Data Intelligence Platform
          </TagLine>
        </LogoContainer>
      </div>
      <div>
        <RightHeaderContainer>
          <AuthContainer>
            <Home
              size={24}
              style={{ cursor: "pointer", marginLeft: "1rem" }}
              onClick={() => navigate("/")}
            />
          </AuthContainer>
        </RightHeaderContainer>
      </div>
    </Container>
  );
}
export default Header;
