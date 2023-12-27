import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import "../../components/style.css";
import "../../components/card.css";
import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import "../card.css";
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

import AssigneeCard from "./assigneeCards.js";
import BoardCards from "../boardCards.js";
import { useDispatch } from "react-redux";
import { setMultipleAssigneeFilter } from "../../Redux/store/slice.js";
import FixedCards from "../fixedCards.js";

import moment from "moment";
function AssigneeContainer() {
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

  const dispatch = useDispatch();
  const [AssigneSearch,setAssigneSearch] =useState(null)
console.log(AssigneSearch,"AssigneSearchAssigneSearchAssigneSearchAssigneSearch")
  const assgineeValue = useSelector(
    (state) => state?.searchedText.assgineeValue
  );
  const projectsAll = useSelector((state) => state?.searchedText?.projectsAll?.projectData);

  console.log(assgineeValue,"assgineeValueassgineeValueassgineeValueassgineeValue inside component")
  console.log(projectsAll,"projectsAllprojectsAllprojectsAll inside component")

  const assigneeLoader = useSelector(
    (state) => state?.searchedText?.assigneeLoader
  );
  const { searchAssignee } = useParams();
  useEffect(()=>{
    if(assgineeValue?.length == 0 ){
      window.location.href = "/";
    }
    else{

      const filter = projectsAll.filter(
        (eee) => assgineeValue.some((e) => eee?.assignee === e)
      );
      setAssigneSearch(filter)
      dispatch(setMultipleAssigneeFilter(filter))
    }
  },[assgineeValue])
  const searchAssigneeformat = searchAssignee?.split("%")[0];

  return (
    <>
    {   AssigneSearch?.length !== 0 ?  <Box
        sx={{
          position: "fixed",
          top: "120px",
         
        }}
      >
        <div className="mainRoom">
          <div style={{ display: "flex" }} className="scrollable">
            <>
            { AssigneSearch?.map((project, index) => (
                  <Grid item key={index}>
                    {project?.name !== undefined ? (
                      <div
                        style={{
                          padding: "24px 2px",
                          width: "300px",
                          margin: "2px 4px",
                        }}
                        className="custom-card"
                      >
                   <div style={{display:"flex",justifyContent:"space-between"}}>

<p className="projectName">{project?.name}</p>
<p className="projectName">{project?.assignee}</p>
</div>
<div className="card-container" >
<div className="fixed-container">
  {project?.issues?.map((item,index)=>{
    return(
      <Card
      key={index}

  
      className="HoverCard"
      style={{
        borderBottom: "1px solid #ccc",
        marginLeft: "0px",

        minHeight: "120px", // Set a minimum height for the card
        border: moment(item?.fields.duedate).isBefore(currentDate) ? "3px solid red" : "",
        backgroundColor: item?.pinned ? "lightblue" : "",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
              style={{
                maxHeight: "50px",
                cursor: "pointer",
                marginTop: "-10px",
                color: "#001529",
                transition: "color 0.3s", // Add a smooth transition for color change
                textOverflow: "ellipsis",
              }}
              onClick={() => jiraRoute(item)}
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

        <div >
          {/* {item?.fields?.customfield_10044 ||
            item?.fields?.customfield_10045 ||
            item?.fields?.customfield_10048
            ? " " +
            (item?.fields.customfield_10044 ||
              item?.fields.customfield_10048 ||
              item?.fields.customfield_10045)
            : 0} */}
          
        </div>
       
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
        {item?.fields?.duedate && (
          <div style={{ border: moment(item.fields.duedate).isBefore(currentDate) ? "1px solid red" : "1px solid black", color: moment(item.fields.duedate).isBefore(currentDate) ? "red" : "black" }}>
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "3px",
          }}
        >
          {item?.fields.issuetype.name === "Task" ? (
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
                title={`Assignee: ${item?.fields?.assignee?.displayName || "Unassigned"
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
    )
  })}
</div>
</div>
                       
                      
                      </div>
                    ) : (
                      <p>No Assignee filter found</p>
                    )}
                  </Grid>
                ))}
             
                    
            </>
           
          </div>
        </div>
      </Box>:   
      <Box
        sx={{
          position: "fixed",
          top: "120px",
          left: "270px",
        }}
      ><div style={{ alignItems: "center" }}>
      <h3>{searchAssigneeformat} does not have any tasks</h3>
    </div> 
    </Box>}
    </>
  );
}

export default AssigneeContainer;
