import * as React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton/Skeleton.js";
import "./style.css";
import "./card.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAssgineeAll,
  fetchProjectDetailsAll,
} from "../Redux/Actions/action.js";
import FilterCard from "./filterComponents/filterCards.js";
import Dnd from "../DND.js";
import DndAssignee from "../DndAssignee.js";
import { useState } from "react";
import BoardCards from "./boardCards.js";

export default function BoardContainer({ searchAssignee, collapsed }) {
  const windowss = window.location.href
  const dispatch = useDispatch();
  const dataloader1 = useSelector((state) => state?.searchedText.dataloader1);
  const serachState = useSelector((state) => state?.searchedText.serachState);
  const projectsAll = useSelector((state) => state?.searchedText?.projectsAll?.projectData);
  const projectsArray = useSelector((state) => state?.searchedText?.projectsAll?.projectsArray);
  const filterLoader = useSelector((state) => state.searchedText.filterLoader);
  const serachLoader = useSelector(
    (state) => state?.searchedText?.serachLoader
  );

  // const projectSearchData = useSelector(
  //   (state) => state?.searchedText?.projectSearchData
  // );
  const projectSearchData = useSelector(
    (state) => state?.searchedText?.projectSearchData
  );
  console.log(projectSearchData, "projectSearchDataprojectSearchData")
  //Assignee API states
  const highlightProjectName = useSelector(
    (state) => state.searchedText.highlightProjectName
  );
  //API Filter states

  const filterValue = useSelector((state) => state?.searchedText?.filterValue);
  const filtersData = useSelector((state) => state?.searchedText?.filtersData);

  const [array, setArray] = useState(projectSearchData)


  React.useEffect(() => {
    setArray(projectSearchData)
  }, [projectSearchData])
  console.log(array, "arrayarrayarray")
  React.useEffect(() => {

    dispatch(fetchProjectDetailsAll());
    dispatch(fetchAssgineeAll());
    localStorage.setItem("group", "All");
  }, [searchAssignee]);



  return (
    <Box
      sx={{
        position: "fixed",
        top: "120px",
      }}
    >
      <div className={`mainRoom ${collapsed ? "collapsed" : ""}`}>
        <div style={{ display: "flex" }} className="scrollable">
          {array?.length == 0 ? <>
            {!serachState || filterLoader ?
              (
                <>

                  {dataloader1 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        marginLeft: "5px",
                        marginTop: "-165px",
                      }}
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton animation="wave" width={230} height={910} />
                      ))}
                    </div>
                  ) : filterValue === "To do" ||
                    filterValue === "In Progress" ||
                    filterValue === "Done" ||
                    filterValue === "Due" ? (
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
                      ) : (
                        <>

                          {filtersData?.length !== 0 ? filtersData?.map((item) => {
                            return (
                              <Grid>
                                <div
                                  style={{
                                    padding: "24px 2px",
                                    width: "300px",
                                    margin: "2px 4px",
                                  }}
                                  className="custom-card"
                                >
                                  <p className="projectName">
                                    {item?.projectname}
                                  </p>
                                  <FilterCard filteredProject={item} />

                                </div>
                              </Grid>
                            );
                          }) : <h1 style={{ textAlign: "center" }}>Data not Found</h1>}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {dataloader1 ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                            marginLeft: "5px",
                            marginTop: "-165px",
                          }}
                        >
                          {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton
                              animation="wave"
                              width={230}
                              height={780}
                              key={index}
                            />
                          ))}
                        </div>
                      ) : (

                        <>{windowss.includes("Dashboard2") ? <Dnd collapsed={collapsed} projectsAll={projectsArray} /> : <DndAssignee collapsed={collapsed} projectsAll={projectsAll} />}</>
                      )}
                    </>
                  )
                  }


                </>
              ) : (
                <>
                  {console.log("projectSearchDataprojectSearchDataassaadsadasdsa", projectSearchData)}
                  {projectSearchData?.length > 0 ? (
                    projectSearchData?.map((item, index) => (
                      <Grid>
                        {console.log("?????????????????????????", projectSearchData)}
                        <div
                          style={{
                            padding: "24px 2px",
                            width: "300px",
                            margin: "2px 4px",

                          }}
                          className="custom-card"
                        >
                          {highlightProjectName ? (
                            <p className="projectName">
                              <span className="highlighted">
                                {item?.projectname}
                              </span>
                            </p>
                          ) : (
                            <p className="projectName">{item?.projectname}</p>
                          )}

                          <FilterCard filteredProject={item} />
                        </div>
                      </Grid>
                    ))
                  ) : (
                    <div style={{ alignItems: "center" }}>
                      <h3>No Search result Found</h3>
                    </div>

                  )}
                </>
              )}
          </> : <>
            {array?.map((item, index) => (
              <Grid>
                {console.log("?????????????????????????", projectSearchData)}
                <div
                  style={{
                    padding: "24px 2px",
                    width: "300px",
                    margin: "2px 4px",

                  }}
                  className="custom-card"
                >
                  {highlightProjectName ? (
                    <p className="projectName">
                      <span className="highlighted">
                        {item?.name}
                      </span>
                    </p>
                  ) : (
                    <p className="projectName">{item?.name}</p>
                  )}

                  <BoardCards project={item} text={item?.name} assignee={item?.assignee} />
                </div>
              </Grid>
            ))}
          </>}
        </div>
      </div>
    </Box>
  );
}
