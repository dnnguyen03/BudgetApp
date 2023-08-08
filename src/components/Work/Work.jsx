import { collection, doc, updateDoc } from "firebase/firestore"
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../../firebase/config"
import { listWorkSelector } from "../../redux/selector"
import { listWorkReducer } from "../../redux/reducer/ListWork"
import { useState } from "react"
import EditFormModal from "../Modal/EditFormModal"
const icon = {
  className: "text-2xl text-white",
}
export default function ListWork({ item, data }) {
  const dispatch = useDispatch()
  const listWork = useSelector(listWorkSelector)
  const [openModal, setOpenModal] = useState(false)

  const handleDeleteWork = () => {
    const usersRef = doc(collection(db, "users"), data.id)
    updateDoc(usersRef, {
      listWork: [
        ...listWork.map((work) => work).filter((id) => id.id !== item.id),
      ],
    })
    dispatch(listWorkReducer.actions.deleteWork(item.id))
  }
  const handleEditWork = () => {
    setOpenModal(true)
  }
  return (
    <>
      <li
        key={item.id}
        className="border-x border-y border-gray-400 rounded-lg px-3 flex items-center justify-between py-1"
      >
        <div className="flex items-center">
          <div
            style={{
              backgroundColor: item.tag === "Income" ? "#54B435" : "#CF0A0A",
            }}
            className="p-1 rounded-full"
          >
            {item.tag === "Income" ? (
              <GiReceiveMoney {...icon} />
            ) : (
              <GiPayMoney {...icon} />
            )}
          </div>
          <p className="ml-2 tracking-normal text-lg">{item.name}</p>
        </div>
        <div className="flex items-center">
          <p
            style={{
              backgroundColor: item.tag === "Income" ? "#54B435" : "#CF0A0A",
            }}
            className="mr-2 text-white px-2 rounded-full"
          >
            {`${item.cost} $`}
          </p>
          <div className="flex gap-2">
            <div
              className="rounded-full cursor-pointer bg-slate-700 p-0.5 flex items-center justify-center"
              onClick={handleEditWork}
            >
              <MdOutlineModeEditOutline className="text-white text-base" />
            </div>
            <div
              className="rounded-full cursor-pointer bg-slate-700"
              onClick={handleDeleteWork}
            >
              <IoClose className="text-white text-xl" />
            </div>
          </div>
        </div>
      </li>
      <EditFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        item={item}
        data={data}
      />
    </>
  )
}
