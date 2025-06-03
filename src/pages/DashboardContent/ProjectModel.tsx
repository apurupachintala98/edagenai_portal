// import { Column, Grid } from "@carbon/react";
// import { Checkmark } from "@carbon/react/icons";

// interface ProjectModelProps {
//   projectDetails: any;
// }

// const checkmarkFields = [
//   "ARCHITECTURE",
//   "PLATFORM",
//   "FRAMEWORK",
//   "UI",
//   "DEVOPS",
//   "MCP"
// ];

// function ProjectModel({ projectDetails }: ProjectModelProps) {
//   if (!projectDetails || !projectDetails[0]) return null;

//   const detail = projectDetails[0];

//   return (
//     <Grid className="mp-0">
//       {Object.entries(detail).map(([key, value]) => {
//         if (!checkmarkFields.includes(key) && value && value !== "") {
//           return (
//             <>
//               <Column sm={8} md={8} lg={8} className="mp-0">
//                 <span className="HeadingLabel">{key.replace(/_/g, " ")}:</span>
//               </Column>
//               <Column sm={8} md={8} lg={8} className="mp-0">
//                 {typeof value === "string" || typeof value === "number"
//                   ? value
//                   : JSON.stringify(value)}
//               </Column>
//             </>
//           );
//         }
//         return null;
//       })}

//       <Column sm={12} md={12} lg={12} fullWidth>
//         <Grid fullWidth>
//           {checkmarkFields.map((field) => (
//             <Column sm={12} md={2} lg={2} key={field} className="mp-0 p-r-10">
//               <span className="HeadingLabel">{field}</span>
//               {(detail[field] === "TRUE" || detail[field] === "true") && (
//                 <Checkmark fill="green" />
//               )}
//             </Column>
//           ))}
//         </Grid>
//       </Column>
//     </Grid>
//   );
// }

// export default ProjectModel;

import React from "react";
import { Column, Grid } from "@carbon/react";
import { Checkmark, Close } from "@carbon/react/icons";

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
        if (!checkmarkFields.includes(key)) {
          return (
            <React.Fragment key={key}>
              <Column sm={8} md={8} lg={8} className="mp-0">
                <span className="HeadingLabel">{key.replace(/_/g, " ")}:</span>
              </Column>
              <Column sm={8} md={8} lg={8} className="mp-0">
                {value && (typeof value === "string" || typeof value === "number")
                  ? value
                  : "N/A"}
              </Column>
            </React.Fragment>
          );
        }
        return null;
      })}

      <Column sm={12} md={12} lg={12} fullWidth>
        <Grid fullWidth>
          {checkmarkFields.map((field) => (
            <Column sm={12} md={2} lg={2} key={field} className="mp-0 p-r-10">
              <span className="HeadingLabel">{field}</span>
              {(detail[field] === "True" || detail[field] === "true") ? (
                <Checkmark fill="green" />
              ) : (
                <Close fill="red" />
              )}
            </Column>
          ))}
        </Grid>
      </Column>
    </Grid>
  );
}

export default ProjectModel;
