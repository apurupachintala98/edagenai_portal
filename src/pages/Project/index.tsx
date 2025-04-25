import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Modal,
  TextInput,
  Column,
  Grid,
  DatePicker,
  DatePickerInput,
  Button as CarbonButton
} from "@carbon/react";

import { Edit, TrashCan, Add } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";
import { ButtonContainer } from "./styled.components";
import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import { useWindowDimensions } from "utils/hooks";
import { useProjectData, type project } from "../../hooks/useProjectData";
const headers = [
  { header: "SL.NO", key: "SL_NO", isSortable: true },
  { header: "Key Projects/ Milestone", key: "PROJECT_NAME", isSortable: true },
  { header: "Lead", key: "LEAD_NM", isSortable: true },
  { header: "Staff VP", key: "STAFF_VP", isSortable: true },
  { header: "Status", key: "CURRENT_PHASE", isSortable: true },
  { header: "Platform", key: "LLM_PLATFORM", isSortable: true },
  { header: "Date", key: "DEPLOYMENT_DATE", isSortable: true },
  { header: "Actions", key: "actions", isSortable: true },
];

const emptyProject: project = {
  SL_NO: "",
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
  NOTES: ""
};


function Project() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const { projects, loading } = useProjectData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { addProject, editProject, removeProject } = useProjectData();
  // const [formData, setFormData] = useState<project>({
  //   SL_NO: "",
  //   STAFF_VP: "",
  //   DIRECTOR: "",
  //   LEAD_NM: "",
  //   TGOV_NO: "",
  //   PROGRAM_TYPE: "",
  //   PROJECT_NAME: "",
  //   PROJECT_DESCRIPTION: "",
  //   LLM_PLATFORM: "",
  //   LLM_MODEL: "",
  //   PLATFORM_SERVICES: "",
  //   DATA: "",
  //   BUSINESS_USER: "",
  //   START_DATE: "",
  //   DEPLOYMENT_DATE: "",
  //   CURRENT_PHASE: "",
  //   STATUS: "",
  //   LINK_TO_SLIDE: "",
  //   NOTES: ""
  // });
  const [formData, setFormData] = useState<project>({ ...emptyProject });
  const openAddModal = () => {
    setEditMode(false);
    setFormData({ ...emptyProject });
    setIsModalOpen(true);
  };

  const openEditModal = (project: project) => {
    setEditMode(true);
    setFormData(project);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editMode) {
      await editProject(formData.SL_NO, formData);
    } else {
      await addProject(formData);
    }
    setIsModalOpen(false);
  };

  const handleChange = (field: keyof project, value: string) => {
    setFormData((prev: project) => ({ ...prev, [field]: value }));
  };

  const handleDelete = async (sl_no: string) => {
    await removeProject(sl_no);
  };

  // Map only selected fields for each project
  const projectRows = projects.map((proj) => ({
    id: proj.SL_NO, // Unique row id for DataTable
    SL_NO: proj.SL_NO,
    PROJECT_NAME: proj.PROJECT_NAME,
    LEAD_NM: proj.LEAD_NM,
    STAFF_VP: proj.STAFF_VP,
    CURRENT_PHASE: proj.STATUS,
    LLM_PLATFORM: proj.LLM_PLATFORM,
    DEPLOYMENT_DATE: proj.DEPLOYMENT_DATE,
    actions: "",
  }));

  return (
    <MainContainer height={height}>
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
        <TableContainer style={{ marginTop: "20px" }}>
          {loading ? (
            <div>Loading Projects...</div>
          ) : projectRows.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center" }}>No Projects Found</div>
          ) : (
            <DataTable rows={projectRows} headers={headers}>
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })} key={header.key}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const { key, ...rowPropsWithoutKey } = getRowProps({ row });
                      return (
                        <TableRow key={key} {...rowPropsWithoutKey}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>
                              {cell.info.header === "actions" ? (
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                  <Edit
                                    size={16}
                                    style={{ cursor: 'pointer' }}
                                    title="Edit"
                                    onClick={() => openEditModal(projects.find(p => p.SL_NO === row.id)!)}
                                  />
                                  <TrashCan
                                    size={16}
                                    style={{ cursor: 'pointer' }}
                                    title="Delete"
                                    onClick={() => handleDelete(row.id)}
                                  />
                                </div>
                              ) : (
                                cell.value ?? "-"
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>

                </Table>
              )}
            </DataTable>
          )}
        </TableContainer>
        {/* <Modal
          open={isModalOpen}
          modalHeading={editMode ? "Edit Project" : "Add Project"}
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onRequestClose={() => setIsModalOpen(false)}
          onRequestSubmit={handleSubmit}
        >
          <Grid fullWidth>
            <Column sm={4} md={8} lg={16}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <TextInput
                  id="PROJECT_NAME"
                  labelText="Project Name"
                  value={formData.PROJECT_NAME}
                  onChange={(e) => handleChange("PROJECT_NAME", e.target.value)}
                />
                <TextInput
                  id="LEAD_NM"
                  labelText="Lead Name"
                  value={formData.LEAD_NM}
                  onChange={(e) => handleChange("LEAD_NM", e.target.value)}
                />
                
              </div>
            </Column>
          </Grid>
        </Modal> */}
        <Modal
          open={isModalOpen}
          modalHeading={editMode ? "Edit Project" : "Add Project"}
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onRequestClose={() => setIsModalOpen(false)}
          onRequestSubmit={handleSubmit}
        >
          <Grid fullWidth>
            <Column sm={4} md={8} lg={16}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {Object.keys(emptyProject).map((key) => {
                  if (["START_DATE", "DEPLOYMENT_DATE"].includes(key)) return null;
                  return (
                    <TextInput
                      key={key}
                      id={key}
                      labelText={key.replace(/_/g, ' ').toUpperCase()}
                      value={(formData as any)[key]}
                      onChange={(e) => handleChange(key as keyof project, e.target.value)}
                    />
                  );
                })}
                <DatePicker
                  datePickerType="single"
                  value={formData.START_DATE}
                  onChange={(e: any) => handleChange("START_DATE", e[0])}
                >
                  <DatePickerInput
                    id="START_DATE"
                    labelText="Start Date"
                    placeholder="yyyy-mm-dd"
                  />
                </DatePicker>
                <DatePicker
                  datePickerType="single"
                  value={formData.DEPLOYMENT_DATE}
                  onChange={(e: any) => handleChange("DEPLOYMENT_DATE", e[0])}
                >
                  <DatePickerInput
                    id="DEPLOYMENT_DATE"
                    labelText="Deployment Date"
                    placeholder="yyyy-mm-dd"
                  />
                </DatePicker>
              </div>
            </Column>
          </Grid>
        </Modal>
      </PageContainer>
    </MainContainer>
  );
}

export default Project;
