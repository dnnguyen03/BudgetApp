import { useEffect, useState } from "react"
import { DatePicker, Select, Space } from "antd"
import dayjs from "dayjs"
import AddFormModal from "../Modal/AddFormModal"
import Work from "../Work/Work"
import { useDispatch, useSelector } from "react-redux"
import useFirestore from "../../firebase/useFirestore"
import { listWorkReducer } from "../../redux/reducer/ListWork"
import { listWorkFilerSelector } from "../../redux/selector"
import { filterReducer } from "../../redux/reducer/filter"

export default function IncomeExpenses() {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const getInitData = useFirestore("users")
  const data = getInitData[0]
  const [hasDispatched, setHasDispatched] = useState(false)
  const listWork = useSelector(listWorkFilerSelector)

  useEffect(() => {
    if (data && !hasDispatched) {
      dispatch(listWorkReducer.actions.addWork(data.listWork))
      setHasDispatched(true)
    }
  }, [data, dispatch, hasDispatched])

  const handleSearchFilter = (e) => {
    dispatch(filterReducer.actions.searchFilter(e.target.value))
  }
  const onChangeDate = (date, dateString) => {
    dispatch(filterReducer.actions.dateTimeFilter(dateString))
  }
  const onChangeTag = (e) => {
    dispatch(filterReducer.actions.tagFilter(e))
  }
  return (
    <>
      <div
        style={{
          boxShadow: "0px 1px 5px 2px rgba(118, 118, 118, 0.3)",
        }}
        className="bg-white rounded-lg py-3 px-3 sm:px-5 h-[550px]"
      >
        <div className="flex items-center justify-between mb-3">
          <h6 className="font-bold text-lg">Income and Expenses</h6>
          <div className="flex items-center gap-3 flex-wrap">
            <Space>
              <Select
                style={{ width: "100px" }}
                defaultValue="All"
                onChange={onChangeTag}
                options={[
                  { value: "All", label: "All" },
                  { value: "Expense", label: "Expense" },
                  { value: "Income", label: "Income" },
                ]}
              />
            </Space>
            <Space className="order-3 sm:order-none" direction="vertical">
              <DatePicker
                defaultValue={dayjs()}
                format={"DD-MM-YYYY"}
                onChange={onChangeDate}
              />
            </Space>
            <button
              className="my-2 px-3 py-2 rounded-md bg-[#068FFF] text-white"
              onClick={() => setOpenModal(true)}
            >
              Add
            </button>
          </div>
        </div>
        <input
          className="w-full focus-visible:outline-none border-x border-y border-gray-400 rounded-lg px-2 py-1 focus:border-[#068FFF]"
          type="text"
          placeholder="Search"
          onChange={handleSearchFilter}
        />
        <div className="mt-6 ">
          <ul className="flex flex-col gap-2 relative h-[370px] overflow-y-auto">
            {listWork?.map((item) => (
              <Work key={item.id} item={item} data={data} />
            ))}
          </ul>
        </div>
      </div>
      <AddFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={data}
      ></AddFormModal>
    </>
  )
}
