import React, { useState } from "react";
import { Layout } from "antd";
import HeaderComponenet from "./Header/header.js";
import SidebarComponent from "./Sidebar/sidebar.js";
import BoardContainer from "../boardContainer.js";
import { useSelector } from "react-redux";


const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const assgineeValues = useSelector((state) => state?.searchedText?.arrayValue);
  console.log("alsaodnasds", assgineeValues);


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ width: "2000px" }}>
      <HeaderComponenet />
      <Content>
        <Layout
          style={{
            width: "200",
            marginLeft: collapsed ? "-444px" : "-329px",

          }}
        >
          <SidebarComponent
            collapsed={collapsed}
            onToggleSidebar={toggleSidebar}
          />


          <BoardContainer collapsed={collapsed} />
        </Layout>
      </Content>
    </Layout>
  );
};
export default Dashboard;
