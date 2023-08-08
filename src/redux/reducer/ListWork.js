import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const listWorkReducer = createSlice({
  name: "listWork",
  initialState,
  reducers: {
    addWork: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.push(...action.payload)
      } else {
        state.push(action.payload)
      }
    },
    deleteWork: (state, action) => {
      return state.filter((work) => work.id !== action.payload)
    },
    reset: () => initialState,
    editWork: (state, action) => {
      const { id, cost, name, tag } = action.payload
      const workIndex = state.findIndex((work) => work.id === id)
      state[workIndex] = { ...state[workIndex], cost, name, tag }
    },
  },
})
