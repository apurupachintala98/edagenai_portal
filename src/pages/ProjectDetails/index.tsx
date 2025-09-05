import { Add, Checkmark, Edit, Filter, TrashCan } from "@carbon/icons-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Column,
  DataTable,
  DatePicker,
  DatePickerInput,
  Grid,
  Modal,
  OverflowMenu,
  OverflowMenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TextInput,
} from "@carbon/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import {
  ButtonContainer,
  CustomOverflowMenu,
  FilterIconActive,
  FilterIconDefault,
} from "./styled.components";

import { useWindowDimensions } from "utils/hooks";

import { type project, useProjectData } from "../../hooks/useProjectData";

// Extend the DataTableHeader type to include filterable
interface CustomDataTableHeader {
  header: React.ReactNode;
  key: string;
  isSortable?: boolean;
  filterable?: boolean;
}

const headers: CustomDataTableHeader[] = [
  { header: "S#", key: "SL_NO", isSortable: true },
  { header: "Program Name", key: "PROGRAM_NAME", isSortable: true },
  { header: "Project Name", key: "PROJECT_NAME", isSortable: true },
  { header: "BU", key: "BU", isSortable: true },
  { header: "Owner (VP)", key: "OWNER_VP", isSortable: true },
  { header: "Manager (Director)", key: "MANAGER_DIRECTOR", isSortable: true },
  { header: "Lead (Architect)", key: "LEAD_ARCHITECT", isSortable: true },
  { header: "Platform", key: "PLATFORM_NAME", isSortable: true },
  { header: "Model", key: "MODEL", isSortable: true },
  { header: "Services", key: "SERVICES", isSortable: true },
  { header: "Functionality", key: "FUNCTIONALITY", isSortable: true },
  { header: "Data", key: "DATA", isSortable: true },
  { header: "Capability", key: "CAPABILITY", isSortable: true },
  { header: "Business Value Add", key: "BVA", isSortable: true },
  { header: "Status", key: "STATUS", isSortable: true },
  { header: "ETA", key: "ETA", isSortable: true },
  { header: "Architecture", key: "ARCHITECTURE", isSortable: true },
  { header: "Platform", key: "PLATFORM", isSortable: true },
  { header: "Framework", key: "FRAMEWORK", isSortable: true },
  { header: "UI", key: "UI", isSortable: true },
  { header: "DevOps", key: "DEVOPS", isSortable: true },
  { header: "MCP", key: "MCP", isSortable: true },
  { header: "Usage Metrics", key: "USAGE_METRICS", isSortable: true },
  { header: "Effort Saved", key: "EFFORT_SAVED", isSortable: true },
  { header: "Saved", key: "SAVED", isSortable: true },
];

export function formatDateToString(dateTime: Date): string {
  if (!dateTime) {
    return "";
  }
  const date = new Date(dateTime);

  // Extract local date parts
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const finalDateTime = `${yyyy}-${mm}-${dd}`;

  return finalDateTime;
}

// Utility function to parse a YYYY-MM-DD string to a Date object
const parseDateString = (dateString: string | undefined): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
};

