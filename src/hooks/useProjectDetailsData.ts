import { useEffect, useRef, useState } from "react";

import ApiService from "../services/ApiService";

export interface projectDetails {
  SL_NO: number;
  STAFF_VP: string;
  DIRECTOR: string;
  LEAD_NM: string;
  TGOV_NO: string;
  PROGRAM_TYPE: string;
  PROJECT_NAME: string;
  PROJECT_DESCRIPTION: string;
  LLM_PLATFORM: string;
  LLM_MODEL: string;
  PLATFORM_SERVICES: string;
  DATA: string;
  BUSINESS_USER: string;
  START_DATE: string;
  DEPLOYMENT_DATE: string;
  CURRENT_PHASE: string;
  STATUS: string;
  LINK_TO_SLIDE: string;
  NOTES: string;
  PROGRAM_NAME: string;
  BU: string;
  FUNCTIONALITY: string;
  CAPABILITY: string;
  BUSINESS_VALUE_ADD: string;
  ARCHITECTURE: string;
  PLATFORM: string;
  FRAMEWORK: string;
  UI: string;
  DEVOPS: string;
  MCP: string;
  USAGE_METRICS: string;
  EFFORT_SAVED: string;
  COST_SAVED: string;
  DERIVED_ENV: string;
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
      const data = await ApiService.getAllProjectData();
      setProjectDetails(data);
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
