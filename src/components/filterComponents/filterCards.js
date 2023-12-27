import React, { useState } from "react";
import "../../components/card.css";
import { Tooltip } from "@mui/material";
import { Avatar, Card } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  DownOutlined,
  UpOutlined,
  CalendarOutlined,
  PushpinOutlined,
  PushpinFilled
} from "@ant-design/icons";
import bugIcon from "../../images/bugIcon.PNG";
import taskIcon from "../../images/taskIcon.PNG";
import moment from "moment";

function FilterCard({ filteredProject, text }) {
  console.log("filteredProject", filteredProject);
  const [issue, setIssues] = useState(filteredProject?.issuetype || filteredProject)
  const [pinnedIssues, setPinnedIssues] = useState([]);
  const JiraURL = "https://proprint.atlassian.net/jira/software/projects";


  const handlePin = (id) => {
    const index = issue.findIndex(item => item.issues.id === id);
    const newData = issue?.map(item => ({ ...item })); // Create a shallow copy of the array
  
  
    // Check if the card is already pinned
    if (newData[index].pinned) {
      // If already pinned, unpin it
      newData[index].pinned = false;
      newData.push(newData.splice(index, 1)[0]);
    } 
    else {
      // If not pinned, check if the user can pin more cards
      const pinnedCount = newData.filter(item => item.pinned).length;
  
      if (pinnedCount < 3) {
        // Toggle the 'pinned' property
        newData[index].pinned = true;
        // Move the pinned card to the top
        newData.unshift(newData.splice(index, 1)[0]);
      } else {
        // Display an alert if the user tries to pin more than three cards
        alert("You can only pin 3 cards at a time");
      }
    }
  
    setIssues(newData);
    localStorage.setItem(text, JSON.stringify(newData))
  };
  
  
  
console.log(issue,"isseisuue")


  const currentDate = moment(); // Get current date

  return (
    <>
      <div className="card-container">

        <div className="fixed-container">
          {

            issue?.map((item, index) => {

              return (
                <Card
                  key={index}
                  style={{
                    borderBottom: "1px solid #ccc",
                    marginLeft: "0px",
                    minHeight: "140px",
                    border: moment(item.issues?.fields.duedate).isBefore(currentDate)
                      ? "3px solid red"
                      : "",
                    backgroundColor: item?.pinned ? "lightblue" : "",
                  }}
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
                        flex: 1, // Make this div take up remaining space
                      }}
                    >
                      <a
                        href={
                          item?.issues?.fields?.project.name
                            ? `${JiraURL}/${item.issues?.fields.project.name.toLowerCase()}/issues`
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p

                          style={{
                            maxHeight: "68px",
                            cursor: "pointer",
                            marginTop: "-10px",
                            color: "#001529",
                            transition: "color 0.3s", // Add a smooth transition for color change

                            textOverflow: "ellipsis",
                          }}
                          // Apply hover styles using :hover pseudo-class
                          onMouseEnter={(e) => (e.target.style.color = "blue")}
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#001529")
                          }
                        >
                          {item?.issues?.fields?.summary}
                        </p>
                      </a>
                    </div>
                    <a
                      onClick={()=>{handlePin(item?.issues?.id)}}
                      style={{
                        maxHeight: "68px",
                        cursor: "pointer",
                        marginTop: "2px",
                        color: "#001529",
                        transition: "color 0.3s",
                        textOverflow: "ellipsis",
                      }}
                    >
                 
                      <Tooltip title={!item?.pinned ? "pin" : "Unpin"}>
                        {!item?.pinned ? <span>
                          <PushpinOutlined />
                        </span> : <PushpinFilled />}
                      </Tooltip>
                    </a>

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
                      <div style={{ border: moment(item.issues?.fields.duedate).isBefore(currentDate) ? "1px solid red" : "1px solid black", color: moment(item.issues?.fields.duedate).isBefore(currentDate) ? "red" : "black" }}>
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

                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "3px",
                      }}
                    >
                      {item.issues?.fields.issuetype.name === "Task" ? (
                        <>
                          <img
                            src={taskIcon}
                            alt="Task Logo"
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <span
                          >
                            {item?.issues?.key}
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
                          <span
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
                            {item?.issues?.fields?.priority?.name === "Medium" && (
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
                            {item?.issues?.fields?.priority?.name === "High" && (
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
                                {item?.issues?.fields?.priority?.name === "Medium" && (
                                  <span>
                                    <MenuOutlined style={{ color: "#FFAB00" }} />
                                  </span>
                                )}
                              </Tooltip>
                            )}
                        </div>
                        <div
                          style={{ marginTop: "-12px" }}

                        >
                          <Tooltip
                            title={`Assignee: ${item?.issues?.fields?.assignee?.displayName ||
                              "Unassigned"
                              }`}
                          >
                            {item?.issues?.fields?.assignee?.avatarUrls?.["48x48"] ? (
                              <img
                                src={
                                  item?.issues?.fields?.assignee?.avatarUrls?.["48x48"]
                                }
                                alt="Avatar"
                                className="imageAvatar"
                              />
                            ) : (
                              <Avatar

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
            })
          }
        </div>
      </div>
    </>
  );
}

export default FilterCard;
