import styled from "styled-components";

export const MainContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;

export const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${(props) => props.theme.space["20"]};
`;

export const HeaderContainer = styled.div`
  display: ${(props) => props.theme.display["flex"]};
  align-items: ${(props) => props.theme.alignItems["center"]};
  justify-content: ${(props) => props.theme.alignContent["space-between"]};
  margin-bottom: ${(props) => props.theme.space["16"]};
`;

export const PageTitle = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.Poppins},
    ${(props) => props.theme.fontFamily["Poppins"]};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  font-size: ${(props) => props.theme.fontSize["32"]};
  line-height: ${(props) => props.theme.lineHeight.lg};
  letter-spacing: ${(props) => props.theme.letterSpacing["0"]};
  color: ${(props) => props.theme.color.black};
`;

export const PageSection = styled.div`
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.pageSectionBorder};
  box-shadow: 0px 4px 4px 0px ${(props) => props.theme.color.pageSectionShadow};
  padding: ${(props) => props.theme.space["5"]};
  margin-top: ${(props) => props.theme.space["16"]};
  .tableHeader,
  .tableHeader th {
    background-color: ${(props) => props.theme.color.pageSectionBackground};
    color: ${(props) => props.theme.color.white};
  }
`;

export const PageSectionHeading = styled.div`
  // background-color: ${(props) => props.theme.color.pageSeactionHeader};
  color: ${(props) => props.theme.color.text};
  padding: ${(props) => props.theme.space["16"]} ${(props) => props.theme.space["16"]}
    ${(props) => props.theme.space["24"]} ${(props) => props.theme.space["16"]};
`;

export const TagLine = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: ${(props) => props.theme.lineHeight.md};
  padding: 0 10px;
  margin-left: 10px;
  display: flex;
  align-items: end;
  border-left: 1px solid #d2d2d2;
  width: 180px;
`;

export const ToggleContainer = styled.div`
  background: #2e4e95;
  border: 1px solid #637baf;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
