import styled from "styled-components";

export const AppContainer = styled.div`
  text-align: left;
  padding: 0 20px;
`;

export const ButtonContainer = styled.div`
  display: ${(props) => props.theme.display["flex"]};
  column-gap: ${(props) => props.theme.space["10"]};
`;

export const TopSection = styled.div`
  display: ${(props) => props.theme.display["flex"]};
  column-gap: ${(props) => props.theme.space["10"]};
`;

export const LeftSection = styled.div`
  width: 70%;
`;

export const RightSection = styled.div`
  width: 30%;
`;

export const ChartImage = styled.div<{ src?: string; height: number }>`
  width: ${(props) => props.theme.width["full"]};
  ${(p) => p.src && `background-image: url(${p.src})`};
  background-repeat: no-repeat;
  background-size: contain;
  ${(p) => p.height && `height: ${p.height}px`};
  background-position: center center;
  background-color: ${(props) => props.theme.color.white};
`;

// New additions (for filter icons and overflow menu customizations)

export const FilterIconActive = styled.div`
  svg,
  svg path,
  svg g {
    fill: #0f62fe !important;
  }
`;

export const FilterIconDefault = styled.div`
  svg,
  svg path,
  svg g {
    fill: #525252 !important;
  }
`;

export const CustomOverflowMenu = styled.div`
  .cds--menu-item:first-child,
  .cds--menu-item:first-child:hover,
  .cds--menu-item:first-child:focus {
    background-color: transparent !important;
    outline: none !important;
  }

  .cds--checkbox-label::before {
    background-color: #ffffff !important;
    border: 1px solid #dfe3e6 !important;
    box-shadow: none !important;
  }

  .cds--checkbox-label:focus::before {
    box-shadow: none !important;
    outline: none !important;
  }

  .cds--checkbox:checked + .cds--checkbox-label::before {
    background-color: #0f62fe !important;
    border-color: #0f62fe !important;
  }

  .cds--checkbox:checked + .cds--checkbox-label::after {
    border-color: #ffffff !important;
  }

  .cds--checkbox:not(:checked) + .cds--checkbox-label::before {
    background-color: #ffffff !important;
  }

  .cds--menu-item:hover,
  .cds--menu-item:focus {
    background-color: transparent !important;
  }
`;