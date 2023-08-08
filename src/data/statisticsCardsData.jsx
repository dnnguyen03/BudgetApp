import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi"

const icon = {
  className: "text-2xl text-white",
}

export const statisticsCardsData = [
  {
    color: "#068FFF",
    icon: <MdOutlineAccountBalanceWallet {...icon} />,
    title: "Balance",
    value: 0,
  },
  {
    color: "#54B435",
    icon: <GiReceiveMoney {...icon} />,
    title: "Income",
    value: 0,
  },
  {
    color: "#CF0A0A",
    icon: <GiPayMoney {...icon} />,
    title: "Expenses",
    value: 0,
  },
]
