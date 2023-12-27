import React, { useEffect, useState } from "react";
import "../../components/card.css";
import { styled } from "@mui/system";
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

function AssigneeCard(project) {
 
 

  const JiraURL = "https://proprint.atlassian.net/jira/software/projects";
    const jiraRoute = (item) => {
      const projectURL = item?.fields?.project.name
        ? `${JiraURL}/${item.fields.project.name.toLowerCase()}/issues`
        : "";

      if (projectURL) {
        window.open(projectURL);
      }
    };


  
  const currentDate = moment(); // Get current date

  return (
    <>
     <div className="card-container">

      <div className="fixed-container">
        {
         
          project?.project?.issues?.map((item, index) => {
            return (
              <Card
              key={index}
              onClick={() => jiraRoute(item)}
              className="HoverCard"
              style={{
                borderBottom: "1px solid #ccc",
                marginLeft: "0px",
                minHeight: "120px", // Set a minimum height for the card
                border:  moment(item?.fields.duedate).isBefore(currentDate) ? "3px solid red" : ""
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
                      item?.fields?.project.name
                        ? `${JiraURL}/${item.fields.project.name.toLowerCase()}/issues`
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p
                      //className="description"
                      style={{
                        maxHeight: "50px",
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
                      {item?.fields?.summary}
                    </p>
                  </a>
                </div>

                <div>
                  {item?.fields?.customfield_10044 ||
                  item?.fields?.customfield_10045 ||
                  item?.fields?.customfield_10048
                    ? " " +
                      (item?.fields.customfield_10044 ||
                        item?.fields.customfield_10048 ||
                        item?.fields.customfield_10045)
                    : 0}
                </div>
              </div>
              {/* <div style={{ display: "flex", flexDirection: "row" }}> */}

              {/*               
  <div
        style={{ 
          display: "flex",
           flexDirection: "row",
           color:"#DE350B",
           width: "70px", 
           gap: "1px",
           textTransform: "uppercase", 
           fontWeight: "bold"
           }}>
              {item?.fields?.duedate && (
      <div style={{ border: "1px solid #DE350B" }}>
          <CalendarOutlined style={{ marginLeft: "2px"}} />
        
          {moment(item.fields.duedate).format("DD MMM")}
        
      </div>
              )}     
   </div>  */}
              {/* <div style={containerStyle}>
                {item?.fields?.duedate && (
                  <div style={dateContainerStyle}>
                    <CalendarOutlined style={{ marginLeft: "2px" }} />
                    {moment(item?.fields?.duedate).format("DD MMM")}
                  </div>
                )}
              </div> */}
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
                  {item?.fields?.duedate && (
  <div style={{ border:  moment(item.fields.duedate).isBefore(currentDate) ? "1px solid red" : "1px solid black", color: moment(item.fields.duedate).isBefore(currentDate) ? "red" : "black" }}>
    <CalendarOutlined style={{ marginLeft: "2px" }} />
    {moment(item.fields.duedate).format("DD MMM")}
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
                  {item.fields.issuetype.name === "Task" ? (
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
                        {item?.key}
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
                        {item?.key}
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
                        {item?.fields?.priority?.name === "Medium" && (
                          <span>
                            <MenuOutlined style={{ color: "#FFAB00" }} />
                          </span>
                        )}
                      </Tooltip>
                      <Tooltip title="Low">
                        {item?.fields?.priority?.name === "Low" && (
                          <span>
                            <DownOutlined
                              style={{ color: "rgb(0, 101, 255)" }}
                            />
                          </span>
                        )}
                      </Tooltip>
                      <Tooltip title="High">
                        {item?.fields?.priority?.name === "High" && (
                          <span>
                            <UpOutlined
                              style={{ color: "rgb(255, 86, 48)" }}
                            />
                          </span>
                        )}
                      </Tooltip>
                      {!["Medium", "Low", "High"].includes(
                        item?.fields?.priority?.name
                      ) && (
                        <Tooltip title="Medium">
                          {item?.fields?.priority?.name === "Medium" && (
                            <span>
                              <MenuOutlined style={{ color: "#FFAB00" }} />
                            </span>
                          )}
                        </Tooltip>
                      )}
                    </div>
                    <div
                      style={{ marginTop: "-12px" }}
                      //className="Titleavatar"
                    >
                      <Tooltip
                        title={`Assignee: ${
                          item?.fields?.assignee?.displayName || "Unassigned"
                        }`}
                      >
                        {item?.fields?.assignee?.avatarUrls?.["48x48"] ? (
                          <img
                            src={
                              item?.fields?.assignee?.avatarUrls?.["48x48"]
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
          })
        }
      </div>
     </div>
    </>
  );
}

export default AssigneeCard;