function ProjectDetails() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const { projects, loading, fetchProjects, addProject, editProject, removeProject } =
    useProjectData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<project>({} as project);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [modalReady, setModalReady] = useState(false);
  const [errors, setErrors] = useState<{ startDate?: string; deploymentDate?: string }>({});
  const [modalKey, setModalKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("project");

  useEffect(() => {
    // Update filters when projects change (e.g., after delete or edit)
    const updatedFilters = { ...filters };
    Object.keys(filters).forEach((key) => {
      const currentValues = getUniqueValues(key);
      const filteredValues = filters[key] || [];
      const validFilteredValues = filteredValues.filter((value) => currentValues.includes(value));
      if (validFilteredValues.length !== filteredValues.length) {
        updatedFilters[key] = validFilteredValues;
        if (validFilteredValues.length === 0) {
          delete updatedFilters[key];
        }
      }
    });
    setFilters(updatedFilters);
  }, [projects]); // Trigger on projects change

  const validateForm = (): boolean => {
    const newErrors: { startDate?: string; deploymentDate?: string } = {};
    let isValid = true;

    if (!formData.START_DATE) {
      newErrors.startDate = "Start Date is required";
      isValid = false;
    }
    if (!formData.DEPLOYMENT_DATE) {
      newErrors.deploymentDate = "Deployment Date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsModalOpen(false);
    if (editMode) {
      await editProject(formData.SL_NO, formData);
    } else {
      await addProject(formData);
    }
    await fetchProjects();
  };

  const handleChange = (field: keyof project, value: string) => {
    setFormData((prev: project) => ({ ...prev, [field]: value }));
    if (field === "START_DATE" && value) {
      setErrors((prev) => ({ ...prev, startDate: undefined }));
    }
    if (field === "DEPLOYMENT_DATE" && value) {
      setErrors((prev) => ({ ...prev, deploymentDate: undefined }));
    }
  };

  const handleDelete = async (sl_no: string) => {
    await removeProject(sl_no);
  };

  const getUniqueValues = (key: string) => {
    let values = projects.map((proj) => proj[key as keyof project] as string).filter(Boolean);

    // Normalize LLM_PLATFORM values to remove duplicates due to formatting differences
    if (key === "LLM_PLATFORM") {
      values = values.map((value) => {
        let normalized = value.trim();
        normalized = normalized.split(/[(/]/)[0].trim();
        return normalized.toLowerCase() === "open ai" ? "Open AI" : normalized;
      });
    }

    return [...new Set(values)];
  };

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    setFilters((prev) => {
      const currentValues = getUniqueValues(key);
      const currentFilters = prev[key] || [];
      if (checked && currentValues.includes(value)) {
        const updatedFilters = [...currentFilters, value];
        return { ...prev, [key]: updatedFilters };
      } else {
        const updatedFilters = currentFilters.filter((v) => v !== value);
        if (updatedFilters.length === 0) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: updatedFilters };
      }
    });
  };

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (Object.keys(filters).length > 0) {
      result = projects.filter((proj) => {
        return Object.entries(filters).every(([key, values]) => {
          if (!values.length) return true;
          let projValue = proj[key as keyof project] as string;
          if (key === "LLM_PLATFORM") {
            projValue = projValue.trim();
            projValue = projValue.split(/[(/]/)[0].trim();
            projValue = projValue.toLowerCase() === "open ai" ? "Open AI" : projValue;
          }
          if (!projValue) return false;
          return values.includes(projValue);
        });
      });
    }

    return result.sort((a, b) =>
      (a.PROJECT_NAME || "").localeCompare(b.PROJECT_NAME || "", undefined, { sensitivity: "base" })
    );
  }, [projects, filters]);

  const projectRows = useMemo(() => {
    const rows = [
      {
        id: "1",
        SL_NO: "1",
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
        BVA: "CII Users can get help with Chatbot on CII Metrics",
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
    return rows.sort((a, b) =>
      a.PROJECT_NAME.localeCompare(b.PROJECT_NAME, undefined, { sensitivity: "base" })
    );
  }, []);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return projectRows.slice(startIndex, endIndex);
  }, [projectRows, currentPage]);

  return (
    <MainContainer>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Project Details</PageTitle>
        </HeaderContainer>

        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard?project=all")}>Dashboard</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{projectName}</BreadcrumbItem>
        </Breadcrumb>
        <TableContainer style={{ marginTop: "20px", height: "100%" }}>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>Loading Project Details...</div>
          ) : (
            <>
              <DataTable rows={paginatedRows} headers={headers}>
                {({ rows, headers: tableHeaders, getTableProps, getHeaderProps, getRowProps }) => (
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {tableHeaders.map((header) => (
                          <TableHeader {...getHeaderProps({ header })} key={header.key}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              {header.header}
                            </div>
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={tableHeaders.length}
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            No Project Details Found
                          </TableCell>
                        </TableRow>
                      ) : (
                        rows.map((row) => {
                          const { key, ...rowPropsWithoutKey } = getRowProps({ row });
                          return (
                            <TableRow key={key} {...rowPropsWithoutKey}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value !== null && cell.value !== undefined ? (
                                    cell.value === "TRUE" || cell.value === "true" ? (
                                      <Checkmark fill="green" />
                                    ) : cell.value === "FALSE" || cell.value === "false" ? (
                                      ""
                                    ) : (
                                      cell.value
                                    )
                                  ) : (
                                    "-"
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                )}
              </DataTable>
              <div
                style={{ display: "flex", justifyContent: "end", marginTop: "20px", gap: "1rem" }}
              >
                <Button
                  kind="tertiary"
                  size="sm"
                  style={{ padding: "10px 12px" }}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                  Page {currentPage} of {Math.ceil(projectRows.length / pageSize)}
                </span>
                <Button
                  kind="tertiary"
                  size="sm"
                  style={{ padding: "10px 12px" }}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(projectRows.length / pageSize)),
                    )
                  }
                  disabled={currentPage === Math.ceil(projectRows.length / pageSize)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </TableContainer>
      </PageContainer>
    </MainContainer>
  );
}

export default ProjectDetails;
