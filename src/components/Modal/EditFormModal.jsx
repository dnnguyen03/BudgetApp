import { Input, Modal, Select } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listWorkReducer } from "../../redux/reducer/ListWork"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { listWorkSelector } from "../../redux/selector"

export default function EditFormModal({ openModal, setOpenModal, item, data }) {
  const [nameWork, setNameWork] = useState(item.name)
  const [costWork, setCostWork] = useState(item.cost)
  const [selectTag, setSelectTag] = useState(item.tag)
  const listWork = useSelector(listWorkSelector)
  const dispatch = useDispatch()

  const handleOk = () => {
    dispatch(
      listWorkReducer.actions.editWork({
        id: item.id,
        name: nameWork,
        cost: costWork,
        tag: selectTag,
      })
    )
    const usersRef = doc(collection(db, "users"), data.id)
    updateDoc(usersRef, {
      listWork: [
        ...listWork.map((work) => {
          if (work.id === item.id)
            return {
              id: item.id,
              name: nameWork,
              cost: costWork,
              tag: selectTag,
              dateTime: work.dateTime,
            }
          return work
        }),
      ],
    })
    setOpenModal(false)
  }
  const handleCancel = () => {
    setOpenModal(false)
  }
  return (
    <Modal
      title="Edit work"
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
  )
}
