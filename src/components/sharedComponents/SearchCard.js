import React from "react";
import "../../components/card.css";
import { Tooltip } from "@mui/material";
import { Avatar, Card } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  DownOutlined,
  UpOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import bugIcon from "../../images/bugIcon.PNG";
import taskIcon from "../../images/taskIcon.PNG";
import moment from "moment";
import { useSelector } from "react-redux";
//import { clearSearchValue, filterSearch } from "../Redux/store/slice.js";

function SearchCard({ project, projectData }) {
  console.log("projects?>>>", project);
  //https://proprint.atlassian.net/jira/software/projects/PROPR/issues/PROPR-751
  const value = useSelector((state) => state?.searchedText?.value);
  // const projectSearchData = useSelector(
  //   (state) => state?.searchedText?.projectSearchData
  // );
  const JiraURL = "https://proprint.atlassian.net/jira/software/projects";
  const jiraRoute = (item) => {
    //setIsClicked(true);
    const projectURL = item?.issues?.fields?.project.name
      ? `${JiraURL}/${item?.issues?.fields.project.name.toLowerCase()}/issues`
      : "";
    if (projectURL) {
      window.open(projectURL);
    }
  };

  // const jiraRoute = (item) => {
  //   const projectKey = item?.key;
  //   //const projectname = item?.project?.name;

  //   if (projectKey) {
  //     const projectURL = `${JiraURL}/${item.fields.project.name.toLowerCase()}/issues/${
  //       item?.key
  //     }`;
  //     window.open(projectURL);
  //   }
  // };

  const highlightText = (text, skipCardIfFoundInDescription = false) => {
    if (!value) {
      return text;
    }

    const lowerCaseText = text?.toLowerCase();
    const lowerCaseValue = value?.toLowerCase();
    const startIndex = lowerCaseText.indexOf(lowerCaseValue);

    if (startIndex === -1) {
      return text; // Return the original text when the search text is not found
    }

    const endIndex = startIndex + value?.length;

    // if (
    //   skipCardIfFoundInDescription &&
    //   text ===
    //     project?.project?.issues?.fields?.description?.content[0]?.content[0]
    //       ?.text
    // ) {
    //   return null; // Skip rendering this card when found in the description field
    // }

    return (
      <>
        {text.substring(0, startIndex)}
        <span className="highlighted">
          {text.substring(startIndex, endIndex)}
        </span>
        {text.substring(endIndex)}
      </>
    );
  };

  return (
    <>
      <div className="card-container">

        <div className="fixed-container">
          {project?.issuetype?.length > 0 ? (
            <>
              {project?.issuetype?.map((item, index) => {

                const summary = item?.issues?.fields?.summary || "";
                const assigneeName =
                  item?.issues?.fields?.displayName || "Unassigned";
                const projectName = item?.issues?.fields?.project?.name || "";
                const key = item?.issues?.key || "";

                //const skipDescriptionCard = description;
                const highlightedSummary = highlightText(summary);
                const highlightedProjectName = highlightText(projectName);
                const highlightedAssigneeName = highlightText(assigneeName);
                const highlightedKey = highlightText(key, true);

                if (
                  //skipDescriptionCard === null &&
                  highlightedSummary === null &&
                  highlightedProjectName === null &&
                  highlightedAssigneeName === null &&
                  highlightedKey === null
                ) {
                  return null; // Skip rendering this card
                }
                return (
                  <Card
                    key={index}
                    onClick={() => jiraRoute(item)}
                    className="HoverCard"
                    style={{
                      borderBottom: "1px solid #ccc",
                      marginLeft: "0px",
                      height: "120px",
                    }}
                  // className={`HoverCard ${shouldHighlight ? "highlighted" : ""}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "8px",
                        }}
                      >
                        <a
                          href={
                            item?.issues?.fields?.project.name
                              ? `${JiraURL}/${item?.issues?.fields.project.name.toLowerCase()}/issues`
                              : ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p
                            //className="description"
                            style={{
                              //overflow: "hidden",
                              //textOverflow: "ellipsis",
                              //whiteSpace: "nowrap",
                              maxHeight: "50px",
                              cursor: "pointer",
                              marginTop: "-10px",
                              color: "#001529",
                              transition: "color 0.3s", // Add a smooth transition for color change
                              //overflow: "hidden",
                              textOverflow: "ellipsis",
                              //whiteSpace: "wrap",
                            }}
                            // Apply hover styles using :hover pseudo-class
                            onMouseEnter={(e) => (e.target.style.color = "blue")}
                            onMouseLeave={(e) =>
                              (e.target.style.color = "#001529")
                            }
                          >
                            {highlightedSummary}
                          </p>
                        </a>
                      </div>

                      <div style={{ marginTop: "-10px" }}>
                        {item?.issues?.fields?.customfield_10044 ||
                          item?.issues?.fields?.customfield_10045 ||
                          item?.issues?.fields?.customfield_10048
                          ? " " +
                          (item?.issues?.fields?.customfield_10044 ||
                            item?.issues?.fields?.customfield_10048 ||
                            item?.issues?.fields?.customfield_10045)
                          : 0}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {/* <CalendarOutlined style={{ marginLeft: "2px" }} />
                    {item?.duedate ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          {moment(item?.issues?.fields?.duedate).format(
                            "DD MMM"
                          )}
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: "block" }}> </div>
                    )} */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "#DE350B",
                        width: "70px",
                        gap: "1px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {item?.issues?.fields?.duedate && (
                        <div style={{ border: "1px solid #DE350B" }}>
                          <CalendarOutlined style={{ marginLeft: "2px" }} />

                          {moment(item.issues?.fields.duedate).format("DD MMM")}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end", // Align items to the end of the container
                        minHeight: "45px", // Set a minimum height for the card
                        // position: "fixed",
                        //  left: "758px",
                        //  top: "260px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                        }}
                      >
                        {item?.issues?.fields?.issuetype?.name === "Task" ? (
                          <>
                            <img
                              src={taskIcon}
                              alt="Task Logo"
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <span //style={{ marginTop: "-3px", marginLeft: "-60px" }}
                            >
                              {highlightedKey}
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              src={bugIcon}
                              alt="Bug Logo"
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            <span //style={{ marginTop: "-3px", marginLeft: "-60px" }}
                            >
                              {item?.issues?.key}
                            </span>
                          </>
                        )}
                      </div>

                      <span>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "3px",
                            marginTop: "-10px",
                          }}
                        >
                          <div style={{ marginTop: "8px" }}>
                            <Tooltip title="Medium">
                              {item?.issues?.fields?.priority?.name ===
                                "Medium" && (
                                  <span>
                                    <MenuOutlined style={{ color: "#FFAB00" }} />
                                  </span>
                                )}
                            </Tooltip>

                            <Tooltip title="Low">
                              {item?.issues?.fields?.priority?.name === "Low" && (
                                <span>
                                  <DownOutlined
                                    style={{ color: "rgb(0, 101, 255)" }}
                                  />
                                </span>
                              )}
                            </Tooltip>

                            <Tooltip title="High">
                              {item?.issues?.fields?.priority?.name ===
                                "High" && (
                                  <span>
                                    <UpOutlined
                                      style={{ color: "rgb(255, 86, 48)" }}
                                    />
                                  </span>
                                )}
                            </Tooltip>

                            {!["Medium", "Low", "High"].includes(
                              item?.issues?.fields?.priority?.name
                            ) && (
                                <Tooltip title="Medium">
                                  {item?.issues?.fields?.priority?.name ===
                                    "Medium" && (
                                      <span>
                                        <MenuOutlined style={{ color: "#FFAB00" }} />
                                      </span>
                                    )}
                                </Tooltip>
                              )}
                          </div>

                          <div
                            style={{ marginTop: "-12px" }} //className="Titleavatar"
                          >
                            <Tooltip
                              title={`Assignee: ${item?.issues?.fields?.displayName || "Unassigned"
                                }`}
                            >
                              {item?.issues?.fields?.assignee?.avatarUrls?.[
                                "48x48"
                              ] ? (
                                <img
                                  src={
                                    item?.issues?.fields?.assignee?.avatarUrls?.[
                                    "48x48"
                                    ]
                                  }
                                  alt="Avatar"
                                  className="imageAvatar"
                                />
                              ) : (
                                <Avatar
                                  //className="imageAvatar"
                                  className="UnAssignedimageAvatar"
                                  icon={<UserOutlined />}
                                />
                              )}
                            </Tooltip>
                          </div>
                        </div>
                      </span>
                    </div>
                  </Card>
                );
              })}
            </>
          ) : (
            <h3>Search Data Not Found</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchCard;
