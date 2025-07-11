import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_SERVICE_URL;
const BASE_URL = "https://llmgwassist.edagenaidev.awsdns.internal.das";
const Dashboard_BASE_URL = "https://edadipassist.edagenaipreprod.awsdns.internal.das/backend";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data;
  },

  fetchUserInfo: async (token: string) => {
    const response = await axiosInstance.post(
      "/user-info",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  getAllProjectDetails: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_project_details/`);
    return response.status === 200 ? response.data : [];
  },

  insertNewProjectDetails: async (newProject: any) => {
    const response = await axios.post(`${Dashboard_BASE_URL}/insert_new_project_details/`, newProject);
    return response.data;
  },

  updateProjectDetails: async (sl_no: any, updatedProject: any) => {
    const { SL_NO, ...projectData } = updatedProject;
    const response = await axios.post(
      `${Dashboard_BASE_URL}/update_project_details/?sl_no=${sl_no}`,
      projectData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  },

  deleteProjectDetails: async (sl_no: any) => {
    const response = await axios.post(`${Dashboard_BASE_URL}/delete_project_details/?sl_no=${sl_no}`);
    return response.data;
  },

  getAllDetailsProjects: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_details_projects/`);
    return response.status === 200 ? response.data : [];
  },

  getAllProjectData: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_full_project_details/`);
    return response.status === 200 ? response.data : [];
  },

  getAllDetailsGanttChart: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_details_gantt_chart/`);
    return response.status === 200 ? response.data : [];
  },

  getAllCostsDetails: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_costs_details/`);
    return response.status === 200 ? response.data : [];
  },

  getAllUsersDetails: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_users_details/`);
    return response.status === 200 ? response.data : [];
  },

  getAllProgramTypeDetails: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_details_projects_by_program_type/`);
    return response.status === 200 ? response.data : [];
  },

  getAllBUDetails: async () => {
    const response = await axios.get(`${Dashboard_BASE_URL}/get_all_details_projects_by_BU/`);
    return response.status === 200 ? response.data : [];
  },

  getPlatforms: async () => {
    const response = await axios.get(`${BASE_URL}/llm_platform`);
    return response.data;
  },

  getModelsByPlatform: async (platform: any) => {
    const response = await axios.get(`${BASE_URL}/llm_platform/${platform}/models`);
    return response.data;
  },

  getLLMResponse: async (data: any) => {
    const response = await axios.put(`${BASE_URL}/get_llm_response/`, data);
    return response.data;
  }

};

export default ApiService;
