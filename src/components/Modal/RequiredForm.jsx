import { Modal } from "antd"
import { MdOutlineError } from "react-icons/md"

export default function RequiredForm({ isModalRequired, setIsModalRequired }) {
  const handleOk = () => {
    setIsModalRequired(false)
  }

  return (
    <Modal
      open={isModalRequired}
      onOk={handleOk}
      closeIcon={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { backgroundColor: "#068FFF" } }}
    >
      <h1 className="text-[#ff4d4f] font-bold text-2xl flex items-center gap-2">
        <MdOutlineError /> Error !
      </h1>
      <h3 className="text-lg text-center font-semibold">
        Please enter all the fields !
      </h3>
    </Modal>
  )
}
