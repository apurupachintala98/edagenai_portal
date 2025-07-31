import { Modal, TextInput } from "@carbon/react";
import {
  Analytics,
  Dashboard as DashboardIcon,
  IbmCloudProjects,
  SidePanelClose,
  SidePanelOpenFilled,
  UserAdmin,
  View,
  ViewOff,
} from "@carbon/react/icons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

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
import { useAuth } from "contexts/AuthContext";
import { TypeProps } from "interface";
import Admin from "pages/Admin/index";
import DashboardContent from "pages/DashboardContent";
import Metrics from "pages/Metrics";
import Project from "pages/Project/index";
import ProjectDetails from "pages/ProjectDetails";
import { useResizeObserver } from "hooks/useResizeObserver";

type MenuItem = {
  text: string;
  icon: React.ReactElement;
  id: string;
  submenu?: boolean;
};

const drawerWidth = {
  full: 309,
  mini: 80,
};

type SizeKey = "full" | "mini";

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { verifyAdminPassword } = useAuth();
  const [sidebarType, setSidebarType] = useState<SizeKey>("full");
  const collapsed = sidebarType === "mini";
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showAdminSubmenu, setShowAdminSubmenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("project");

  const containerRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useResizeObserver(containerRef);

  useEffect(() => {
    const checkLocalVal = localStorage.getItem("edp_checkAdmin");
    if (checkLocalVal) {
      setShowAdminSubmenu(true);
      setIsAdminPopupOpen(false);
    }
  }, []);

  const handleMenuItemClick = (itemId: string) => {
    if (itemId === "admin") {
      if (!showAdminSubmenu) {
        setIsAdminPopupOpen(true);
      }
      return;
    }
    setCurrentTab(itemId);
    navigate("/dashboard");
  };

  const menuItems: MenuItem[] = [
    { text: "Dashboard", icon: <DashboardIcon size={20} />, id: "dashboard" },
    { text: "Admin", icon: <UserAdmin size={20} />, id: "admin" },
  ];

  if (showAdminSubmenu) {
    menuItems.push(
      { text: "Project", icon: <IbmCloudProjects size={20} />, id: "project", submenu: true },
      { text: "Metrics", icon: <Analytics size={20} />, id: "metrics", submenu: true },
    );
  }

  useEffect(() => {
    if (projectName) {
      if (projectName === "all") {
        setCurrentTab("dashboard");
      } else {
        setCurrentTab("projectDetails");
      }
    }
  }, [projectName]);

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
              <TagLine>
                {currentTab === "dashboard"
                  ? "Data Intelligence Platform"
                  : "Elevance Data Intelligence Platform Dashboard"}
              </TagLine>
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
                pl: item.submenu ? 6 : 2,
                pointerEvents: item.id === "admin" && showAdminSubmenu ? "none" : "auto",
                textDecoration: "none",
                bgcolor: currentTab === item.id ? "#A6C8FF" : "inherit",
                color: currentTab === item.id ? "#000000" : "#fff",
                "&:hover":
                  item.id === "admin" && showAdminSubmenu
                    ? {}
                    : {
                        bgcolor: "#A6C8FF",
                        color: "#000000",
                        svg: {
                          bgcolor: "#A6C8FF",
                          color: "#000000",
                        },
                      },
              }}
              style={{
                borderBottom: "1px solid #A6C8FF4D",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  pl: item.submenu ? 1 : 0,
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
          currentTab={currentTab}
          dynamicWidth={containerRef}
        />
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 10,
          // backgroundColor: "background.default",
          transition: "margin 0.3s ease",
        }}
      >
        {currentTab === "dashboard" && <DashboardContent containerWidth={containerWidth} />}
        {currentTab === "admin" && <Admin />}
        {currentTab === "project" && <Project />}
        {currentTab === "metrics" && <Metrics />}
        {currentTab === "projectDetails" && <ProjectDetails />}
      </Box>

      <Modal
        open={isAdminPopupOpen}
        modalHeading="Admin Panel"
        primaryButtonText="Submit"
        size="xs"
        secondaryButtonText="Cancel"
        onRequestClose={() => setIsAdminPopupOpen(false)}
        onRequestSubmit={async () => {
          const valid = await verifyAdminPassword(adminPassword); // or custom logic
          if (valid) {
            setShowAdminSubmenu(true);
            setIsAdminPopupOpen(false);
            setAdminError("");
          } else {
            setAdminError("Enter the correct admin password to proceed further");
          }
        }}
      >
        {/* <TextInput
          id="admin-password"
          type="password"
          labelText="Please validate your password to proceed."
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        /> */}
        <div style={{ position: "relative" }}>
          <TextInput
            id="admin-password"
            type={showPassword ? "text" : "password"}
            labelText="Please validate your password to proceed."
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            style={{ paddingRight: "2rem" }} // give space for the icon
          />
          <div
            style={{
              position: "absolute",
              top: "69%",
              right: "12px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <ViewOff size={16} /> : <View size={16} />}
          </div>
        </div>
        {adminError && <div style={{ color: "red", marginTop: "8px" }}>{adminError}</div>}
      </Modal>
    </Box>
  );
}

export default Dashboard;
