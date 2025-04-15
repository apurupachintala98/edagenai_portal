import {
  Analytics,
  Dashboard as DashboardIcon,
  IbmCloudProjects,
  SidePanelClose,
  SidePanelOpenFilled,
} from "@carbon/react/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TagLine, ToggleContainer } from "../styled.components";
import { CopyrightText } from "./styled.components";
import Header from "components/Header";
import logo from "../../assests/images/logo.png";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TypeProps } from "interface";
import DashboardContent from "pages/DashboardContent";
import Project from "pages/Project";
import ProjectStatusChart from "pages/ProjectStatusChart";

const drawerWidth = {
  full: 350,
  mini: 80,
};

type SizeKey = "full" | "mini";

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sidebarType, setSidebarType] = useState<SizeKey>("full");

  const collapsed = sidebarType === "mini";

  const [currentTab, setCurrentTab] = useState("dashboard");

  const handleMenuItemClick = (itemId: string) => {
    setCurrentTab(itemId);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon size={20} />, id: "dashboard" },
    { text: "Project Status Chart", icon: <Analytics size={20} />, id: "chart" },
    { text: "Project", icon: <IbmCloudProjects size={20} />, id: "project" },
  ];
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth[sidebarType],
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth[sidebarType],
            transition: "width 0.3s ease",
            overflowX: "hidden",
            display: "flex",
            backgroundColor: "#1a3673",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            p: 2,
            marginLeft: "7px",
          }}
        >
          {!collapsed ? (
            <>
              <img src={logo} alt="Logo" style={{ height: "40px", width: "auto" }} />
              <TagLine>Elevance Data Intelligence Platform Dashboard</TagLine>
              <ToggleContainer onClick={() => setSidebarType("mini")}>
                <SidePanelClose size="20" />
              </ToggleContainer>
            </>
          ) : (
            <ToggleContainer onClick={() => setSidebarType("full")}>
              <SidePanelOpenFilled size="20" />
            </ToggleContainer>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "16px 0",
            marginLeft: "7px",
            fontWeight: "bold",
          }}
        ></Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleMenuItemClick(item.id)}
              sx={{
                textDecoration: "none",
                bgcolor: currentTab === item.id ? "#A6C8FF" : "inherit",
                color: currentTab === item.id ? "#000000" : "#fff",
                "&:hover": {
                  bgcolor: "#A6C8FF",
                  color: "#000000",
                  svg: {
                    bgcolor: "#A6C8FF",
                    color: "#000000",
                  },
                },
              }}
              style={{ borderBottom: "1px solid #A6C8FF4D", justifyContent: "center" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? "unset" : "48px",
                  color: currentTab === item.id ? "#000000" : "#fff",
                  "&:hover": {
                    bgcolor: "#A6C8FF",
                    color: "#000000",
                    svg: {
                      bgcolor: "#A6C8FF",
                      color: "#000000",
                    },
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
        {!collapsed && <CopyrightText>Copyright 2025, All Rights Reserved.</CopyrightText>}
      </Drawer>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1201,
          transition: "background-color 0.3s ease",
          width: `calc(100% - ${drawerWidth[sidebarType]}px)`,
          ml: `${drawerWidth[sidebarType]}px`,
        }}
      >
        <Header
          zIndex="999"
          type={TypeProps.Fixed}
          isSearchEnabled={false}
          sidebarType={sidebarType}
        />
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 10,
          backgroundColor: "background.default",
          transition: "margin 0.3s ease",
        }}
      >
        {currentTab === "dashboard" && <DashboardContent />}
        {currentTab === "chart" && <ProjectStatusChart />}
        {currentTab === "project" && <Project />}
      </Box>
    </Box>
  );
}

export default Dashboard;
