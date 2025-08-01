import { Add, Edit, Filter, TrashCan } from "@carbon/icons-react";
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
import { useNavigate } from "react-router-dom";

import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import {
  ButtonContainer,
  CustomOverflowMenu,
  FilterIconActive,
  FilterIconDefault,
} from "./styled.components";

import { useWindowDimensions } from "utils/hooks";

import { type project, useProjectData } from "../../hooks/useProjectData";
import { capitalizeFirstLetterOfEachWord, convertDateFormate } from "utils/common";
import dayjs from "dayjs";

// Extend the DataTableHeader type to include filterable
interface CustomDataTableHeader {
  header: React.ReactNode;
  key: string;
  isSortable?: boolean;
  filterable?: boolean;
}

const headers: CustomDataTableHeader[] = [
  { header: "S#", key: "SL_NO", isSortable: true },
  { header: "Key Projects/ Milestone", key: "PROJECT_NAME", isSortable: true, filterable: true },
  { header: "Lead", key: "LEAD_NM", isSortable: true, filterable: true },
  { header: "Staff VP", key: "STAFF_VP", isSortable: true, filterable: true },
  { header: "Status", key: "STATUS", isSortable: true, filterable: true },
  { header: "Platform", key: "LLM_PLATFORM", isSortable: true, filterable: true },
  { header: "Date", key: "DEPLOYMENT_DATE", isSortable: true },
  { header: "Actions", key: "actions", isSortable: true },
];

const projectFieldMap: Record<string, keyof project> = {
  Staff_VP: "STAFF_VP",
  Director: "DIRECTOR",
  LEAD_NM: "LEAD_NM",
  TGOV_NO: "TGOV_NO",
  Program_Type: "PROGRAM_TYPE",
  Project_Name: "PROJECT_NAME",
  Project_Description: "PROJECT_DESCRIPTION",
  LLM_PLATFORM: "LLM_PLATFORM",
  LLM_MODEL: "LLM_MODEL",
  Platform_Services: "PLATFORM_SERVICES",
  data: "DATA",
  Business_User: "BUSINESS_USER",
  Current_Phase: "CURRENT_PHASE",
  status: "STATUS",
  Link_to_Slide: "LINK_TO_SLIDE",
  Notes: "NOTES",
  BU: "BU",
  Functionality: "FUNCTIONALITY",
  Capability: "CAPABILITY",
  Business_value_add: "BUSINESS_VALUE_ADD",
  Architecture: "ARCHITECTURE",
  Platform: "PLATFORM",
  Framework: "FRAMEWORK",
  UI: "UI",
  Devops: "DEVOPS",
  MCP: "MCP",
  Usage_Metrics: "USAGE_METRICS",
  Effort_Saved: "EFFORT_SAVED",
  Cost_Saved: "COST_SAVED",
  Derived_Env: "DERIVED_ENV",
};

const CustomFilterIcon = ({ isFiltered }: { isFiltered: boolean }) => {
  return isFiltered ? (
    <FilterIconActive>
      <Filter size={16} />
    </FilterIconActive>
  ) : (
    <FilterIconDefault>
      <Filter size={16} />
    </FilterIconDefault>
  );
};

// Utility function to parse a MM/DD/YYYY string to a Date object
const parseDateString = (dateString: string | undefined) => {
  if (!dateString) return undefined;
  //  const date = new Date(dateString);
  return dayjs(dateString).format("MM/DD/YYYY");
  //return isNaN(date.getTime()) ? undefined : date;
};


type CheckmarkField = "ARCHITECTURE" | "PLATFORM" | "FRAMEWORK" | "UI" | "DEVOPS" | "MCP";

const checkmarkFields = ["ARCHITECTURE", "PLATFORM", "FRAMEWORK", "UI", "DEVOPS", "MCP"];

