import React from "react";
import {
  LeftCircleOutlined
  , HomeOutlined
} from "@ant-design/icons";
import { Layout } from "antd";
import "./sidebar.css"
import { useNavigate, Link } from "react-router-dom";

const { Sider } = Layout;

function SidebarComponent({ collapsed, onToggleSidebar }) {
  const Navigate = useNavigate()

  const sidebarItems = [
    {
      name: "Dashboard",
      url: "/",
      icon: HomeOutlined,
    },

  ];


  return (
    <Sider
      style={{
        background: "none",
        position: "fixed",
        left: "1px",
        top: "102px",
        marginTop: "-14px",
        transition: " all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",

      }}
      collapsed={collapsed}
    >
      <LeftCircleOutlined
        style={{
          marginLeft: collapsed ? "69px" : "183px",
          fontSize: "20px",
          color: "black",
          cursor: "pointer",
          position: "relative",
          transform: collapsed ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.5s margin-left 0.5s width 0.5s",
        }}
        onClick={onToggleSidebar}
      />
      <ul className="sidebar_list">
        {sidebarItems.map(({ name, url, icon: Icon }) => {

          return (
            <li className="sidebar_item" onClick={() => Navigate("/")} key={name}>
              <Link to={"/"}>

                <a className="sidebar_Link" href={url}>

                  <span className="sidebar_icon">
                    <Icon />
                  </span>
                  <a className="" style={{ color: "black" }} href={url}>

                    {!collapsed && <span className="sidebar_name">    <a className="" style={{ color: "black" }} href={url}>{name}</a></span>}
                  </a>

                </a>
              </Link>
            </li>
          )
        }
        )}
      </ul>
    
    </Sider>
  );
}

export default SidebarComponent;
