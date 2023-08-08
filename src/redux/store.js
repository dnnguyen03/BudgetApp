import { configureStore } from "@reduxjs/toolkit"
import { listWorkReducer } from "./reducer/ListWork"
import { filterReducer } from "./reducer/filter"

const store = configureStore({
  reducer: {
    listWork: listWorkReducer.reducer,
    filter: filterReducer.reducer,
  },
})

export default store
