import React from "react";
import "./card.css";
import { styled } from "@mui/system";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Tooltip,
} from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import { Avatar, Card } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  DownOutlined,
  UpOutlined,
  CalendarOutlined,
  EllipsisOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import bugIcon from "../images/bugIcon.PNG";
import taskIcon from "../images/taskIcon.PNG";

function ScrollCards(scrollItems) {
 
  return (
    <>
      <div className="scrollable-container">
        {scrollItems?.scrollItems?.issues?.map((item, index) => (
          <Card className="card"
            key={index}
            style={{
              borderBottom: "1px solid #ccc",
              marginLeft: "0px",
              // width: "100%", // Adjust as needed for responsiveness
              gap: "2px",
              //height: "120px",
              //width: "250px",
               
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
                }}
              >
                <a
                  href={
                    item?.fields?.project.name === "My Kanban Project"
                      ? "https://dcmv2.atlassian.net/jira/software/projects/KAN/boards/1"
                      : item?.fields?.project.name === "Jira dashboard"
                      ? "https://dcmv2.atlassian.net/jira/software/c/projects/JD/issues"
                      : item?.fields?.project.name === "Nixaam Dashboard"
                      ? "https://dcmv2.atlassian.net/jira/software/projects/ND/boards/5"
                      : item?.fields?.project.name === "V3DCM"
                      ? "https://dcmv2.atlassian.net/jira/software/projects/V3DCM/boards/7"
                      : ""
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="description">{item?.fields?.summary}</p>
                </a>
              </div>

              <div style={{ marginTop: "-10px" }}>
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

            <div style={{ display: "flex", flexDirection: "row" }}>
              <CalendarOutlined style={{ marginRight: "5px" }} />
              {item?.fields?.duedate ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <span>{moment(item.fields.duedate).format("DD MMM")}</span>
                </div>
              ) : (
                <div style={{ display: "block" }}> </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // position: "fixed",
                // top:"109px",
                //bottom:"20px",

              }}
             >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "3px",
                  position: "fixed",
                  top: "259px"}}
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
              {/* <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={<span>{item?.key}</span>}
                />
              </FormGroup> */}
              <span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    //justifyContent: "space-between",
    marginTop: "auto",
    position: "fixed",
    top: "258px",
    marginLeft: "199px",
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
                          <DownOutlined style={{ color: "rgb(0, 101, 255)" }} />
                        </span>
                      )}
                    </Tooltip>

                    <Tooltip title="High">
                      {item?.fields?.priority?.name === "High" && (
                        <span>
                          <UpOutlined style={{ color: "rgb(255, 86, 48)" }} />
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

                  <div className="Titleavatar">
                    <Tooltip
                      title={`Assignee: ${
                        scrollItems?.scrollItems?.assignee || "Unassigned"
                      }`}
                    >
                      {item?.fields?.assignee?.avatarUrls?.["48x48"] ? (
                        <img
                          src={item?.fields?.assignee?.avatarUrls?.["48x48"]}
                          alt="Avatar"
                          className="imageAvatar"
                        />
                      ) : (
                        <Avatar
                          //size="small"
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
          // </Grid>
        ))}
      </div>
    </>
  );
}

export default ScrollCards;
