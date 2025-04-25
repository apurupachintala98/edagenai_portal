import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

interface Project {
  SL_NO: string;
  Staff_VP: string;
  Director: string;
  LEAD_NM: string;
  TGOV_NO: string;
  Program_Type: string;
  Project_Name: string;
  Project_Description: string;
  LLM_PLATFORM: string;
  LLM_MODEL: string;
  Platform_Services: string;
  data: string;
  Business_User: string;
  Start_Date: string;
  Deployment_Date: string;
  Current_Phase: string;
  status: string;
  Link_to_Slide: string;
  Notes: string;
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
