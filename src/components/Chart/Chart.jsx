import { useSelector } from "react-redux"
import { listWorkSelector } from "../../redux/selector"
import dayjs from "dayjs"
import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react"
import RangerPickerMonth from "../RangerPicker/RangerPickerMonth"

function ChartCol() {
  const [transformedData, setTransformedData] = useState([])
  const listWork = useSelector(listWorkSelector)
  const [dates, setDates] = useState(null)

  //Tính thu nhập theo tháng
  useEffect(() => {
    if (dates && dates.length === 2) {
      const startDate = dayjs(dates[0]).startOf("month")
      const endDate = dayjs(dates[1]).endOf("month")

      const data = Object.values(
        listWork.reduce((acc, item) => {
          const month = dayjs(item.dateTime, "DD-MM-YYYY").startOf("month")
          const amount = item.cost

          if (month >= startDate && month <= endDate) {
            if (!acc[month]) {
              acc[month] = {
                month: month.format("YYYY-MM"),
                income: 0,
                expense: 0,
                balance: 0,
              }
            }

            acc[month].income += item.tag === "Income" ? item.cost : 0
            acc[month].expense += item.tag === "Expense" ? item.cost : 0
            acc[month].balance += amount
          }

          return acc
        }, {})
      )

      const newData = []
      let currentMonth = startDate

      while (currentMonth <= endDate) {
        const monthKey = currentMonth.format("YYYY-MM")

        if (!data.find((item) => item.month === monthKey)) {
          newData.push({ month: monthKey, income: 0, expense: 0, balance: 0 })
        } else {
          newData.push(data.find((item) => item.month === monthKey))
        }

        currentMonth = currentMonth.add(1, "month")
      }

      setTransformedData(newData)
    }
  }, [listWork, dates])

  const options = {
    // Các tùy chọn của biểu đồ ApexCharts
    series: [
      {
        name: "Balance",
        data: transformedData.map((item) => item.income - item.expense),
      },
      {
        name: "Income",
        data: transformedData.map((item) => item.income),
      },
      {
        name: "Expense",
        data: transformedData.map((item) => item.expense),
      },
    ],
    colors: ["#068FFF", "#54B435", "#CF0A0A"],
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true, // Cho phép hiệu ứng hoạt hình
        easing: "easeinout", // Kiểu hiệu ứng hoạt hình
        speed: 800, // Tốc độ hoạt hình (milliseconds)
        animateGradually: {
          enabled: true,
          delay: 150, // Độ trễ giữa các cột
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      categories: transformedData.map((item) =>
        dayjs(item.month).format("MMM YYYY")
      ),
    },
    grid: {
      show: true,
      borderColor: "#ffffff40",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd",
      },
    },
  }

  return (
    <div
      style={{ boxShadow: "0px 1px 5px 2px rgba(118, 118, 118, 0.3)" }}
      className="bg-white rounded-lg py-3 px-3 sm:px-5 flex flex-col"
    >
      <div className="flex items-center justify-between mt-3">
        <h6 className="font-bold text-lg">Chart</h6>
        <RangerPickerMonth dates={dates} setDates={setDates} />
      </div>
      <ReactApexChart
        height={450}
        options={options}
        series={options.series}
        type="bar"
      />
    </div>
  )
}

export default ChartCol
