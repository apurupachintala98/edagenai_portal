// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   DataTable,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableBody,
//   TableCell,
//   Button,
//   Modal,
//   TextInput
// } from "@carbon/react";
// import { Edit, TrashCan, Add } from '@carbon/icons-react';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
// import { useWindowDimensions } from "utils/hooks";
// import { useProjectData } from "../../hooks/useProjectData";

// const fieldKeys = [
//   "SL_NO", "Staff_VP", "Director", "LEAD_NM", "TGOV_NO", "Program_Type", "Project_Name", "Project_Description",
//   "LLM_PLATFORM", "LLM_MODEL", "Platform_Services", "data", "Business_User", "Start_Date",
//   "Deployment_Date", "Current_Phase", "status", "Link_to_Slide", "Notes"
// ];

// function Project() {
//   const navigate = useNavigate();
//   const { height } = useWindowDimensions();
//   const { projects, setProjects, loading, addProject, editProject, removeProject } = useProjectData();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState<any | null>(null);
//   const [formState, setFormState] = useState(Object.fromEntries(fieldKeys.map(key => [key, ''])));
//   const [filters, setFilters] = useState(Object.fromEntries(fieldKeys.map(key => [key, ''])));

//   const handleOpenModal = (data: any | null = null) => {
//     setEditData(data);
//     setFormState(data || Object.fromEntries(fieldKeys.map(key => [key, ''])));
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditData(null);
//   };

//   const handleChange = (e: any) => {
//     setFormState({ ...formState, [e.target.id]: e.target.value });
//   };

//   const handleFilterChange = (e: any) => {
//     setFilters({ ...filters, [e.target.id]: e.target.value });
//   };

//   // const handleSubmit = async () => {
//   //   if (editData) {
//   //     await editProject(editData.SL_NO, formState);
//   //   } else {
//   //     await addProject(formState);
//   //   }
//   //   handleCloseModal();
//   // };

//   const headers = [
//     ...fieldKeys.map(key => ({ key, header: key.replace(/_/g, ' ') })),
//     { key: 'actions', header: 'Actions' }
//   ];

//   const filteredRows = projects.filter((row: any) => {
//     return Object.keys(filters).every(key =>
//       key === 'actions' || row[key]?.toLowerCase().includes(filters[key].toLowerCase())
//     );
//   });

//   const tableRows = filteredRows.map((project: any) => ({
//     ...project,
//     id: project.SL_NO // required for DataTable
//   }));

//   return (
//     <MainContainer height={height}>
//       <PageContainer>
//         <HeaderContainer>
//           <PageTitle>Project</PageTitle>
//         </HeaderContainer>

//         <Breadcrumb>
//           <BreadcrumbItem>
//             <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>Home</div>
//           </BreadcrumbItem>
//           <BreadcrumbItem isCurrentPage>Project</BreadcrumbItem>
//         </Breadcrumb>

//         <Button
//           kind="primary"
//           onClick={() => handleOpenModal()}
//           renderIcon={Add}
//           style={{ margin: '20px 0' }}
//         >
//           Add Project
//         </Button>

//         <TableContainer>
//           <DataTable rows={tableRows} headers={headers} isSortable>
//             {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
//               <Table {...getTableProps()}>
//                 <TableHead>
//                   <TableRow>
//                     {headers.map((header) => (
//                       <TableHeader {...getHeaderProps({ header })} key={header.key}>
//                         {header.header}
//                         {header.key !== 'actions' && (
//                           <TextInput
//                             id={header.key}
//                             hideLabel
//                             labelText={`Filter ${header.header}`}
//                             placeholder="Filter..."
//                             value={filters[header.key] || ''}
//                             onChange={handleFilterChange}
//                             style={{ marginTop: '0.5rem' }}
//                           />
//                         )}
//                       </TableHeader>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows.map((row) => {
//                     const { key, ...restRowProps } = getRowProps({ row });
//                     return (
//                       <TableRow key={key} {...restRowProps}>
//                         {row.cells.map((cell) => (
//                           <TableCell key={cell.id}>
//                             {cell.info.header === 'actions' ? (
//                               <div style={{ display: 'flex', gap: '0.5rem' }}>
//                                 <Edit size={16} title="Edit" style={{ cursor: 'pointer' }} 
//                                 // onClick={() => handleOpenModal(row.original)} 
//                                 />
//                                 <TrashCan size={16} title="Delete" style={{ cursor: 'pointer' }} onClick={() => removeProject(row.id)} />
//                               </div>
//                             ) : (
//                               cell.value
//                             )}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             )}
//           </DataTable>
//         </TableContainer>

