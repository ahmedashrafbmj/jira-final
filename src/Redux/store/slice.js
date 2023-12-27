// slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProjectDetails,
  SerachData,
  SerachDataAssigne,
  groupByFilterAction,
  SerachByProjectName,
  fetchProjectDetailsAll,
  SerachByProjectKey,
  SerachByAssigneeName,
  groupByFilterActionStatus,
  fetchAssgineeAll,
  fetchProjectNameAll,
} from "../Actions/action.js";

const SearchSlice = createSlice({
  name: "dashboard",
  initialState: {
    value: {},
    projects: [],
    projectsAll: [],
    assigneeAll: [],
    allprojectsName: [],
    searchResult: [],
    ApiSearch: [],
    AssigneSearch: [], // New state property for the assignee search
    filtersData: [],
    projectSearchData: [],
    serachedDataByProjectName: [],
    visibleGroupFilter: false,
    searchState: false,
    dataloader: false,
    dataloader1: false,
    serachLoader: false,
    serachState: false,
    assgineeValue: [],
    assgineeValueFilter: [],
    projectValueFilter: [],
    highlightProjectName: false,
    filterValue: "",
    searchdropdown: "",
    assigneeLoader: false, // Added assigneeLoader state
    error: null, // Added error state to handle errors
    arrayValue: 1
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
      state.serachState = true;
    },
    setMultipleAssignee: (state, action) => {
      state.assgineeValue = action.payload;
      console.log(state.assgineeValue, "state.assgineeValue ")
      state.serachState = false;
    },
    setMultipleAssigneeFilter: (state, action) => {
      state.assgineeValueFilter = action.payload;
      console.log(state.assgineeValue, "state.assgineeValue ")
      state.serachState = false;

    },
    // SerachByProjectName: (state, action) => {
    //   state.serachLoader = true;
    //   state.projectSearchData = action?.payload;
    //   console.log(state.assgineeValue ,"state.projectSearchData state.projectSearchDatastate.projectSearchData ")
    //     // state.serachLoader = false;
    //     state.highlightProjectName = true;
    // },
    setSearchByProjectName: (state, action) => {
      console.log(state, "iashoiubascosai");
      // state.serachLoader = true;
      state.projectSearchData = action?.payload;
      console.log(action?.payload, "state.projectSearchData state.projectSearchDatastate.projectSearchData ")
      // state.serachLoader = false;
      // state.highlightProjectName = true;
    },
    setMultipleProjectsFilter: (state, action) => {
      state.projectValueFilter = action.payload;
      console.log(state.assgineeValue, "state.assgineeValue ")
      state.serachState = false;
    },
    clearSearchValue: (state) => {
      state.value = "";
      state.serachState = false;
    },
    setArrayLength: (state, action) => {
      state.arrayValue = action.payload;
    },
    getStatusFilter: (state, action) => {
      state.filterValue = action.payload;
    },
    getStatusPin: (state, action) => {
      state.PinValue = action.payload;
    },
    getSearchDropDownValue: (state, action) => {
      state.searchdropdown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetails.pending, (state) => {
        state.dataloader = true;
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        state.dataloader = false;
        state.projects = action?.payload;
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.dataloader = false;
        state.error = action?.payload;
      })
      .addCase(fetchProjectDetailsAll.pending, (state) => {
        state.dataloader1 = true;
      })
      .addCase(fetchProjectDetailsAll.fulfilled, (state, action) => {
        state.dataloader1 = false;
        state.projectsAll = action?.payload;
      })
      .addCase(fetchProjectDetailsAll.rejected, (state, action) => {
        state.dataloader1 = false;
        state.error = action?.payload;
      })
      .addCase(fetchAssgineeAll.pending, (state) => {
        state.dataloader = true;
      })
      .addCase(fetchAssgineeAll.fulfilled, (state, action) => {
        state.dataloader = false;
        state.assigneeAll = action?.payload;
      })
      .addCase(fetchAssgineeAll.rejected, (state, action) => {
        state.dataloader = false;
        state.error = action?.payload;
      })
      .addCase(fetchProjectNameAll.pending, (state) => {
        state.dataloader = true;
      })
      .addCase(fetchProjectNameAll.fulfilled, (state, action) => {
        state.dataloader = false;
        state.allprojectsName = action?.payload;
      })
      .addCase(fetchProjectNameAll.rejected, (state, action) => {
        state.dataloader = false;
        state.error = action?.payload;
      })
      // Description search API
      .addCase(SerachData.pending, (state) => {
        state.serachLoader = true;
        state.highlightProjectName = false;
      })
      .addCase(SerachData.fulfilled, (state, action) => {
        state.ApiSearch = action?.payload;
        state.projectSearchData = action?.payload;
        state.serachLoader = false;
        state.highlightProjectName = false;
      })
      .addCase(SerachData.rejected, (state, action) => {
        state.error = action?.payload;
        state.serachLoader = false;
        state.highlightProjectName = false;
        state.projectSearchData = [];
      })
      //search by assignee name

      .addCase(SerachByAssigneeName.pending, (state) => {
        state.serachLoader = true;
        state.highlightProjectName = false;
      })
      .addCase(SerachByAssigneeName.fulfilled, (state, action) => {
        state.projectSearchData = action?.payload;
        state.serachLoader = false;
        state.highlightProjectName = false;
      })
      .addCase(SerachByAssigneeName.rejected, (state, action) => {
        state.error = action?.payload;
        state.serachLoader = false;
        state.highlightProjectName = false;
      })

      // assignee search API
      .addCase(SerachDataAssigne.pending, (state) => {
        state.vissibleAssignee = false;
        state.serachLoader = true;
        state.assigneeLoader = true;
      })
      .addCase(SerachDataAssigne.fulfilled, (state, action) => {
        state.vissibleAssignee = true;

        state.AssigneSearch = action?.payload;
        state.projectSearchData = action?.payload;

        state.serachLoader = false;
        state.assigneeLoader = false;
      })
      .addCase(SerachDataAssigne.rejected, (state, action) => {
        state.vissibleAssignee = false;
        state.error = action?.payload;
        state.serachLoader = false;
        state.assigneeLoader = false;
      })
      //group by filters API
      .addCase(groupByFilterAction.pending, (state) => {
        state.filterLoader = true;
        state.visibleGroupFilter = false;
      })
      .addCase(groupByFilterAction.fulfilled, (state, action) => {
        state.filtersData = action?.payload;
        state.visibleGroupFilter = true;
        state.filterLoader = false;
        //state.assigneeLoader = false;
      })
      .addCase(groupByFilterAction.rejected, (state, action) => {
        state.filterLoader = false;
        state.visibleGroupFilter = false;
        state.error = action?.payload;
        //state.assigneeLoader = false;
      })
      //group by filters API Status
      .addCase(groupByFilterActionStatus.pending, (state) => {
        state.filterLoader = true;
        state.visibleGroupFilter = false;
      })
      .addCase(groupByFilterActionStatus.fulfilled, (state, action) => {
        state.filtersData = action?.payload;
        state.visibleGroupFilter = true;
        state.filterLoader = false;
        //state.assigneeLoader = false;
      })
      .addCase(groupByFilterActionStatus.rejected, (state, action) => {
        state.filterLoader = false;
        state.visibleGroupFilter = false;
        state.error = action?.payload;
        //state.assigneeLoader = false;
      })
      //search by project API
      .addCase(SerachByProjectName.pending, (state) => {
        console.log("Actions Fulfiled!!! 1", state);

        state.serachLoader = true;
        state.highlightProjectName = false;
      })
      .addCase(SerachByProjectName.fulfilled, (state, action) => {
        console.log("Actions Fulfiled!!! 2", action?.payload);
        state.projectSearchData = action?.payload;
        state.serachLoader = false;
        state.highlightProjectName = true;
      })
      .addCase(SerachByProjectName.rejected, (state, action) => {
        console.log("Actions Fulfiled!!! 3", action?.payload);

        state.serachLoader = false;
        state.highlightProjectName = false;
        state.error = action?.payload;
        state.projectSearchData = [];
      })
      //serach by Project Key API
      .addCase(SerachByProjectKey.pending, (state) => {
        state.serachLoader = true;
        state.highlightProjectName = false;
      })
      .addCase(SerachByProjectKey.fulfilled, (state, action) => {
        state.projectSearchData = action?.payload;
        state.serachLoader = false;
        state.highlightProjectName = false;
      })
      .addCase(SerachByProjectKey.rejected, (state, action) => {
        console.log(action, "actionactionaction")
        state.error = action?.error;
        state.serachLoader = false;
        state.projectSearchData = [];
        state.highlightProjectName = false;
      });
  },
});

export const {
  setValue,
  clearSearchValue,
  setArrayLength,
  getStatusFilter,
  getSearchDropDownValue,
  getStatusPin,
  setMultipleAssignee,
  setMultipleAssigneeFilter,
  setMultipleProjectsFilter,
  setSearchByProjectName
} = SearchSlice.actions;
export default SearchSlice.reducer;
