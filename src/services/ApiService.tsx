import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_SERVICE_URL;
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
};

export default ApiService;
