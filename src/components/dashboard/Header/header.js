import React, { useEffect, useState, useRef } from "react";
import {

  AudioOutlined,
} from "@ant-design/icons";
import { InputLabel, Tooltip } from "@mui/material";
import { AutoComplete, Avatar, Button, Switch } from "antd";
import "../style.css";
import { Layout, Menu, Modal } from "antd";
import logo from "../../../images/proprintIcon.png";
import { Input, Space } from "antd";
import { MenuItem } from "@mui/material";
import { FormControl, Select, OutlinedInput, ListItemText, Checkbox } from "@mui/material";
import "../contentstyle.css";
// import { Intro } from 'intro.js-react';
import 'intro.js/introjs.css';
// import { Steps } from 'intro.js-react';
import { useDispatch, useSelector } from "react-redux";

import {
  setValue,
  clearSearchValue,
  getStatusFilter,
  getStatusPin,
  setMultipleAssignee,
  SerachByProjectName,
  setArrayLength,
} from "../../../Redux/store/slice.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  SerachData,
  SerachDataAssigne,
  groupByFilterAction,

  SerachByProjectKey,
  fetchProjectNameAll,

} from "../../../Redux/Actions/action.js";
import BoardContainer from "../../boardContainer.js";
import SelectDropDwon from "./Select.js";
const { Header } = Layout;
const { Search } = Input;

