import { useTranslation } from "react-i18next";

import {
  AuthContainer,
  AvatarImage,
  Container,
  Logo,
  LogoutContainer,
  RightHeaderContainer,
  SearchField,
} from "./styled.components";

import { checkValidUserInfo } from "utils/common/index";
import { useLogout } from "utils/hooks";

import avatar from "assests/images/avatar.svg";
import LogoImg from "assests/images/Logo.svg";
import { useAuth } from "contexts/AuthContext";
import { HeaderProps, TypeProps } from "interface";

function Header({ zIndex, type = TypeProps.Auto, isSearchEnabled = false }: HeaderProps) {
  const { t } = useTranslation();
  const { isAuthenticated, userInfo } = useAuth();
  const { handleLogout } = useLogout();

  console.log("isAuthenticated::", isAuthenticated);

  return (
    <Container zIndex={zIndex} type={type}>
      <Logo src={LogoImg} alt="logo" />
      {(isSearchEnabled || isAuthenticated) && (
        <RightHeaderContainer>
          {isSearchEnabled && (
            <SearchField
              labelText={t("header.searchPlaceholder")}
              placeholder={t("header.searchPlaceholder")}
            />
          )}
          {isAuthenticated && checkValidUserInfo(userInfo) && (
            <AuthContainer>
              {t("header.welcomeText")} {userInfo.user.username}!
              <AvatarImage src={avatar} width={25} height={25} />
              <LogoutContainer onClick={handleLogout}>{t("header.logoutText")}</LogoutContainer>
            </AuthContainer>
          )}
        </RightHeaderContainer>
      )}
    </Container>
  );
}
export default Header;
