import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

interface Project {
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

export function useProjectData() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getAllProjectDetails();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (newProject: Project) => {
    try {
      const created = await ApiService.insertNewProjectDetails(newProject);
      setProjects((prev: Project[]) => [...prev, created]);
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };

  const editProject = async (sl_no: string, updatedProject: Project) => {
    try {
      const updated = await ApiService.updateProjectDetails(sl_no, updatedProject);
      setProjects((prev: Project[]) => prev.map(p => p.SL_NO === sl_no ? updated : p));
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const removeProject = async (sl_no: string) => {
    try {
      await ApiService.deleteProjectDetails(sl_no);
      setProjects((prev: Project[]) => prev.filter(p => p.SL_NO !== sl_no));
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
