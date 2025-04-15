import { Search } from "@carbon/react";

import styled from "styled-components";

export const Container = styled.div<{ zIndex?: string; type?: string }>`
  display: ${(props) => props.theme.display["flex"]};
  flex-direction: ${(props) => props.theme.display["row"]};
  background-color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.space["0"]} ${(props) => props.theme.space["24"]};
  align-items: ${(props) => props.theme.alignItems["center"]};
  height: ${(props) => props.theme.height["75"]};
  ${(p) => p.zIndex && `z-index: ${p.zIndex}`};
  /*box-shadow: 0px 7px 130px 0px ${(props) => props.theme.color.headerShadow};*/
  border-bottom: 1px solid ${(props) => props.theme.color.headerBorder};
  ${(p) =>
    p.type && p.type === "fixed"
      ? `position: ${p.theme.position["sticky"]}`
      : `position: ${p.theme.position["relative"]}`};
  ${(p) => p.type && p.type === "fixed" && `top: ${p.theme.space["0"]}`};
  justify-content: ${(props) => props.theme.justifyContent["space-between"]};
`;

export const Logo = styled.img`
  padding-right: ${(props) => props.theme.space["16"]};
  pointer-events: none;
  height: 3.2rem;
  width: 10.5rem;
`;

export const SearchField = styled(Search)`
  width: ${(props) => props.theme.width["350"]};
`;

export const RightHeaderContainer = styled.div`
  display: ${(props) => props.theme.display["flex"]};
  flex-direction: ${(props) => props.theme.display["row"]};
  justify-content: ${(props) => props.theme.justifyContent["space-between"]};
  column-gap: ${(props) => props.theme.space["20"]};
  align-items: ${(props) => props.theme.alignItems["center"]};
`;

export const AvatarImage = styled.img`
  ${(p) => p.height && `height: ${p.height}px`};
  ${(p) => p.width && `width: ${p.width}px`};
`;

export const AuthContainer = styled.div`
  display: ${(props) => props.theme.display["flex"]};
  flex-direction: ${(props) => props.theme.display["row"]};
  justify-content: ${(props) => props.theme.justifyContent["space-between"]};
  column-gap: ${(props) => props.theme.space["14"]};
  align-items: ${(props) => props.theme.alignItems["center"]};
`;

export const LogoutContainer = styled.div`
  cursor: pointer;
`;
