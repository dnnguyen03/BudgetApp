import { Form, Input, Modal, Select } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listWorkReducer } from "../../redux/reducer/ListWork"
import { v4 as uuidv4 } from "uuid"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { filterDateTimeSelector, listWorkSelector } from "../../redux/selector"
import RequiredForm from "./RequiredForm"

export default function AddFormModal({ openModal, setOpenModal, data }) {
  const [nameWork, setNameWork] = useState("")
  const [costWork, setCostWork] = useState()
  const [selectTag, setSelectTag] = useState("Income")
  const dispatch = useDispatch()
  const listWork = useSelector(listWorkSelector)
  const dateTime = useSelector(filterDateTimeSelector)
  const [isModalRequired, setIsModalRequired] = useState(false)
  const handleOk = () => {
    if (!nameWork || !costWork) {
      setIsModalRequired(true)
    } else {
      const newWork = {
        id: uuidv4(),
        tag: selectTag,
        name: nameWork,
        cost: costWork,
        dateTime: dateTime,
      }
      const usersRef = doc(collection(db, "users"), data.id)
      updateDoc(usersRef, {
        listWork: [...listWork, newWork],
      })
      dispatch(listWorkReducer.actions.addWork(newWork))
      setNameWork("")
      setCostWork("")
      setSelectTag("Income")
      setOpenModal(false)
    }
  }
  const handleCancel = () => {
    setNameWork("")
    setCostWork("")
    setSelectTag("Income")
    setOpenModal(false)
  }
  return (
    <>
      <Modal
        title="Income and Expenses"
        open={openModal}
        okButtonProps={{ style: { backgroundColor: "#068FFF" } }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-3 my-4">
          <div className="w-full">
            <Select
              value={selectTag}
              onChange={(e) => setSelectTag(e)}
              style={{ width: "100%" }}
              defaultValue="Income"
              options={[
                { value: "Income", label: "Income" },
                { value: "Expense", label: "Expense" },
              ]}
            />
          </div>
          <Input
            value={nameWork}
            placeholder="Name"
            onChange={(e) => setNameWork(e.target.value)}
          />
          <Input
            value={costWork}
            placeholder="Cost"
            type="number"
            onChange={(e) => setCostWork(e.target.valueAsNumber)}
          />
        </div>
      </Modal>
      <RequiredForm
        setIsModalRequired={setIsModalRequired}
        isModalRequired={isModalRequired}
      />
    </>
  )
}
