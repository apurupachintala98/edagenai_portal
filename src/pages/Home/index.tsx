import { ArrowRight } from "@carbon/react/icons";
import { useNavigate } from "react-router-dom";

import {
  CenteredContent,
  WelcomeText,
  MainTitle,
  SubText,
  EnterButton,
  TextBox
} from "./styled.components";
import Header from "components/Header";
import { TypeProps } from "interface";
import backgroundVideo from "assests/videos/home-bg.mp4";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          // opacity: 0.9,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, height: "100%", width: "100%" }}>
        <Header zIndex="999" type={TypeProps.Fixed} isSearchEnabled={true} sidebarType="mini" />

        <CenteredContent>
          <TextBox>
            <WelcomeText>Welcome to the</WelcomeText>
            <MainTitle>Elevance Data <br />Intelligence Platform</MainTitle>
            <SubText>
              Unlock innovation with Generative AI solutions. Empower with cutting-edge AI solutions
              using our<br /> state-of-the-art platforms, architectures, and frameworks. From guidance on AI
              taskforce reviews<br /> to seamless project tracking, we’re here to drive success at every
              step.
            </SubText>
            <EnterButton onClick={() => navigate("/dashboard")}>
              Enter <ArrowRight />
            </EnterButton>
          </TextBox>
        </CenteredContent>
      </div>
    </div>
  );
}

export default Home;

