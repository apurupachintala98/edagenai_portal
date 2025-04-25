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
} from "@carbon/react";
import { Edit, TrashCan } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";

import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import { useWindowDimensions } from "utils/hooks";
import { useProjectData } from "../../hooks/useProjectData"; // Adjust path if needed

const headers = [
  { header: "SL.NO", key: "SL_NO" },
  { header: "Key Projects/ Milestone", key: "PROJECT_NAME" },
  { header: "Lead", key: "LEAD_NM" },
  { header: "Staff VP", key: "STAFF_VP" },
  { header: "Status", key: "CURRENT_PHASE" },
  { header: "Platform", key: "LLM_PLATFORM" },
  { header: "Date", key: "DEPLOYMENT_DATE" },
  { header: "Actions", key: "actions" }, 
];

function Project() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const { projects, loading } = useProjectData(); 

  const handleEdit = (id: string) => {
    console.log("Edit project with SL_NO:", id);
    // TODO: open modal or navigate
  };

  const handleDelete = (id: string) => {
    console.log("Delete project with SL_NO:", id);
    // TODO: confirm and delete
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
                                    onClick={() => handleEdit(row.id)}
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

      </PageContainer>
    </MainContainer>
  );
}

export default Project;
