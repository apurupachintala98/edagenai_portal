import { useEffect, useRef, useState } from "react";

import ApiService from "../services/ApiService";

export interface projectDetails {
  PROGRAM_NAME: string;
  PROJECT_NAME: string;
  BU: string;
  OWNER_VP: string;
  MANAGER_DIRECTOR: string;
  LEAD_ARCHITECT: string;
  PLATFORM_NAME: string;
  MODEL: string;
  SERVICES: string;
  FUNCTIONALITY: string;
  DATA: string;
  CAPABILITY: string;
  BUSINESS_VALUE_ADD: string;
  STATUS: string;
  ETA: string;
  ARCHITECTURE: string;
  PLATFORM: string;
  FRAMEWORK: string;
  UI: string;
  DEVOPS: string;
  MCP: string;
  USAGE_METRICS: string;
  EFFORT_SAVED: string;
  SAVED: string;  
}

export function useProjectDetailsData() {
  const [projectDetails, setProjectDetails] = useState<projectDetails[]>([]);
  const [projectDetailLoading, setProjectDetailLoading] = useState(true);
  const hasFetchedProjectDetails = useRef<boolean>(false);

  useEffect(() => {
    if (hasFetchedProjectDetails.current) {
      return;
    } else {
      fetchProjectDetails();
    }
  }, []);

  const fetchProjectDetails = async () => {
    setProjectDetailLoading(true);
    try {
      hasFetchedProjectDetails.current = true;
      // const data = await ApiService.getAllProjectDetails();
      const data = [
        {
          PROGRAM_NAME: "Smart Help",
          PROJECT_NAME: "CII Smart Help 1",
          BU: "EDA",
          OWNER_VP: "Anil",
          MANAGER_DIRECTOR: "Krishnan",
          LEAD_ARCHITECT: "Ian",
          PLATFORM_NAME: "Cortex",
          MODEL: "Llama 3.3 70b",
          SERVICES: "Cortex Search",
          FUNCTIONALITY: "Assist in CII Measures",
          DATA: "Member, Claim, Employer",
          CAPABILITY: "RAG",
          BUSINESS_VALUE_ADD: "CII Users can get help with Chatbot on CII Metrics",
          STATUS: "Production ",
          ETA: "Q1 2024",
          ARCHITECTURE: "TRUE",
          PLATFORM: "TRUE",
          FRAMEWORK: "TRUE",
          UI: "FALSE",
          DEVOPS: "TRUE",
          MCP: "FALSE",
          USAGE_METRICS: "Released to core team ",
          EFFORT_SAVED: "20%",
          SAVED: "",
        },
      ];
      console.log("Fetched Projects:", data); // ← Add this for debugging
      setProjectDetails(data); // Ensure this is an array of `project`
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setProjectDetailLoading(false);
    }
  };

  return {
    projectDetails,
    setProjectDetails,
    projectDetailLoading,
    fetchProjectDetails,
  };
}
