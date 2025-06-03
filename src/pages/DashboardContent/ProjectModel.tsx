// import { Column, Grid, Modal } from "@carbon/react";
// import { Checkmark } from "@carbon/react/icons";

// interface ProjectModelProps {
//   projectDetails: any;
// }

// function ProjectModel({
//   projectDetails,
// }: ProjectModelProps) {
//   return (
//       <Grid className="mp-0">
//         {projectDetails && projectDetails[0] && projectDetails[0].PROGRAM_NAME && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Program Name:</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].PROGRAM_NAME}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].PROJECT_NAME && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Project Name:</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].PROJECT_NAME}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].OWNER_VP && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Owner (VP)</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].OWNER_VP}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].MANAGER_DIRECTOR && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Manager (Director)</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].MANAGER_DIRECTOR}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].LEAD_ARCHITECT && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Lead (Architect)</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].LEAD_ARCHITECT}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].PLATFORM && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Platform</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].PLATFORM}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].MODEL && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Model</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].MODEL}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].SERVICES && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Services</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].SERVICES}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].FUNCTIONALITY && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Functionality</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].FUNCTIONALITY}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].DATA && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Data</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].DATA}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].CAPABILITY && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Capability</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].CAPABILITY}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].BUSINESS_VALUE_ADD && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Business Value Add</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].BUSINESS_VALUE_ADD}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].STATUS && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Status</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].STATUS}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].ETA && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">ETA</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].ETA}
//             </Column>
//           </>
//         )}

//         {projectDetails &&
//           projectDetails[0] &&
//           projectDetails[0].ARCHITECTURE &&
//           projectDetails[0].PLATFORM &&
//           projectDetails[0].FRAMEWORK &&
//           projectDetails[0].UI &&
//           projectDetails[0].DEVOPS &&
//           projectDetails[0].MCP && (
//             <Column sm={12} md={12} lg={12} fullWidth>
//               <Grid fullWidth>
//                 <Column sm={12} md={2} lg={2} className="mp-0 p-r-10">
//                   <span className="HeadingLabel">Architecture</span>
//                   {projectDetails[0].ARCHITECTURE === "TRUE" ||
//                   projectDetails[0].ARCHITECTURE === "true" ? (
//                     <Checkmark fill="green" />
//                   ) : (
//                     ""
//                   )}
//                 </Column>
//                 <Column sm={12} md={2} lg={2} className="mp-0">
//                   <span className="HeadingLabel">Platform</span>
//                   {projectDetails[0].PLATFORM === "TRUE" ||
//                   projectDetails[0].PLATFORM === "true" ? (
//                     <Checkmark fill="green" />
//                   ) : (
//                     ""
//                   )}
//                 </Column>
//                 <Column sm={12} md={2} lg={2} className="mp-0">
//                   <span className="HeadingLabel">Framework</span>
//                   {projectDetails[0].FRAMEWORK === "TRUE" ||
//                   projectDetails[0].FRAMEWORK === "true" ? (
//                     <Checkmark fill="green" />
//                   ) : (
//                     ""
//                   )}
//                 </Column>
//                 <Column sm={12} md={2} lg={2} className="mp-0">
//                   <span className="HeadingLabel">UI</span>
//                   {projectDetails[0].UI === "TRUE" || projectDetails[0].UI === "true" ? (
//                     <Checkmark fill="green" />
//                   ) : (
//                     ""
//                   )}
//                 </Column>
//                 <Column sm={12} md={2} lg={2} className="mp-0">
//                   <span className="HeadingLabel">DevOps</span>
//                   {projectDetails[0].DEVOPS === "TRUE" || projectDetails[0].DEVOPS === "true" ? (
//                     <Checkmark fill="green" />
//                   ) : (
//                     ""
//                   )}
//                 </Column>
//                 <Column sm={12} md={2} lg={2} className="mp-0">
//                   <span className="HeadingLabel">MCP</span>
//                   {projectDetails[0].MCP === "TRUE" || projectDetails[0].MCP === "true" ? (
//                     <Checkmark fill="green" />
//                   ) : (
//                     ""
//                   )}
//                 </Column>
//               </Grid>
//             </Column>
//           )}

//         {projectDetails && projectDetails[0] && projectDetails[0].USAGE_METRICS && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Usage Metrics</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].USAGE_METRICS}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].EFFORT_SAVED && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Effort Saved</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].EFFORT_SAVED}
//             </Column>
//           </>
//         )}

//         {projectDetails && projectDetails[0] && projectDetails[0].SAVED && (
//           <>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               <span className="HeadingLabel">Saved</span>
//             </Column>
//             <Column sm={8} md={8} lg={8} className="mp-0">
//               {projectDetails[0].SAVED}
//             </Column>
//           </>
//         )}
//       </Grid>
//   );
// }

// export default ProjectModel;

import { Column, Grid } from "@carbon/react";
import { Checkmark } from "@carbon/react/icons";

interface ProjectModelProps {
  projectDetails: any;
}

const checkmarkFields = [
  "ARCHITECTURE",
  "PLATFORM",
  "FRAMEWORK",
  "UI",
  "DEVOPS",
  "MCP"
];

function ProjectModel({ projectDetails }: ProjectModelProps) {
  if (!projectDetails || !projectDetails[0]) return null;

  const detail = projectDetails[0];

  return (
    <Grid className="mp-0">
      {Object.entries(detail).map(([key, value]) => {
        if (!checkmarkFields.includes(key) && value && value !== "") {
          return (
            <>
              <Column sm={8} md={8} lg={8} className="mp-0">
                <span className="HeadingLabel">{key.replace(/_/g, " ")}:</span>
              </Column>
              <Column sm={8} md={8} lg={8} className="mp-0">
                {typeof value === "string" || typeof value === "number"
                  ? value
                  : JSON.stringify(value)}
              </Column>
            </>
          );
        }
        return null;
      })}

      <Column sm={12} md={12} lg={12} fullWidth>
        <Grid fullWidth>
          {checkmarkFields.map((field) => (
            <Column sm={12} md={2} lg={2} key={field} className="mp-0 p-r-10">
              <span className="HeadingLabel">{field}</span>
              {(detail[field] === "TRUE" || detail[field] === "true") && (
                <Checkmark fill="green" />
              )}
            </Column>
          ))}
        </Grid>
      </Column>
    </Grid>
  );
}

export default ProjectModel;
