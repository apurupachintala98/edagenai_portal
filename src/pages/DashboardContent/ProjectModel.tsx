import React, { useEffect, useState } from "react";
import { Column, Grid } from "@carbon/react";
import { CheckmarkFilled, Misuse, Catalog, ChevronRight, ChevronLeft } from "@carbon/react/icons";
import { capitalizeFirstLetterOfEachWord } from "utils/common";

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
      <h5 className="projectHeading">
        <Catalog size={"20"} />
        {`${detail[0].PROJECT_NAME}: Project Details`}
      </h5>
      <Grid className="mp-0 mt-auto" style={{ marginTop: "20px" }}>
        <Column sm={12} md={6} lg={6} className="mp-0">
          <table className="prodDetailPopup">
            {Object.entries(detail[0]).map(([key, value], index) => {
              if (!checkmarkFields.includes(key) && index < 15) {
                return (
                  <tr key={key}>
                    <td className="pb-2 pr-2 heading">
                      <span className="HeadingLabel">
                        {capitalizeFirstLetterOfEachWord(
                          key.toLocaleLowerCase().replace(/_/g, " "),
                        )}
                        :
                      </span>
                    </td>
                    <td className="pb-2 pr-2 detail">
                      {value && (typeof value === "string" || typeof value === "number")
                        ? value
                        : "N/A"}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </table>
        </Column>
        <Column sm={12} md={6} lg={6} className="mp-0">
          <table className="prodDetailPopup ">
            {Object.entries(detail[0]).map(([key, value], index) => {
              if (!checkmarkFields.includes(key) && index >= 15) {
                return (
                  <tr key={key}>
                    <td className="pb-2 pr-2 heading">
                      <span className="HeadingLabel">
                        {capitalizeFirstLetterOfEachWord(
                          key.toLocaleLowerCase().replace(/_/g, " "),
                        )}
                        :
                      </span>
                    </td>
                    <td className="pb-2 pr-2 detail">
                      {value && (typeof value === "string" || typeof value === "number")
                        ? value
                        : "N/A"}
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </table>
        </Column>

        <Column sm={12} md={12} lg={12} fullWidth>
          <Grid fullWidth>
            <Column sm={12} md={4} lg={5} className="mp-0 p-r-10">
              <table className="tableWidth">
                {checkmarkFields.map((field, index) => {
                  if (index < 3) {
                    return (
                      <tr key={field}>
                        <td className="tdCls" width={"80%"}>
                          <span className="HeadingLabel">{field}</span>
                        </td>
                        <td className="tdCls" width={"20%"}>
                          {detail[0][field] === "True" || detail[0][field] === "true" ? (
                            <CheckmarkFilled fill="green" size={"20"} />
                          ) : (
                            <Misuse fill="red" size={"20"} />
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              </table>
            </Column>
            <Column sm={12} md={4} lg={5} className="mp-0 p-r-10">
              <table className="tableWidth">
                {checkmarkFields.map((field, index) => {
                  if (index >= 3) {
                    return (
                      <tr key={field}>
                        <td className="tdCls" width={"80%"}>
                          <span className="HeadingLabel">{field}</span>
                        </td>
                        <td className="tdCls" width={"20%"}>
                          {detail[0][field] === "True" || detail[0][field] === "true" ? (
                            <CheckmarkFilled fill="green" size={"20"} />
                          ) : (
                            <Misuse fill="red" size={"20"} />
                          )}
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
      <table className="footerTable">
        <tr>
          <td>
            <div className="flex items-left align-middle justify-between items-center mb-4">
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
