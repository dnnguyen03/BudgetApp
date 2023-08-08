import StatisticsCard from "./Card/StatisticsCard"
import { statisticsCardsData } from "../data/statisticsCardsData"
import ChartCol from "./Chart/Chart"
import IncomeExpenses from "./IncomeExpenses/IncomeExpenses"
import Header from "./Header"
import { useSelector } from "react-redux"
import {
  balanceSelector,
  expenseSelector,
  incomeSelector,
} from "../redux/selector"

export default function Main() {
  const income = useSelector(incomeSelector)
  const expense = useSelector(expenseSelector)
  const balance = useSelector(balanceSelector)

  const updatedStatisticsCardsData = statisticsCardsData.map((card) => {
    if (card.title === "Balance") {
      return {
        ...card,
        value: balance,
      }
    }
    if (card.title === "Income") {
      return {
        ...card,
        value: income,
      }
    }
    if (card.title === "Expenses") {
      return {
        ...card,
        value: expense,
      }
    }
    return card
  })
  return (
    <>
      <Header />
      <main className="mt-8">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-9">
          {updatedStatisticsCardsData.map(({ ...rest }, index) => (
            <StatisticsCard key={index} {...rest} />
          ))}
        </div>
        <div className="mt-8 grid lg:grid-cols-2 gap-x-4 gap-y-9">
          <ChartCol />
          <IncomeExpenses />
        </div>
      </main>
    </>
  )
}
