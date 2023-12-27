import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import { Layout } from "antd";
import "../style.css";
import "../card.css";
import { useSelector, useDispatch } from "react-redux";
//import SearchCard from "./SearchCard.js";
import HeaderComponenet from "../dashboard/Header/header.js";
import SidebarComponenet from "../dashboard/Sidebar/sidebar.js";
//import SearchBox from "./SearchContainer.js";
import { useParams } from "react-router-dom";
import BoardContainer from "../boardContainer.js";
import FilterBox from "./filterContainer.js";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

const { Sider, Content } = Layout;
export default function FilterContainer() {
  // const { searchAssignee } = useParams();
  const { groupBy } = useParams();
  // const ApiSearch = useSelector((state) => state?.searchedText.ApiSearch);
  // const serachLoader = useSelector(
  //   (state) => state?.searchedText?.serachLoader
  // );

  const [collapsed, setCollapsed] = React.useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <HeaderComponenet />
      <Layout style={{ width: "2000px" }}>
        <Content>
          <Layout
            style={{
              backgroundColor:"white !important",
              width: "200",
              marginLeft: collapsed ? "-340px" : "-330px",
            }}
          >
            <SidebarComponenet
              collapsed={collapsed}
              onToggleSidebar={toggleSidebar}
            />
            {groupBy !== "groupBy" ? (
//  <DndProvider backend={HTML5Backend}>
  <FilterBox groupBy={groupBy} />

// </DndProvider>
            ) : (
              // <DndProvider backend={HTML5Backend}>
                <BoardContainer groupBy={groupBy} />

              // </DndProvider>
            )}
            {/* {searchAssignee !== "searchAssignee" ? (
              <SearchBox searchAssignee={searchAssignee} />
            ) : (
              <BoardContainer searchAssignee={searchAssignee} />
            )} */}
          </Layout>
        </Content>
      </Layout>
    </>
  );
}
