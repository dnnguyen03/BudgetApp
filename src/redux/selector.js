import { createSelector } from "@reduxjs/toolkit"

export const listWorkSelector = (state) => state.listWork

export const filterDateTimeSelector = (state) => state.filter.dateTime
export const filterSearchSelector = (state) => state.filter.search
export const filterTagSelector = (state) => state.filter.tag

export const incomeSelector = createSelector(listWorkSelector, (listWork) => {
  return listWork.reduce((total, value) => {
    if (value.tag === "Income") {
      return total + value.cost
    }
    return total
  }, 0)
})
export const expenseSelector = createSelector(listWorkSelector, (listWork) => {
  return listWork.reduce((total, value) => {
    if (value.tag === "Expense") {
      return total + value.cost
    }
    return total
  }, 0)
})
export const balanceSelector = createSelector(
  incomeSelector,
  expenseSelector,
  (income, expense) => {
    return income - expense
  }
)

export const listWorkFilerSelector = createSelector(
  listWorkSelector,
  filterSearchSelector,
  filterDateTimeSelector,
  filterTagSelector,
  (listWork, searchText, dateTime, tag) => {
    return listWork.filter((work) => {
      if (tag === "All") {
        return (
          work.name.toLowerCase().includes(searchText) &&
          dateTime === work.dateTime
        )
      }
      return (
        work.tag === tag &&
        work.name.toLowerCase().includes(searchText) &&
        dateTime === work.dateTime
      )
    })
  }
)
