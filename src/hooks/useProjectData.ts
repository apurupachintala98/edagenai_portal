import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

export interface project {
  SL_NO: string;
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
}

// Add this mapping helper
const mapProjectToCamelCase = (project: project) => ({
  SL_NO: project.SL_NO,
  Staff_VP: project.STAFF_VP,
  Director: project.DIRECTOR,
  LEAD_NM: project.LEAD_NM,
  TGOV_NO: project.TGOV_NO,
  Program_Type: project.PROGRAM_TYPE,
  Project_Name: project.PROJECT_NAME,
  Project_Description: project.PROJECT_DESCRIPTION,
  LLM_PLATFORM: project.LLM_PLATFORM,
  LLM_MODEL: project.LLM_MODEL,
  Platform_Services: project.PLATFORM_SERVICES,
  data: project.DATA,
  Business_User: project.BUSINESS_USER,
  Start_Date: project.START_DATE,
  Deployment_Date: project.DEPLOYMENT_DATE,
  Current_Phase: project.CURRENT_PHASE,
  status: project.STATUS,
  Link_to_Slide: project.LINK_TO_SLIDE,
  Notes: project.NOTES,
});

export function useProjectData() {
  const [projects, setProjects] = useState<project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getAllProjectDetails();
      console.log("Fetched Projects:", data); // ← Add this for debugging
      setProjects(data); // Ensure this is an array of `project`
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const addProject = async (newProject: project) => {
    try {
      const payload = mapProjectToCamelCase(newProject);
      const created = await ApiService.insertNewProjectDetails(payload);
      setProjects((prev: project[]) => [...prev, created]);
      await fetchProjects();
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };
  
  const editProject = async (sl_no: string, updatedProject: project) => {
    try {
      const payload = mapProjectToCamelCase(updatedProject);
      const updated = await ApiService.updateProjectDetails(sl_no, payload);
      setProjects((prev: project[]) =>
        prev.map((p) => (p.SL_NO === sl_no ? updated : p))
      );
      await fetchProjects();
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const removeProject = async (sl_no: string) => {
    try {
      await ApiService.deleteProjectDetails(sl_no);
      setProjects((prev: project[]) => prev.filter(p => p.SL_NO !== sl_no));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return {
    projects,
    setProjects,
    loading,
    fetchProjects,
    addProject,
    editProject,
    removeProject
  };
}
