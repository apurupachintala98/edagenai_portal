import styled from "styled-components";

export const AppContainer = styled.div`
  text-align: left;
  padding: 0 20px;
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

export const CenteredContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; 
  max-width: 1048px;
  padding: 0 16px;
  width: 100%;
`;

export const WelcomeText = styled.div`
  color: #fff;
  font-family: Poppins, sans-serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 80px;
`;

export const MainTitle = styled.div`
  color: #bae6ff;
  font-family: Poppins, sans-serif;
  font-size: 70px;
  font-style: normal;
  font-weight: 500;
  line-height: 80px;
  margin-bottom: 16px;
`;

export const SubText = styled.p`
  color: #fff;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 32px;
`;

export const EnterButton = styled.button`
  display: inline-flex;
  align-items: center; 
  justify-content: center;
  gap: 8px; 
  width: 116px;
  height: 45px;
  border-radius: 6px;
  border: 1px solid #1d5ae6;
  background: #fff;
  color: #1d5ae6;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  cursor: pointer;
`;


export const TextBox = styled.div`
  background: transparent;
  padding: 16px;
`;
