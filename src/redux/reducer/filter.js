import { createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"
const initialState = {
  search: "",
  tag: "All",
  dateTime: `${dayjs().format("DD-MM-YYYY")}`,
}
export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchFilter: (state, action) => {
      state.search = action.payload
    },
    tagFilter: (state, action) => {
      state.tag = action.payload
    },
    dateTimeFilter: (state, action) => {
      state.dateTime = action.payload
    },
    reset: () => initialState,
  },
})
