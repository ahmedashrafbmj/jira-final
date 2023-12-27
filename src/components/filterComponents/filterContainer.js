import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import { Layout } from "antd";
import "../dashboard/style.css";
import "../card.css";
import { useSelector, useDispatch } from "react-redux";
//import SearchCard from "./SearchCard.js";
//import HeaderComponenet from "../dashboard/Header/header.js";
//import SidebarComponenet from "../dashboard/Sidebar/sidebar.js";
import FilterCard from "../filterComponents/filterCards.js";
const { Sider, Content } = Layout;

function FilterBox() {
  //   const ApiSearch = useSelector((state) => state?.searchedText.ApiSearch);
  //   const serachLoader = useSelector(
  //     (state) => state?.searchedText?.serachLoader
  //   );
  const filterLoader = useSelector(
    (state) => state?.searchedText?.filterLoader
  );
  const groupbyData = useSelector((state) => state?.searchedText?.groupbyData);
  //const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "120px",
          // left: "270px",
        }}
      >
        <div
          //style={{ display: "flex", marginLeft: "431px" }}
          className="mainRoom"
        >
          <div style={{ display: "flex" }} className="scrollable">
            <>
              {filterLoader ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "170vh",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : groupbyData?.length > 0 ? (
                groupbyData?.map((item, index) => (
                  <Grid>
                    <div
                      style={{
                        padding: "24px 2px",
                        width: "300px",
                        margin: "2px 4px",
                        overflow: "scroll",
                      }}
                      className="custom-card"
                    >
                      <p className="projectName">{item?.projectname}</p>
                      {/* <FilterCard filteredProject={item} /> */}
                    </div>
                  </Grid>
                ))
              ) : (
                <p>No Filter results found.</p>
              )}
            </>
            {/* <>
              {serachLoader ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "170vh",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : ApiSearch?.issues?.length > 0 ? (
                <Grid>
                  <div
                    style={{
                      padding: "24px 2px",
                      width: "300px",
                      margin: "2px 4px",
                      overflow: "scroll",
                    }}
                    className="custom-card"
                  >
                    <p className="projectName">
                      {ApiSearch?.issues[0]?.fields?.project?.name}
                    </p>
                    <SearchCard project={ApiSearch} />
                  </div>
                </Grid>
              ) : (
                ""
               
              )}
            </> */}
          </div>
        </div>
      </Box>
    </>
  );
}

export default FilterBox;
