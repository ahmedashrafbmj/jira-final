import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import { Layout } from "antd";
//import "../style.css";
import "../../components/card.css";
import { useSelector, useDispatch } from "react-redux";
import SearchCard from "./SearchCard.js";
import HeaderComponenet from "../dashboard/Header/header.js";
import SidebarComponenet from "../dashboard/Sidebar/sidebar.js";
import SearchBox from "./SearchContainer.js";
import { useNavigate, useParams } from "react-router-dom";
import BoardContainer from "../boardContainer.js";
import FilterBox from "../filterComponents/filterContainer.js";
import AssigneeContainer from "../assigneeComponents/assigneeContainer.js";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
const { Sider, Content } = Layout;

export default function SearchContainer() {
  const { searchAssignee } = useParams();
  const [projectsDatas,setprojectsDatas] =useState(null)
  const AssigneSearch = useSelector(
    (state) => state?.searchedText.AssigneSearch
  );
  const assgineeValue = useSelector(
    (state) => state?.searchedText.assgineeValue
  );
  const projectsAll = useSelector((state) => state?.searchedText?.projectsAll?.projectData);

  console.log(assgineeValue,"assgineeValueassgineeValueassgineeValueassgineeValue inside component")
  console.log(projectsAll,"projectsAllprojectsAllprojectsAll inside component")


  

  useEffect(()=>{
    const filter = projectsAll.filter(
      (eee) => assgineeValue.some((e) => eee?.assignee === e)
    );
    setprojectsDatas(filter)
  },[assgineeValue])

  console.log(projectsDatas,"projectsDatasprojectsDatas")



  // console.log(filteredProjects,"filteredProjectsfilteredProjectsfilteredProjectsfilteredProjects inside component")
  const Navigate = useNavigate();
  const { groupBy } = useParams();
  // const ApiSearch = useSelector((state) => state?.searchedText.ApiSearch);
  // const serachLoader = useSelector(
  //   (state) => state?.searchedText?.serachLoader
  // );

  const [collapsed, setCollapsed] = React.useState(false);
  //const [hideStatus, setHideStatus] = React.useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    window.location.href = "/";
  };

  // React.useEffect(() => {
  //   setHideStatus(true);
  // }, []);

  return (
    <>
      <Layout style={{ width: "2000px" }}>
        <HeaderComponenet
        // hideStatus={hideStatus}
        // setHideStatus={setHideStatus}
        />
        <Content>
          <Layout
            style={{
              backgroundColor:"white !important",
              width: "200",
              //marginLeft: collapsed ? "-340px" : "-285px",
              marginLeft: collapsed ? "-340px" : "-330px",
            }}
          >
            <SidebarComponenet
              collapsed={collapsed}
              onToggleSidebar={toggleSidebar}
            />
            {/* {
              searchAssignee !== "searchAssignee" ? (
            //  <DndProvider backend={HTML5Backend}>

                // </DndProvider>
              ) : (
            //  <DndProvider backend={HTML5Backend}>

                  <BoardContainer />
                // </DndProvider>
              )
              // (
              //   <BoardContainer searchAssignee={searchAssignee} />
              // )
            } */}
                  <AssigneeContainer AssigneSearch={projectsDatas} />
          
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
