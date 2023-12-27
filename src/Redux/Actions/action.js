import { createAsyncThunk } from "@reduxjs/toolkit";
import baseurl from "../../helper/baseurl.js";

const AllProjectDetailURL =
  //"https://embarrassed-drawers-boa.cyclic.app/api/project-data/Allproject-details";
  `${baseurl.url}/project-data/Allproject-details`;
// const searchURL =
//   "https://ruby-scary-hummingbird.cyclic.app/api/project-search/Allproject-search";

export const fetchProjectDetails = createAsyncThunk(
  "dashboard/fetchProjectDetails",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(String(AllProjectDetailURL), {
        method: "GET",
      });

      const data = await response.json();
     

      let projectData = [];
    

     

      return {
        projectData: projectData,
        allAsignee: data.allAsignee,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchProjectDetailsAll = createAsyncThunk(
  "dashboard/fetchProjectDetailsAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseurl.url}/project-data/Allproject-detailsAll`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      // Check if data is defined and has the expected structure
      if (!data || !data.projectDetails || !Array.isArray(data.projectDetails)) {
        throw new Error("Invalid data structure");
      }

      let projectAssignees = {};
      let projectsArray = [];
      let projectData= [];

      // Function to process each issue
      const processIssue = (issue) => {

        if (
          issue.fields &&
          issue.fields.project &&
          issue.fields.project.name
        ) {
          const projectName = issue.fields.project.name;
          const id = issue.fields.project.id;
          const issuetype = issue.fields.issuetype
            ? issue.fields.issuetype.name
            : "null";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              id: id,
              issuetype: [],
            };
          }

          projectAssignees[projectName].issuetype.push({
            issues: issue,
          });
        }
      };

      // Loop through all projects and process their issues
      data.projectDetails.forEach((project) => {
        // Check if project and issues are defined and have the expected structure
        if (project && project.issues && Array.isArray(project.issues)) {
          project.issues.forEach(processIssue);
        }
      });

      projectsArray = Object.values(projectAssignees);





      // old structure
      data.projectDetails.forEach((project) => {
        if (project.errorMessages) {
          console.error("Error in project data:", project.errorMessages);
          return;
        } else {
          const projectAssignees = {};
          project.issues.forEach((issue) => {
            const assignee = issue.fields.assignee
              ? issue.fields.assignee.displayName
              : "Unassigned";
            const assigneeId =Math.floor(Math.random() * 100)
      
            if (!projectAssignees[assignee]) {
              projectAssignees[assignee] = {
                name: project.issues[0]?.fields?.project?.name,
                id: project.issues[0]?.fields?.project?.id,
                assigneeId,
                assignee,
                issues: [],
              };
            }
      
            projectAssignees[assignee].issues.push(issue);
          });
      
          const assigneeProjects = Object.values(projectAssignees);
          projectData.push(...assigneeProjects);
      
        }
      });
      
      
      

      return {projectData:projectData,projectsArray:projectsArray};
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const fetchAssgineeAll = createAsyncThunk(
  "dashboard/fetchAssgineeAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseurl.url}/project-data/all-assginee`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
    

        console.log("All Assignees", data);
      return {
      
        allAsignee: data.allAsignee,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchProjectNameAll = createAsyncThunk(
  "dashboard/fetchProjectNameAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseurl.url}/projectNames/projectNames`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
    

    console.log(data,"data of projet names")
      return {
      
        allProjectNames: data.projectNames,
        allKeys: data.projectKeys,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const SerachData = createAsyncThunk(
  "dashboard/SerachData",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseurl.url}/project-search/Allproject-search?query=${encodeURIComponent(
          query
        )}`,
      
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const searchData = await response.json();
      let projectAssignees = {};
      let projectsArray = [];

      searchData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
     

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              issuetype: [],
            };
          }

       

          projectAssignees[projectName].issuetype.push({
          
            issues: issue,
          });
        }
        // }
      });

      projectsArray = Object.values(projectAssignees);
      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const SerachDataAssigne = createAsyncThunk(
  "dashboard/SerachDataAssigne",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
     
        `${baseurl.url}/project-assigne/searchByAssignee-search?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const searchData = await response.json();

      let projectAssignees = {};
      let projectsArray = [];

      searchData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
          const assignee = issue.fields.assignee
            ? issue.fields.assignee.displayName
            : "Unassigned";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              name: projectName,
              assignees: [],
            };
          }

          const assigneeObject = projectAssignees[projectName].assignees.find(
            (assigneeObj) => assigneeObj.assignee === assignee
          );

          if (assigneeObject) {
            assigneeObject.issues.push(issue);
          } else {
            projectAssignees[projectName].assignees.push({
              assignee: assignee,
              issues: [issue],
            });
          }
        }
      });

      projectsArray = Object.values(projectAssignees);
      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const SerachByProjectName = createAsyncThunk(
  "dashboard/SerachByProjectName",
  async (query, thunkAPI) => {
    console.log("My Query", query);
    try {
      const response = await fetch(
        // ACEEPT ONLY SINGLE QUERY BY PROJECT NAME, NOT ACCEPT ARRAY IN OBJECT
        `${baseurl.url}/project-ProjectName/searchby-project?query=${query}`,
     
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const searchData = await response.json();
      let projectAssignees = {};
      let projectsArray = [];

      searchData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
          const issuetype = issue.fields.issuetype
            ? issue.fields.issuetype.name
            : "null";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              issuetype: [],
            };
          }

          // const assigneeObject = projectAssignees[projectName].issuetype.find(
          //   (assigneeObj) => assigneeObj.assignee === issuetype
          // );

          // if (assigneeObject) {
          //   assigneeObject.issues.push(issue);
          // }
          // else {

          projectAssignees[projectName].issuetype.push({
            //issuetype: issuetype,
            issues: issue,
          });
        }
        // }
      });

      projectsArray = Object.values(projectAssignees);

      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//search by Asssignee Name API