let speech;
if (window.webkitSpeechRecognition) {
  const SpeechRecognition = window.webkitSpeechRecognition;
  speech = new SpeechRecognition();
} else {
  console.error("SpeechRecognition not supported");
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 144,
    },
  },
};
function HeaderComponenet() {

  const [isPin, setIsPin] = useState(false); // Set an initial value, you can adjust it based on your needs

  const introRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const searchAssigneeformat = searchAssignee?.split("%")[0];
  const projects2 = useSelector((state) => state?.searchedText.assigneeAll);
  const allprojectsName = useSelector((state) => state?.searchedText?.allprojectsName);
  // All Assignee name 
  const allAssigneeNames = useSelector((state) => state?.searchedText?.assigneeAll);
  // const [projectNames,setProjectNames] = useState(allprojectsName?.allprojectsName);
  const names = allprojectsName?.allProjectNames?.map((project) => (project?.projectName));
  const assgineeValues = useSelector((state) => state?.searchedText?.assgineeValueFilter);
  console.log("alsaodnasds", assgineeValues.length);

  dispatch(setArrayLength(assgineeValues.length))


  // console.log();
  // const names  = []
  // const names  = allprojectsName?.allProjectNames?.map((e)=>e?.projectName)
  const autoCompleteOptionsKeys = allprojectsName?.allKeys
    ?.map((project) => (
      <AutoComplete.Option key={project} value={project}>
        {project}
      </AutoComplete.Option>
    ));
  console.log(allprojectsName, "allprojectsName")
  const allAsignee = projects2?.allAsignee;

  const { searchAssignee } = useParams();
  const searchAssigneeformat = searchAssignee?.split("%")[0];
  const [personName, setPersonName] = useState([searchAssigneeformat]);
  console.log(searchAssigneeformat, "personNamepersonNamepersonNamepersonName")
  const [listening, setListening] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState(String);
  const [voicetext, setVoiceText] = useState(String);
  const [status, setStatus] = useState("All");
  const [pin, setpin] = useState("Drag and Drop");
  const [searchValue, setSearchvalue] = React.useState("");
  const ApiSearch = useSelector((state) => state?.searchedText?.ApiSearch);
  const [isHovered, setIsHovered] = useState(false);
  const [backnavigation, setbacknavigation] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isclick, setIsClick] = useState(false);
  const [cancelSearch, setCancelSearch] = useState(false);
  const [searchdropDown, setSearchdropDown] = React.useState("search By");
  const [showModal, setShowModal] = useState(false);
  const [stepsEnabled, setstepsEnabled] = useState(true)
  const [initialStep, setinitialStep] = useState(0)

  console.log("personName", personName);
  const uniqueDisplayNames = new Set();
  // const urls = new Set();

  allAssigneeNames?.allAsignee?.forEach(items => {
    items.forEach(names => {
      uniqueDisplayNames.add(names?.displayName);
      // urls.add(names?.avatarUrls?.["48x48"]);
    });
  });

  // console.log("All Namesss & Urls", urls);


  const handlesearchDropDown = (event) => {
    setSearchdropDown(event.target.value);
  };


  const handleInputChange = (e, type) => {
    console.log(e, "eeeeeeeeeeeeeee")
    // const inputValue = e.target.value;
    if (type == "key") {
      setText(e.target.value);

    }
    else {
      setText(e)
    }

    if (e || e?.target?.value === "") {

      dispatch(clearSearchValue());
      return;
    }

    // Perform other actions or search logic if needed

  };
  const onExit = () => {
    setstepsEnabled(false);
  };
  const handleSearch = async (value) => {
    if (searchdropDown === "search By") {

      return;
    }
    try {
      if (value !== "") {
        if (searchdropDown === "Project") {
          dispatch(setValue(value));
          setText(value)
          // dispatch(SerachByProjectName(value));
        }

        else if (searchdropDown === "Key") {
          dispatch(setValue(value));
          dispatch(SerachByProjectKey(value));
        } else if (searchdropDown === "Description") {
          dispatch(setValue(value));
          dispatch(SerachData(value));
        }
      } else {
        dispatch(clearSearchValue());

      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };




  const handlefiltersStatus = (event) => {
    setStatus(event.target.value);
    dispatch(getStatusFilter(event.target.value));
    dispatch(clearSearchValue());
    if (
      event.target.value === "To do" ||
      event.target.value === "In Progress" ||
      event.target.value === "Done" ||
      event.target.value === "Due"
    ) {
      dispatch(groupByFilterAction(event.target.value));
    } else {
      window.location.href = "/";
    }
  };


  const handleHover = () => {
    setIsHover(true);
    // Add your hover-related logic here

    // You can add additional styling or behavior when the search bar is hovered
  };
  const handleOk = () => {
    setShowModal(false);
  };
  const handlePointerLeave = () => {
    setIsHover(false);
    setShowPlaceholder(true);
  };

  const handleClicked = () => {
    setIsClick(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setListening(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsShow(false);
  };

  useEffect(() => {
    // localStorage.setItem("pin","Drag")
    if (!speech) {
      console.error("Speech recognition not supported");
      return;
    }

    speech.onstart = () => { };

    speech.onend = () => { };

    speech.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    speech.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results?.length; i++) {
        const recognizedText = event.results[i][0].transcript;
      }

      // Use the last result for final transcription
      const finalText = event.results[event.results?.length - 1][0].transcript;

      setVoiceText(finalText);
    };
    return () => {
      // Cleanup function to stop speech recognition when the component unmounts
      speech.stop();
      setVoiceText("");
    };
  }, [speech]);

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      setTimeout(() => {
        speech.stop();
      }, 2000);
    } else {

      speech.start();
    }
  };

  const handleCancel = () => {


    dispatch(clearSearchValue());
  };
  const handleCancelModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (voicetext) {
      dispatch(setValue(voicetext));
      dispatch(SerachData(voicetext));

    }
  }, [voicetext]);
  useEffect(() => {

    dispatch(fetchProjectNameAll());


  }, []);

  if ("speechSynthesis" in window) {
  } else {
  }

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = text;
      speechSynthesis.speak(msg);
    } else {
      console.error("Speech synthesis not supported");
    }
  };
  useEffect(() => {
    if (searchValue) {
      const combinedText = "Search Result Include " + searchValue;

      speakText(combinedText);
    } else {

    }
  }, [searchValue]);

  useEffect(() => {
    if (ApiSearch?.issues?.length > 0) {
      setSearchvalue(ApiSearch?.issues[0]?.fields?.project?.name);
    }
  }, [text]);

  const [selectedAvatar, setSelectedAvatar] = useState([searchAssigneeformat]);

  const uniqueAssigneeNames = new Set();


  const handleAvatarClick = (index) => {
    const searchAssigneeformat = searchAssignee?.split("%")[0];
    console.log(index, "asnxuisancisanco");
    // Check if the index is already selected
    const isSelected = selectedAvatar.includes(index);

    if (isSelected) {
      // Index is already selected, remove it from the array
      const updatedSelectedAvatar = selectedAvatar.filter((item) => item !== index);
      setSelectedAvatar(updatedSelectedAvatar);
    } else {
      // Index is not selected, add it to the array

      setSelectedAvatar([...selectedAvatar, index]);
    }

    console.log("Index??", index);
    // Handle other actions as needed
    dispatch(SerachDataAssigne(index));
    dispatch(setValue(index));
    navigate(`/search/${index}`);
  };

  console.log("selectedAvatar", selectedAvatar);
  useEffect(() => {
    dispatch(setMultipleAssignee(selectedAvatar))
  }, [selectedAvatar])
  console.log(selectedAvatar, "selectedAvatarselectedAvatar")
  const steps = [
    {
      element: '#div',
      intro: 'To perform a search, please choose a value from the drop-down menu first.',
    },

    // ... more steps
  ];
  const handleChange = (event) => {
    console.log(event.target.value, "adasdsadsadsa");
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  console.log(personName, "adasdsadsadsa");
  return (
    <>
      {backnavigation && <BoardContainer />}
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.5)",
          position: "fixed",
        }}
      >
        <div className="Proprintlogo">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              marginTop: "5px",
              alignItems: "flex-start",

            }}
          />
        </div>
        <div className="pageHeaderContainer">
          <hr class="gray-lineTop " />
          <div
            style={{
              display: "flex",
              flexDirection: "row",

            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "none" }}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: `${searchdropDown !== "Project" ? "-10px" : "0px"}`,
                }}
              >
                {/* <Intro
        ref={introRef}
        steps={[
          {
            element: '.target-element',
            intro: 'This is a target element with an introduction!',
          },
          // Add more steps as needed
        ]}
      /> */}
                {/* <Steps
                  enabled={stepsEnabled}
                  steps={steps}

                  initialStep={initialStep}
                  onExit={onExit}
                /> */}
                <Space className="target-element" >
                  <FormControl>
                    <Select

                      style={{
                        height: "30px",
                        marginTop: "11px",
                        fontSize: "11px",
                        padding: "10px",
                        transition: "width 0.2s ease-in",
                      }}
                      className="menuItems"
                      id="div"
                      // defaultValue="search By"
                      value={cancelSearch ? "search By" : searchdropDown}
                      onChange={handlesearchDropDown}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {" "}
                      <MenuItem value="search By" style={{ fontSize: "11px" }}>
                        Search By

                      </MenuItem>
                      <MenuItem
                        value="Project"
                        index={1}
                        style={{ fontSize: "11px" }}
                      >
                        Project
                      </MenuItem>
                      <MenuItem
                        value="Key"
                        index={2}
                        style={{ fontSize: "11px" }}
                      >
                        Key
                      </MenuItem>

                      <MenuItem
                        value="Description"
                        index={5}
                        style={{ fontSize: "11px" }}
                      >
                        Description
                      </MenuItem>
                    </Select>
                    {/* <p className="text-danger">rizwan mayra bayta</p> */}
                  </FormControl>
                </Space>
              </div>

              {searchdropDown !== "Project" ?
                <Search
                  //placeholder={isHover ? 'Search project':''}
                  placeholder={
                    searchdropDown === 'search By'
                      ? 'First Select a value from Drop down'
                      : searchdropDown === 'Project'
                        ? 'Search by Project Name'
                        : searchdropDown === 'Key'
                          ? 'Search by Project Key'
                          : searchdropDown === 'Description'
                            ? 'Search by Project Description'
                            : ''
                  }
                  //placeholder={isHover ? "Search project" : ""}
                  allowClear
                  style={{
                    fontSize: "11px",
                    width: "393px",
                    //width: isclick ? "185px" : "120px",
                    padding: "10px",
                    marginTop: "10px",
                    transition: "width 0.2s ease-in", // Add a smooth transition for width change
                  }}
                  disabled={searchdropDown === 'search By'}
                  value={text ? text : voicetext}
                  onSearch={handleSearch}
                  onCancel={handleCancel}
                  onChange={(e) => handleInputChange(e, "key")}
                  onPointerEnter={handleHover}
                  onPointerLeave={handlePointerLeave}
                  onClick={handleClicked}
                  className="custom-search" // add a custom class for styling
                //onChange={handleInputChangeDebounced}
                /> :
                // <AutoComplete
                //   placeholder={
                //     searchdropDown === 'search By'
                //       ? 'First Select a value from Drop down'
                //       : searchdropDown === 'Project'
                //         ? 'Search by Project Name'
                //         : searchdropDown === 'Key'
                //           ? 'Search by Project Key'
                //           : searchdropDown === 'Description'
                //             ? 'Search by Project Description'
                //             : ''
                //   }
                //   allowClear
                //   className="custom-search"
                //   disabled={searchdropDown === 'search By'}
                //   value={text ? text : voicetext}
                //   onSelect={handleSearch}  // Use onSelect to handle value selection
                //   onChange={handleInputChange}
                //   onSearch={handleSearch}  // Use onSearch for handling search when Enter is pressed
                //   mode="multiple" 
                // >
                //   {searchdropDown === 'Project' ? autoCompleteOptions : autoCompleteOptionsKeys}
                // </AutoComplete>
                <SelectDropDwon />
              }

              <Modal
                footer={[
                  <Button key="ok" type="primary" onClick={handleOk}>
                    OK
                  </Button>,
                ]}
                title={null}
                open={showModal}
                onCancel={handleCancelModal}
              >
                <p>Select drop-down value first!</p>
              </Modal>

              {/* ) : null} */}
              <div
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  cursor: "pointer",
                  marginTop: "6px",
                  // marginLeft: "-11px",

                }}
              >
                <AudioOutlined
                  onClick={listen}
                  style={{
                    fontSize: "20px",
                    padding: "5px",
                    color: isHovered ? "Blue" : "GrayText",
                    background: isClicked ? "lightgray" : "none",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                  }}
                  className={`${isListening && "isListening"}`}
                />
              </div>
              <div
                style={{
                  marginTop: "11px",
                  marginLeft: "15px",
                }}
              >
                {/* <Avatar.Group
                  maxCount={1}
                  maxStyle={{
                    color: "#f56a00",
                    size: "small",
                    backgroundColor: "#fde3cf",
                    cursor: "pointer",
                  }}
                >
                  {allAsignee?.map((firstindex, i) => {
                    return (
                      <div
                        style={{ display: "flex", flexDirection: "row" }}
                        key={i}

                      >
                        {firstindex?.map((e, j) => {
                            const isSelected = selectedAvatar.includes(e.displayName);
                          if (!uniqueAssigneeNames.has(e.displayName)) {
                            uniqueAssigneeNames.add(e.displayName);
                            return (
                              <Tooltip
                                style={{
                                  margin: "-1px",
                                  marginTop: "3px",
                                  padding: "0px",
                                }}
                                key={j}
                                title={e.displayName}
                              >

                                <img
                                  key={j}
                                  src={e?.avatarUrls?.["48x48"]}
                                  alt="Avatar"

                                  style={{
                                    border: `${isSelected
                                      ? "3px"
                                      : "0px"
                                      } solid ${isSelected
                                        ? "red"
                                        : "white"
                                      }`,
                                    height: "28px",
                                    borderRadius: "50%",
                                  }}

                                  onClick={() =>
                                    handleAvatarClick(e.displayName)
                                  }
                                />


                              </Tooltip>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </Avatar.Group> */}
              </div>
            </div>
            <Space>

              <h5 className="fontClass" style={{ fontWeight: "700" }}>
                ASSIGNEES BY
              </h5>
              <div>
                <FormControl sx={{ m: 0, width: 100 }} >
                  {personName?.length == 0 ? <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel> : null}

                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    onChange={handleChange}
                    value={personName}
                    input={personName?.length == 0 ? <OutlinedInput label="Assginees" /> : ""}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{
                      height: "30px",
                      marginTop: "15px",
                      fontSize: "11px",

                    }}
                  >
                    <MenuItem
                      value="Search By"
                      index={1}
                      style={{ fontSize: "11px" }}
                    >
                      Search By
                    </MenuItem>

                    {[...uniqueDisplayNames].map((displayName, index) => {
                      const isSelected = selectedAvatar.includes(displayName);

                      return <MenuItem key={index} value={displayName} style={{ fontSize: "11px" }} onClick={() =>
                        handleAvatarClick(displayName)
                      }>
                        {console.log("asncoisnaocsac", personName.indexOf(displayName) > -1)}
                        <Checkbox
                          size="small"
                          style={{ fontSize: "11px", paddingLeft: "0" }}
                          checked={personName.indexOf(displayName) > -1}
                        />
                        {/* <img
                          key={index}
                          src=""
                          alt="Avatar"

                          style={{
                            marginRight: "10px",
                            border: `${isSelected
                              ? "3px"
                              : "0px"
                              } solid ${isSelected
                                ? "red"
                                : "white"
                              }`,
                            height: "28px",
                            borderRadius: "100%",
                          }}
                        /> */}
                        {displayName}

                      </MenuItem>
                    })}

                  </Select>

                </FormControl>
              </div>
            </Space>


            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "350px",
                position: "fixed",
                left: "692px",
                top: "21px",

              }}
            >
              <Space>
                <h5 className="fontClass" style={{ fontWeight: "700" }}>
                  STATUS BY
                </h5>
                <FormControl>
                  <Select
                    style={{
                      height: "30px",
                      marginTop: "15px",
                      fontSize: "11px",
                    }}
                    className="menuItems"
                    value={status}
                    onChange={handlefiltersStatus}

                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem
                      value="All"
                      index={1}
                      style={{ fontSize: "11px" }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      value="To do"
                      index={2}
                      style={{ fontSize: "11px" }}
                    >
                      Todo
                    </MenuItem>
                    <MenuItem
                      value="In Progress"
                      index={3}
                      style={{ fontSize: "11px" }}
                    >
                      In Progress
                    </MenuItem>

                    <MenuItem
                      value="Done"
                      index={5}
                      style={{ fontSize: "11px" }}
                    >
                      Done
                    </MenuItem>
                    <MenuItem
                      value="Due"
                      index={5}
                      style={{ fontSize: "11px" }}
                    >
                      All Due Task
                    </MenuItem>
                  </Select>
                </FormControl>
              </Space>
              <Space style={{ marginLeft: "20px" }}>
                <h5 className="fontClass" style={{ fontWeight: "700" }}>
                  PIN/DRAG
                </h5>
                <FormControl onClick={() => {
                  setIsPin(!isPin);
                  dispatch(getStatusPin(isPin ? 'Pin' : 'Drag'));
                }} style={{ marginTop: "20px" }}>
                  <Switch checkedChildren="Drag" unCheckedChildren="Pin" />

                </FormControl>
              </Space>
            </div>

          </div>
          <hr class="gray-line" />
        </div>
        <Menu
          className="headerMenu"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
        />
      </Header>
    </>
  );
}
export default HeaderComponenet;
