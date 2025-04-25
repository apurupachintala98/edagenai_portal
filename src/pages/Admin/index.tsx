// import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
// import { useNavigate } from "react-router-dom";

// import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";

// import { useWindowDimensions } from "utils/hooks";

// function Project() {
//   const navigate = useNavigate();
//   const { height } = useWindowDimensions();
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
//       </PageContainer>
//     </MainContainer>
//   );
// }

// export default Project;


import { Breadcrumb, BreadcrumbItem, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@carbon/react";
import { Edit, TrashCan } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";

import { HeaderContainer, MainContainer, PageContainer, PageTitle } from "../styled.components";
import { useWindowDimensions } from "utils/hooks";

// Sample data
const projectRows = [
    { id: '1', slNo: '1', project: 'CII Smart Help V1', lead: 'Ian', vp: 'Anil', status: 'Production', platform: 'Cortex', date: '2024-03-29' },
    { id: '2', slNo: '2', project: 'Health OS Chart Abstraction (Hybrid Medical Record Review)', lead: 'Harsh', vp: 'Anil', status: 'Production', platform: 'Open AI (GPT 4o-mini) / Bio BERT', date: '2025-02-28' },
    { id: '3', slNo: '3', project: 'Chart Chase Explorer (Risk Accuracy)', lead: 'Harsh', vp: 'Anil', status: 'Test', platform: 'Open AI', date: '2025-05-30' },
    // Add other rows similarly...
];

const headers = [
    { key: 'slNo', header: 'SL.NO' },
    { key: 'project', header: 'Key Projects/ Milestone' },
    { key: 'lead', header: 'Lead' },
    { key: 'vp', header: 'Staff VP' },
    { key: 'status', header: 'Status' },
    { key: 'platform', header: 'Platform' },
    { key: 'date', header: 'Date' },
    { key: 'actions', header: 'Actions' }
];

function Admin() {
    const navigate = useNavigate();
    const { height } = useWindowDimensions();

    const handleEdit = (id: string) => {
        // Open modal or navigate
    };

    const handleDelete = (id: string) => {
        // Confirm and delete
    };


    return (
        <MainContainer height={height}>
            <PageContainer>
                <HeaderContainer>
                    <PageTitle>Project</PageTitle>
                </HeaderContainer>

                <Breadcrumb>

                    <BreadcrumbItem isCurrentPage>Project</BreadcrumbItem>
                </Breadcrumb>

                <TableContainer style={{ marginTop: "20px" }}>
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
                                                        {cell.info.header === 'actions' ? (
                                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                                <Edit size={16} style={{ cursor: 'pointer' }} title="Edit" onClick={() => console.log("Edit", row.id)} />
                                                                <TrashCan size={16} style={{ cursor: 'pointer' }} title="Delete" onClick={() => console.log("Delete", row.id)} />
                                                            </div>
                                                        ) : (
                                                            cell.value
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
                </TableContainer>
            </PageContainer>
        </MainContainer>
    );
}

export default Admin;