export const SerachByAssigneeName = createAsyncThunk(
  "dashboard/SerachByAssigneeName",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseurl.url}/project-assigneeName/searchby-assigneeName?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const searchData = await response.json();
      let projectAssignees = {};
      let projectsArray = [];

      searchData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
          const issuetype = issue.fields.issuetype
            ? issue.fields.issuetype.name
            : "null";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              issuetype: [],
            };
          }

         
          projectAssignees[projectName].issuetype.push({
            issues: issue,
          });
        }
        // }
      });

      projectsArray = Object.values(projectAssignees);

      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Search by Project Key
export const SerachByProjectKey = createAsyncThunk(
  "dashboard/SerachByProjectKey",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        `${baseurl.url}/project-key/searchby-key?query=${query}`,
        // `https://embarrassed-drawers-boa.cyclic.app/Allproject-search?query=${encodeURIComponent(
        //   query
        // )}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const searchData = await response.json();
      let projectAssignees = {};
      let projectsArray = [];

      searchData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
          const issuetype = issue.fields.issuetype
            ? issue.fields.issuetype.name
            : "null";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              issuetype: [],
            };
          }

          // const assigneeObject = projectAssignees[projectName].issuetype.find(
          //   (assigneeObj) => assigneeObj.assignee === issuetype
          // );

          // if (assigneeObject) {
          //   assigneeObject.issues.push(issue);
          // }
          // else {

          projectAssignees[projectName].issuetype.push({
            //issuetype: issuetype,
            issues: issue,
          });
        }
        // }
      });

      projectsArray = Object.values(projectAssignees);

      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const groupByFilterAction = createAsyncThunk(
  "dashboard/groupByFilterAction",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        // `https://embarrassed-drawers-boa.cyclic.app/api/project-groupByfilter/groupBy-filter?query=${encodeURIComponent(
        //   query
        // )}`,
        `${baseurl.url}/project-groupByfilter/groupBy-filter-status?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const filtersData = await response.json();

      let projectAssignees = {};
      let projectsArray = [];
      filtersData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
          const issuetype = issue.fields.issuetype
            ? issue.fields.issuetype.name
            : "null";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              issuetype: [],
            };
          }

          // const assigneeObject = projectAssignees[projectName].issuetype.find(
          //   (assigneeObj) => assigneeObj.assignee === issuetype
          // );

          // if (assigneeObject) {
          //   assigneeObject.issues.push(issue);
          // }
          // else {

          projectAssignees[projectName].issuetype.push({
            //issuetype: issuetype,
            issues: issue,
          });
        }
        // }
      });

      projectsArray = Object.values(projectAssignees);

      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// status filterllllllllllllllllllllllllllllll
export const groupByFilterActionStatus = createAsyncThunk(
  "dashboard/groupByFilterActionStatus",
  async (query, thunkAPI) => {
    try {
      const response = await fetch(
        // `https://embarrassed-drawers-boa.cyclic.app/api/project-groupByfilter/groupBy-filter?query=${encodeURIComponent(
        //   query
        // )}`,
        `${baseurl.url}/project-groupByfilter/groupBy-filter-status?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const filtersData = await response.json();

      let projectAssignees = {};
      let projectsArray = [];

      filtersData.issues.forEach((issue) => {
        if (issue.fields && issue.fields.project && issue.fields.project.name) {
          const projectName = issue.fields.project.name;
          const issuetype = issue.fields.issuetype
            ? issue.fields.issuetype.name
            : "null";

          if (!projectAssignees[projectName]) {
            projectAssignees[projectName] = {
              projectname: projectName,
              issuetype: [],
            };
          }

          // const assigneeObject = projectAssignees[projectName].issuetype.find(
          //   (assigneeObj) => assigneeObj.assignee === issuetype
          // );

          // if (assigneeObject) {
          //   assigneeObject.issues.push(issue);
          // }
          // else {

          projectAssignees[projectName].issuetype.push({
            //issuetype: issuetype,
            issues: issue,
          });
        }
        // }
      });

      projectsArray = Object.values(projectAssignees);

    
      return projectsArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
