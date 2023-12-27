// /* eslint-disable */
// import { Layout, Menu, Modal, Select } from "antd";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { setMultipleProjectsFilter, setSearchByProjectName } from "../../../Redux/store/slice.js";
// import { SerachByProjectName } from "../../../Redux/Actions/action.js";
// import { Box } from "@mui/material";

// const SelectDropDwon = () => {
//   const [data, setData] = useState([])
//   const [filteredData, setFilteredData] = useState([])
//   const dispatch = useDispatch()
//   const projectsAll = useSelector((state) => state?.searchedText?.projectsAll?.projectData);
//   console.log(projectsAll, "projectsAllprojectsAllprojectsAllprojectsAll")
//   const allprojectsName = useSelector((state) => state?.searchedText?.allprojectsName);
//   console.log(allprojectsName?.allProjectNames, "allprojectsName?.allProjectNamesallprojectsName?.allProjectNames")
//   const options = allprojectsName?.allProjectNames?.map((e, i) => ({ value: e?.projectName, label: e?.projectName }))
//   console.log(options, "optionsoptionsoptionsoptions")
//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//     handlePostRequest(value)
//     setData(value)
//     dispatch(setMultipleProjectsFilter(value))
//   };
//   console.log(data, "datadatadatadatadatadatadat");
//   const handlePostRequest = () => {
//     fetch('http://localhost:5000/post', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json', // set the content type to JSON
//         // Add any other headers you may need
//       },
//       // body: JSON.stringify(postData), // convert the payload data to JSON
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json(); // parse the response JSON
//       })
//       .then(data => {
//         // handle the successful response data
//         console.log('Success:', data);
//       })
//       .catch(error => {
//         // handle errors
//         console.error('Error:', error);
//       });
//   };



//   useEffect(() => {



//     const filter = projectsAll.filter(
//       (eee) => data?.some((e) => eee?.name === e)
//     );
//     console.log(filter, "filterfilterfilter")
//     setFilteredData(filter);
//     //   setAssigneSearch(filter)
//     // dispatch(SerachByProjectName(filter))
//     dispatch(setSearchByProjectName(filter))

//   }, [data])
//   const tagDisplay = data?.length > 2 ? `+${data?.length}` : null;
//   console.log("TagDisplattt", options);
//   return (
//     <>
//       <Select
//         mode="tags"
//         multiple
//         style={{
//           width: '25vw !important',
//           height: "4.5vh",
//           marginTop: "19px"
//         }}
//         // defaultValue={["ProjectName"]}
//         placeholder="Tags Modesdjhdbhjbdhfdv hg fgdh vdh"
//         onChange={handleChange}
//         options={options}

//       >
//       </Select >
//       {tagDisplay && <div style={{ margin: "0 10px 0 10px" }}>{data.length >= 2 && tagDisplay}</div>
//       }
//     </>
//   )
// }
// export default SelectDropDwon 
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleProjectsFilter, setSearchByProjectName } from "../../../Redux/store/slice.js";
import { SerachByProjectName } from "../../../Redux/Actions/action.js";
import { Select } from "antd";

const SelectDropDwon = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();
  const projectsAll = useSelector((state) => state?.searchedText?.projectsAll?.projectData);
  const allprojectsName = useSelector((state) => state?.searchedText?.allprojectsName);
  const options = allprojectsName?.allProjectNames?.map((e, i) => ({ value: e?.projectName, label: e?.projectName }));

  const handleChange = (value) => {
    setSelectedTags(value.slice(-3)); // Only keep the last three selected tags
    dispatch(setMultipleProjectsFilter(value));
  };

  useEffect(() => {
    const filter = projectsAll.filter((eee) => selectedTags?.some((e) => eee?.name === e));
    dispatch(setSearchByProjectName(filter));
  }, [selectedTags, projectsAll]);

  return (
    <>
      <Select
        mode="multiple"
        style={{
          width: '450px',
          height: "5vh",
          marginTop: "19px"
        }}
        placeholder="Tags Modesdjhdbhjbdhfdv hg fgdh vdh"
        onChange={handleChange}
        options={options}
        // value={selectedTags}
        maxTagCount={3}
        maxTagTextLength={15}
      />
    </>
  );
};

export default SelectDropDwon;