//         <Modal
//           open={isModalOpen}
//           modalHeading={editData ? 'Edit Project' : 'Add Project'}
//           primaryButtonText="Submit"
//           secondaryButtonText="Cancel"
//           onRequestClose={handleCloseModal}
//           // onRequestSubmit={handleSubmit}
//         >
//           {fieldKeys.map(field => (
//             <TextInput
//               key={field}
//               id={field}
//               labelText={field.replace(/_/g, ' ')}
//               value={formState[field]}
//               onChange={handleChange}
//               style={{ marginBottom: '1rem' }}
//             />
//           ))}
//         </Modal>
//       </PageContainer>
//     </MainContainer>
//   );
// }

// export default Project;


// import { Breadcrumb, BreadcrumbItem, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@carbon/react";
// import { Edit, TrashCan } from '@carbon/icons-react';
// import { useNavigate } from "react-router-dom";

// import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
// import { useWindowDimensions } from "utils/hooks";

// // Sample data
// const projectRows = [
//   { id: '1', slNo: '1', project: 'CII Smart Help V1', lead: 'Ian', vp: 'Anil', status: 'Production', platform: 'Cortex', date: '2024-03-29' },
//   { id: '2', slNo: '2', project: 'Health OS Chart Abstraction (Hybrid Medical Record Review)', lead: 'Harsh', vp: 'Anil', status: 'Production', platform: 'Open AI (GPT 4o-mini) / Bio BERT', date: '2025-02-28' },
//   { id: '3', slNo: '3', project: 'Chart Chase Explorer (Risk Accuracy)', lead: 'Harsh', vp: 'Anil', status: 'Test', platform: 'Open AI', date: '2025-05-30' },
//   // Add other rows similarly...
// ];

// const headers = [
//   { key: 'slNo', header: 'SL.NO' },
//   { key: 'project', header: 'Key Projects/ Milestone' },
//   { key: 'lead', header: 'Lead' },
//   { key: 'vp', header: 'Staff VP' },
//   { key: 'status', header: 'Status' },
//   { key: 'platform', header: 'Platform' },
//   { key: 'date', header: 'Date' },
//   { key: 'actions', header: 'Actions' }
// ];

// function Project() {
//   const navigate = useNavigate();
//   const { height } = useWindowDimensions();

//   const handleEdit = (id: string) => {
//     // Open modal or navigate
//   };

//   const handleDelete = (id: string) => {
//     // Confirm and delete
//   };


//   return (
//     <MainContainer height={height}>
//       <PageContainer>
//         <HeaderContainer>
//           <PageTitle>Project</PageTitle>
//         </HeaderContainer>

//         <Breadcrumb>
//           <BreadcrumbItem>
//             <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
//               Home
//             </div>
//           </BreadcrumbItem>
//           <BreadcrumbItem isCurrentPage>Project</BreadcrumbItem>
//         </Breadcrumb>

//         <TableContainer style={{ marginTop: "20px" }}>
//           <DataTable rows={projectRows} headers={headers}>
//             {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
//               <Table {...getTableProps()}>
//                 <TableHead>
//                   <TableRow>
//                     {headers.map((header) => (
//                       <TableHeader {...getHeaderProps({ header })} key={header.key}>
//                         {header.header}
//                       </TableHeader>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows.map((row) => {
//                     const { key, ...rowPropsWithoutKey } = getRowProps({ row });
//                     return (
//                       <TableRow key={key} {...rowPropsWithoutKey}>
//                         {row.cells.map((cell) => (
//                           <TableCell key={cell.id}>
//                             {cell.info.header === 'actions' ? (
//                               <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
//                                 <Edit size={16} style={{ cursor: 'pointer' }} title="Edit" onClick={() => console.log("Edit", row.id)} />
//                                 <TrashCan size={16} style={{ cursor: 'pointer' }} title="Delete" onClick={() => console.log("Delete", row.id)} />
//                               </div>
//                             ) : (
//                               cell.value
//                             )}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>





//               </Table>
//             )}
//           </DataTable>
//         </TableContainer>
//       </PageContainer>
//     </MainContainer>
//   );
// }

// export default Project;

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
  { header: "Actions", key: "actions" }, // <--- not null, use "actions"
];

function Project() {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const { projects, loading } = useProjectData(); // Hook to fetch API data

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
    PROJECT_NAME: proj.Project_Name,
    LEAD_NM: proj.LEAD_NM,
    STAFF_VP: proj.Staff_VP,
    CURRENT_PHASE: proj.status,
    LLM_PLATFORM: proj.LLM_PLATFORM,
    DEPLOYMENT_DATE: proj.Deployment_Date,
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
                              {cell.info.header === "Actions" ? (
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
