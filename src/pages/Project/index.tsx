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
  OverflowMenu,
  OverflowMenuItem,
  Checkbox,
  Button,
  Button as CarbonButton
} from "@carbon/react";
import { Edit, TrashCan, Add } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";
import { ButtonContainer } from "./styled.components";
import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import { useWindowDimensions } from "utils/hooks";
import { useProjectData } from "../../hooks/useProjectData"; // Adjust path if needed

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

function Project() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const { projects, loading } = useProjectData();
  const SMALL_BUTTON = "sm" as const;
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [tempOptions, setTempOptions] = useState<Record<string, Set<string>>>({});
  const [filters, setFilters] = useState<Record<string, string>>({
    PROJECT_NAME: "",
    LEAD_NM: "",
    CURRENT_PHASE: "",
    STAFF_VP: "",
    LLM_PLATFORM: "",
    DEPLOYMENT_DATE: ""
  });

  const handleEdit = (id: string) => {
    console.log("Edit project with SL_NO:", id);
    // TODO: open modal or navigate
  };

  const handleDelete = (id: string) => {
    console.log("Delete project with SL_NO:", id);
    // TODO: confirm and delete
  };

  const getUniqueValues = (key: string) => {
    return Array.from(new Set(projectRows.map((item) => item[key as keyof typeof item])));
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

  const filteredRows = projectRows.filter((row) => {
    return Object.entries(selectedOptions).every(([key, selectedVals]) => {
      return selectedVals.length === 0 || selectedVals.includes(row[key as keyof typeof row]);
    });
  });


  // const filteredRows = projectRows.filter((row) => {
  //   return (
  //     row.PROJECT_NAME.toLowerCase().includes(filters.PROJECT_NAME.toLowerCase()) &&
  //     row.LEAD_NM.toLowerCase().includes(filters.LEAD_NM.toLowerCase()) &&
  //     row.CURRENT_PHASE.toLowerCase().includes(filters.CURRENT_PHASE.toLowerCase()) &&
  //     row.STAFF_VP.toLowerCase().includes(filters.STAFF_VP.toLowerCase()) &&
  //     row.LLM_PLATFORM.toLowerCase().includes(filters.LLM_PLATFORM.toLowerCase()) &&
  //     row.DEPLOYMENT_DATE.toLowerCase().includes(filters.DEPLOYMENT_DATE.toLowerCase())
  //   );
  // });

  return (
    <MainContainer height={height}>
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Project</PageTitle>
          <ButtonContainer>
            <Button kind="primary" size="lg" onClick={() => { }} renderIcon={Add}>
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
            <DataTable rows={filteredRows} headers={headers}>
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
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader key={header.key}>
                          {/* {["PROJECT_NAME", "LEAD_NM", "CURRENT_PHASE"].includes(header.key) ? (
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters[header.key] || ""}
                              onChange={(e) =>
                                setFilters((prev) => ({
                                  ...prev,
                                  [header.key]: e.target.value
                                }))
                              }
                              style={{ width: "100%", padding: "2px 4px", fontSize: "12px" }}
                            />
                          ) : null} */}
                          {["LEAD_NM", "STAFF_VP", "CURRENT_PHASE", "LLM_PLATFORM", "PROJECT_NAME", "DEPLOYMENT_DATE"].includes(header.key) ? (
                            <OverflowMenu
                              flipped
                              size="sm"
                              renderIcon={() => <span style={{ fontSize: "12px" }}>🔽</span>}
                            >
                              {getUniqueValues(header.key).map((option) => (
                                <OverflowMenuItem
                                  key={option}
                                  itemText={
                                    <Checkbox
                                      id={`${header.key}-${option}`}
                                      labelText={option}
                                      checked={tempOptions[header.key]?.has(option) || false}
                                      onChange={() => {
                                        setTempOptions((prev) => {
                                          const current = new Set(prev[header.key] || []);
                                          if (current.has(option)) current.delete(option);
                                          else current.add(option);
                                          return { ...prev, [header.key]: current };
                                        });
                                      }}
                                    />
                                  }
                                />
                              ))}
                              <OverflowMenuItem
                                itemText={
                                  <CarbonButton
                                    kind="primary"
                                    size={SMALL_BUTTON}
                                    style={{ width: "100%" }}
                                    onClick={() => {
                                      const selected = Object.fromEntries(
                                        Object.entries(tempOptions).map(([key, val]) => [key, Array.from(val)])
                                      );
                                      setSelectedOptions(selected);
                                    }}
                                  >
                                    APPLY
                                  </CarbonButton>
                                }
                              />
                            </OverflowMenu>
                          ) : null}

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