function Project() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();



  const { projects, loading, fetchProjects, addProject, editProject, removeProject } =
    useProjectData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<project>({} as project);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [modalReady, setModalReady] = useState(false);
  const [errors, setErrors] = useState<{ startDate?: string; deploymentDate?: string }>({});
  const [projectID, setProjectID] = useState("");
  const [modalKey, setModalKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;



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

  const openAddModal = () => {
    setEditMode(false);
    setModalReady(false);
    setErrors({});
    setModalKey((prev) => prev + 1);
    const newSLNo =
      projects.length > 0 ? Math.max(...projects.map((p) => parseInt(p.SL_NO))) + 1 : 1;
    const initialFormData = {
      SL_NO: String(newSLNo),
      STAFF_VP: "",
      DIRECTOR: "",
      LEAD_NM: "",
      TGOV_NO: "",
      PROGRAM_TYPE: "",
      PROJECT_NAME: "",
      PROJECT_DESCRIPTION: "",
      LLM_PLATFORM: "",
      LLM_MODEL: "",
      PLATFORM_SERVICES: "",
      DATA: "",
      BUSINESS_USER: "",
      START_DATE: "",
      DEPLOYMENT_DATE: "",
      CURRENT_PHASE: "",
      STATUS: "",
      LINK_TO_SLIDE: "",
      NOTES: "",
      BU: "",
      FUNCTIONALITY: "",
      CAPABILITY: "",
      BUSINESS_VALUE_ADD: "",
      ARCHITECTURE: "",
      PLATFORM: "",
      FRAMEWORK: "",
      UI: "",
      DEVOPS: "",
      MCP: "",
      USAGE_METRICS: "",
      EFFORT_SAVED: "",
      COST_SAVED: "",
      DERIVED_ENV: "",
    };
    setFormData(initialFormData);
    setModalReady(true);
    setIsModalOpen(true);
  };

  const openEditModal = (project: project) => {

    setEditMode(true);
    setModalReady(false);
    setErrors({});
    setFormData({
      SL_NO: project.SL_NO,
      STAFF_VP: project.STAFF_VP || "",
      DIRECTOR: project.DIRECTOR || "",
      LEAD_NM: project.LEAD_NM || "",
      TGOV_NO: project.TGOV_NO || "",
      PROGRAM_TYPE: project.PROGRAM_TYPE || "",
      PROJECT_NAME: project.PROJECT_NAME || "",
      PROJECT_DESCRIPTION: project.PROJECT_DESCRIPTION || "",
      LLM_PLATFORM: project.LLM_PLATFORM || "",
      LLM_MODEL: project.LLM_MODEL || "",
      PLATFORM_SERVICES: project.PLATFORM_SERVICES || "",
      DATA: project.DATA || "",
      BUSINESS_USER: project.BUSINESS_USER || "",
      START_DATE: project.START_DATE || "",
      DEPLOYMENT_DATE: project.DEPLOYMENT_DATE || "",
      CURRENT_PHASE: project.CURRENT_PHASE || "",
      STATUS: project.STATUS || "",
      LINK_TO_SLIDE: project.LINK_TO_SLIDE || "",
      NOTES: project.NOTES || "",
      BU: project.BU || "",
      FUNCTIONALITY: project.FUNCTIONALITY || "",
      CAPABILITY: project.CAPABILITY || "",
      BUSINESS_VALUE_ADD: project.BUSINESS_VALUE_ADD || "",
      ARCHITECTURE: project.ARCHITECTURE || "",
      PLATFORM: project.PLATFORM || "",
      FRAMEWORK: project.FRAMEWORK || "",
      UI: project.UI || "",
      DEVOPS: project.DEVOPS || "",
      MCP: project.MCP || "",
      USAGE_METRICS: project.USAGE_METRICS || "",
      EFFORT_SAVED: project.EFFORT_SAVED || "",
      COST_SAVED: project.COST_SAVED || "",
      DERIVED_ENV: project.DERIVED_ENV || "",


    });
    setModalReady(true);
    setIsModalOpen(true);
  };

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
    setIsDeleteModalOpen(false);
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
    if (Object.keys(filters).length === 0) {
      return projects;
    }

    return projects.filter((proj) => {
      return Object.entries(filters).every(([key, values]) => {
        if (!values.length) return true;
        let projValue = proj[key as keyof project] as string;
        if (key === "LLM_PLATFORM") {
          projValue = projValue.trim();
          projValue = projValue.split(/[(/]/)[0].trim();
          projValue = projValue.toLowerCase() === "open ai" ? "Open AI" : projValue;
        }
        if (projValue === undefined || projValue === null) return false;
        return values.includes(projValue);
      });
    });
  }, [projects, filters]);

  const projectRows = useMemo(() => {
    return filteredProjects.map((proj, index) => ({
      id: proj.SL_NO,
      SL_NO: String(index + 1),
      PROJECT_NAME: proj.PROJECT_NAME,
      LEAD_NM: proj.LEAD_NM,
      STAFF_VP: proj.STAFF_VP,
      STATUS: proj.STATUS,
      LLM_PLATFORM: proj.LLM_PLATFORM,
      DEPLOYMENT_DATE: proj.DEPLOYMENT_DATE,
      actions: "",
    }));
  }, [filteredProjects]);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return projectRows.slice(startIndex, endIndex);
  }, [projectRows, currentPage]);

  const handleCheckboxChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean; id: string },
  ) => {
    const { id, checked } = data;

    if (checkmarkFields.includes(id as CheckmarkField)) {
      setFormData((prev) => ({
        ...prev,
        [id]: checked ? "on" : "off",
      }));
    }
  };

  return (
    <MainContainer>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Project</PageTitle>
          <ButtonContainer>
            <Button kind="primary" size="lg" onClick={openAddModal} renderIcon={Add}>
              Add Project
            </Button>
          </ButtonContainer>
        </HeaderContainer>

        <Breadcrumb>
          <BreadcrumbItem>
            <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
              Home
            </div>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Project</BreadcrumbItem>
        </Breadcrumb>
        <TableContainer style={{ marginTop: "20px", height: "100%" }}>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>Loading Projects...</div>
          ) : (
            <>
              <DataTable rows={paginatedRows} headers={headers}>
                {({ rows, headers: tableHeaders, getTableProps, getHeaderProps, getRowProps }) => (
                  <Table {...getTableProps()} className="bgTable">
                    <TableHead>
                      <TableRow>
                        {tableHeaders.map((header) => (
                          <TableHeader {...getHeaderProps({ header })} key={header.key}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              {header.header}
                              {(header as CustomDataTableHeader).filterable && (
                                <OverflowMenu
                                  renderIcon={() => (
                                    <CustomFilterIcon
                                      isFiltered={
                                        filters[header.key] && filters[header.key].length > 0
                                      }
                                    />
                                  )}
                                  onClick={(e: any) => {
                                    e.stopPropagation();
                                  }}
                                  onOpen={() => {
                                    setTimeout(() => {
                                      const activeElement = document.activeElement as HTMLElement;
                                      if (activeElement && activeElement.closest(".cds--menu")) {
                                        activeElement.blur();
                                      }
                                    }, 0);
                                  }}
                                  direction="bottom"
                                  style={{ marginLeft: "0.5rem", zIndex: 1000 }}
                                >
                                  <CustomOverflowMenu>
                                    <div
                                      style={{
                                        maxHeight: "200px",
                                        maxWidth: "300px",
                                        overflowY: "auto",
                                        overflowX: "auto",
                                        padding: "0.5rem",
                                        background: "#fff",
                                        border: "1px solid #dfe3e6",
                                      }}
                                    >
                                      {getUniqueValues(header.key).map((value) => (
                                        <OverflowMenuItem
                                          key={value}
                                          itemText={
                                            <div
                                              style={{
                                                minWidth: "300px",
                                                padding: "0.25rem 0",
                                                whiteSpace: "normal",
                                                wordBreak: "break-word",
                                              }}
                                            >
                                              <Checkbox
                                                id={`${header.key}-${value}`}
                                                labelText={value}
                                                checked={
                                                  filters[header.key]?.includes(value) || false
                                                }
                                                onChange={(event) =>
                                                  handleFilterChange(
                                                    header.key,
                                                    value,
                                                    event.target.checked,
                                                  )
                                                }
                                                style={{ display: "block" }}
                                              />
                                            </div>
                                          }
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      ))}
                                    </div>
                                  </CustomOverflowMenu>
                                </OverflowMenu>
                              )}
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
                            No Projects Found
                          </TableCell>
                        </TableRow>
                      ) : (
                        rows.map((row) => {
                          const { key, ...rowPropsWithoutKey } = getRowProps({ row });
                          return (
                            <TableRow key={key} {...rowPropsWithoutKey}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.info.header === "actions" ? (
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "0.5rem",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Edit
                                        size={16}
                                        style={{ cursor: "pointer" }}
                                        title="Edit"
                                        onClick={() =>
                                          openEditModal(projects.find((p) => p.SL_NO === row.id)!)
                                        }
                                      />
                                      <TrashCan
                                        size={16}
                                        style={{ cursor: "pointer" }}
                                        title="Delete"
                                        onClick={() => {
                                          setIsDeleteModalOpen(true);
                                          setProjectID(row.id);
                                          //handleDelete(row.id)
                                        }}
                                      />
                                    </div>
                                  ) : cell.info.header === "DEPLOYMENT_DATE" ? convertDateFormate(cell.value) : cell.value !== null && cell.value !== undefined ? (
                                    cell.value
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
        <Modal
          open={isDeleteModalOpen}
          modalHeading={"Delete Project"}
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
          onRequestClose={() => {
            setIsDeleteModalOpen(false);
            setProjectID("");
          }}
          onRequestSubmit={() => handleDelete(projectID)}
          className="projectDeleteModal"
          size="sm"
        >
          <div className="mb-1 p-0">Are you sure you want to delete?</div>
        </Modal>
        <Modal
          open={isModalOpen && modalReady}
          modalHeading={editMode ? "Edit Project" : "Add Project"}
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onRequestClose={() => setIsModalOpen(false)}
          onRequestSubmit={handleSubmit}
          className="projectDetailModal"
          size="lg"
        >
          <Grid fullWidth className="m-0 p-0 projectDetailCol">
            {/* <Column sm={4} md={8} lg={16} className="m-0 p-0">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {Object.entries(projectFieldMap).map(([label, key]) => (
                  <TextInput
                    key={key}
                    id={key}
                    labelText={label.replace(/_/g, " ")}
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ))}
                <DatePicker
                  datePickerType="single"
                  value={parseDateString(formData.START_DATE)}
                  onChange={(dates: Date[]) => {
                    const formattedDate = dates[0] ? convertDateFormate(dates[0]) : "";
                    handleChange("START_DATE", formattedDate);
                  }}
                  key={`start-date-${modalKey}`}
                >
                  <DatePickerInput
                    id="START_DATE"
                    labelText={
                      <span>
                        Start Date <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    placeholder="MM/DD/YYYY"
                    invalid={!!errors.startDate}
                    invalidText={errors.startDate}
                  />
                </DatePicker>
                <DatePicker
                  datePickerType="single"
                  value={parseDateString(formData.DEPLOYMENT_DATE)}
                  onChange={(dates: Date[]) => {
                    const formattedDate = dates[0] ? convertDateFormate(dates[0]) : "";
                    handleChange("DEPLOYMENT_DATE", formattedDate);
                  }}
                  key={`deployment-date-${modalKey}`}
                >
                  <DatePickerInput
                    id="DEPLOYMENT_DATE"
                    labelText={
                      <span>
                        Deployment Date <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    placeholder="MM/DD/YYYY"
                    invalid={!!errors.deploymentDate}
                    invalidText={errors.deploymentDate}
                  />
                </DatePicker>
              </div>
            </Column> */}
            <Column sm={12} md={8} lg={8} className="mp-0">
              <table className="prodDetailPopup">
                {Object.entries(projectFieldMap).map(([label, key], index) => {
                  if (!checkmarkFields.includes(key) && index < 12) {
                    return (
                      <tr key={key}>
                        <td className="pb-2 pr-2 heading textAlighCenter">
                          <span className="HeadingLabel">
                            {capitalizeFirstLetterOfEachWord(
                              key.toLocaleLowerCase().replace(/_/g, " "),
                            )}
                            :
                          </span>
                        </td>
                        <td className="pb-2 detail detailPad">
                          <TextInput
                            key={key}
                            id={key}
                            labelText={""}
                            value={formData[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
                <tr>
                  <td className="pb-2 pr-2 heading textAlighCenter">
                    <span className="HeadingLabel">
                      Start Date <span style={{ color: "red" }}>*</span>
                    </span>
                  </td>
                  <td className="pb-2 pr-2 detail">
                    <DatePicker
                      datePickerType="single"
                      value={parseDateString(formData.START_DATE)}
                      onChange={(dates: Date[]) => {
                        const formattedDate = dates[0] ? convertDateFormate(dates[0]) : "";
                        handleChange("START_DATE", formattedDate);
                      }}
                      key={`start-date-${modalKey}`}
                    >
                      <DatePickerInput
                        id="START_DATE"
                        labelText={""}
                        placeholder="MM/DD/YYYY"
                        invalid={!!errors.startDate}
                        invalidText={errors.startDate}
                      />
                    </DatePicker>
                  </td>
                </tr>
              </table>
            </Column>
            <Column sm={12} md={8} lg={8} className="mp-0">
              <table className="prodDetailPopup ">
                {Object.entries(projectFieldMap).map(([label, key], index) => {
                  if (!checkmarkFields.includes(key) && index >= 12) {
                    return (
                      <tr key={key}>
                        <td className="pb-2 pr-2 heading textAlighCenter">
                          <span className="HeadingLabel">
                            {capitalizeFirstLetterOfEachWord(
                              key.toLocaleLowerCase().replace(/_/g, " "),
                            )}
                            :
                          </span>
                        </td>
                        <td className="pb-2 detail detailPad">
                          <TextInput
                            key={key}
                            id={key}
                            labelText={""}
                            value={formData[key] || ""}
                            onChange={(e) => handleChange(key, e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
                <tr>
                  <td className="pb-2 pr-2 heading textAlighCenter">
                    <span className="HeadingLabel">
                      Deployment Date <span style={{ color: "red" }}>*</span>
                    </span>
                  </td>
                  <td className="pb-2 pr-2 detail">
                    <DatePicker
                      datePickerType="single"
                      value={parseDateString(formData.DEPLOYMENT_DATE)}
                      onChange={(dates: Date[]) => {
                        const formattedDate = dates[0] ? convertDateFormate(dates[0]) : "";
                        handleChange("DEPLOYMENT_DATE", formattedDate);
                      }}
                      key={`deployment-date-${modalKey}`}
                    >
                      <DatePickerInput
                        id="DEPLOYMENT_DATE"
                        labelText={""}
                        placeholder="MM/DD/YYYY"
                        invalid={!!errors.deploymentDate}
                        invalidText={errors.deploymentDate}
                      />
                    </DatePicker>
                  </td>
                </tr>
              </table>
            </Column>

            <Column sm={12} md={12} lg={12} fullWidth>
              <Grid fullWidth>
                <Column sm={12} md={12} lg={12} className="m-0 p-0">
                  <span className="HeadingLabel">Platform Services Usage:</span>
                </Column>
                <Column sm={12} md={4} lg={5} className="mp-0 p-r-10">
                  <table className="tableWidth">
                    {checkmarkFields.map((field, index) => {
                      if (index < 3) {
                        return (
                          <tr key={field}>
                            <td className="tdCls" width={"80%"}>
                              <span className="HeadingLabel">{field}</span>
                            </td>
                            <td className="tdCls" width={"20%"} align="center">
                              <Checkbox
                                key={field}
                                id={field}
                                labelText={""}
                                checked={formData[field as keyof project] === "on"}
                                onChange={handleCheckboxChange}
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </Column>
                <Column sm={12} md={4} lg={5} className="mp-0 p-r-10">
                  <table className="tableWidth">
                    {checkmarkFields.map((field: any, index) => {
                      if (index >= 3) {
                        return (
                          <tr key={field}>
                            <td className="tdCls" width={"80%"}>
                              <span className="HeadingLabel">{field}</span>
                            </td>
                            <td className="tdCls" width={"20%"} align="center">
                              <Checkbox
                                key={field}
                                id={field}
                                labelText={""}
                                checked={formData[field as keyof project] === "on"}
                                onChange={handleCheckboxChange}
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </Column>
              </Grid>
            </Column>

          </Grid>
        </Modal>
      </PageContainer>
    </MainContainer>
  );
}

export default Project;
