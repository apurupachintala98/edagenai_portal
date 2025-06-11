import React, { useEffect, useState } from "react";
import { Column, Grid } from "@carbon/react";
import { CheckmarkFilled, Misuse, Catalog, ChevronRight, ChevronLeft } from "@carbon/react/icons";

interface ProjectModelProps {
  projectDetails: any;
  modalProjectName: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkmarkFields = ["ARCHITECTURE", "PLATFORM", "FRAMEWORK", "UI", "DEVOPS", "MCP"];

function ProjectModel({ projectDetails, modalProjectName, setIsModalOpen }: ProjectModelProps) {
  if (!projectDetails || !projectDetails[0]) return null;

  //const detail = projectDetails[0];

  const [page, setPage] = useState(1);
  const itemsPerPage = 1;
  const totalPages = Math.ceil(projectDetails.length / itemsPerPage);
  const detail = projectDetails.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    if (modalProjectName !== "") {
      const projectNameArr = projectDetails.map(
        (item: { PROJECT_NAME: string }) => item.PROJECT_NAME,
      );
      const projectIndex = projectNameArr.indexOf(modalProjectName);
      setPage(projectIndex + 1);
    }
  }, [modalProjectName, projectDetails]);

  return detail.length > 0 ? (
    <>
      <h5 className="projectHeading"><Catalog size={"20"} />{`${detail[0].PROJECT_NAME}: Project Details`}</h5>
      <Grid className="mp-0 mt-auto" style={{ marginTop: "20px" }}>
        {Object.entries(detail[0]).map(([key, value]) => {
          if (!checkmarkFields.includes(key)) {
            return (
              <>
                <Column sm={4} md={4} lg={4} className="mp-0">
                  <span className="HeadingLabel">{key.replace(/_/g, " ")}:</span>
                </Column>
                <Column sm={4} md={4} lg={4} className="mp-0">
                  {value && (typeof value === "string" || typeof value === "number")
                    ? value
                    : "N/A"}
                </Column>
              </>
            );
          }
          return null;
        })}

        <Column sm={12} md={12} lg={12} fullWidth>
          <Grid fullWidth Fluid>
            <Column sm={12} md={4} lg={5} className="mp-0 p-r-10">
              <table className="tableWidth">
                <tr>
                  <td className="tdCls" width={"80%"}>
                    <span className="HeadingLabel">{checkmarkFields[0]}</span>
                  </td>
                  <td className="tdCls" width={"20%"}>
                    {detail[0][checkmarkFields[0]] === "True" ||
                    detail[0][checkmarkFields[0]] === "true" ? (
                      <CheckmarkFilled fill="green" size={"20"} />
                    ) : (
                      <Misuse fill="red" size={"20"} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tdCls" width={"80%"}>
                    <span className="HeadingLabel">{checkmarkFields[1]}</span>
                  </td>
                  <td className="tdCls" width={"20%"}>
                    {detail[0][checkmarkFields[1]] === "True" ||
                    detail[0][checkmarkFields[1]] === "true" ? (
                      <CheckmarkFilled fill="green" size={"20"} />
                    ) : (
                      <Misuse fill="red" size={"20"} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tdCls" width={"80%"}>
                    <span className="HeadingLabel">{checkmarkFields[2]}</span>
                  </td>
                  <td className="tdCls" width={"20%"}>
                    {detail[0][checkmarkFields[2]] === "True" ||
                    detail[0][checkmarkFields[2]] === "true" ? (
                      <CheckmarkFilled fill="green" size={"20"} />
                    ) : (
                      <Misuse fill="red" size={"20"} />
                    )}
                  </td>
                </tr>
              </table>
            </Column>
            <Column sm={12} md={4} lg={5} className="mp-0 p-r-10">
              <table className="tableWidth">
                <tr>
                  <td className="tdCls" width={"80%"}>
                    <span className="HeadingLabel">{checkmarkFields[3]}</span>
                  </td>
                  <td className="tdCls" width={"20%"}>
                    {detail[0][checkmarkFields[3]] === "True" ||
                    detail[0][checkmarkFields[3]] === "true" ? (
                      <CheckmarkFilled fill="green" size={"20"} />
                    ) : (
                      <Misuse fill="red" size={"20"} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tdCls" width={"80%"}>
                    <span className="HeadingLabel">{checkmarkFields[4]}</span>
                  </td>
                  <td className="tdCls" width={"20%"}>
                    {detail[0][checkmarkFields[4]] === "True" ||
                    detail[0][checkmarkFields[4]] === "true" ? (
                      <CheckmarkFilled fill="green" size={"20"} />
                    ) : (
                      <Misuse fill="red" size={"20"} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="tdCls" width={"80%"}>
                    <span className="HeadingLabel">{checkmarkFields[5]}</span>
                  </td>
                  <td className="tdCls" width={"20%"}>
                    {detail[0][checkmarkFields[5]] === "True" ||
                    detail[0][checkmarkFields[5]] === "true" ? (
                      <CheckmarkFilled fill="green" size={"20"} />
                    ) : (
                      <Misuse fill="red" size={"20"} />
                    )}
                  </td>
                </tr>
              </table>
            </Column>
          </Grid>
        </Column>

        {/* <Column sm={12} md={12} lg={12} fullWidth>
          <Grid fullWidth>
            {checkmarkFields.map((field) => (
              <Column sm={12} md={2} lg={2} key={field} className="mp-0 p-r-10">
                <span className="HeadingLabel">{field}</span>
                {detail[field] === "True" || detail[field] === "true" ? (
                  <CheckmarkFilled fill="green" size={"20"} />
                ) : (
                  <Misuse fill="red" size={"20"} />
                )}
              </Column>
            ))}
          </Grid>
        </Column> */}
      </Grid>
      <table className="footerTable">
        <tr>
          <td>
            <div className="flex items-left align-middle justify-between items-center m-2">
              <div className="flex gap-2">
                <button
                  className={
                    page === 1
                      ? "disabled:opacity-50 disabled:cursor-not-allowed btn-outline btn-blue border-blue py-1.5 px-1.5 text-sm"
                      : "btn-outline btn-blue py-1.5 px-1.5 text-sm"
                  }
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  <ChevronLeft /> Previous
                </button>
                <button
                  className={
                    page === totalPages
                      ? "disabled:opacity-50 disabled:cursor-not-allowed btn-outline btn-blue py-1.5 px-1.5 text-sm"
                      : "btn-outline btn-blue py-1.5 px-1.5 text-sm"
                  }
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                >
                  Next <ChevronRight />
                </button>
              </div>
              <span className="text-black-600 text-sm">
                {page} / {totalPages}
              </span>
              <div>
                <button className={"btn-primary"} onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </>
  ) : (
    ""
  );
}

export default ProjectModel;
