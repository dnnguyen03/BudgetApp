import { useState, useEffect } from "react"
import { DatePicker } from "antd"
import dayjs from "dayjs"

const { RangePicker } = DatePicker

function RangerPickerMonth({ dates, setDates }) {
  const [defaultStartDate, setDefaultStartDate] = useState(
    dayjs().subtract(6, "month").startOf("month")
  )

  useEffect(() => {
    const startDate = dayjs().subtract(6, "month").startOf("month")
    const endDate = dayjs()
    setDefaultStartDate(startDate)
    setDates([startDate, endDate])
  }, [])

  const disabledDate = (current) => {
    if (!dates || !Array.isArray(dates) || dates.length < 2) {
      return false
    }

    const startDate = dayjs(dates[0])
    const endDate = dayjs(dates[1])

    const diffFromStart = current.diff(startDate, "month")
    const diffFromEnd = endDate.diff(current, "month")
    const diffInMonths = endDate.diff(startDate, "month")

    return (
      diffFromStart < 0 ||
      diffFromEnd < 0 ||
      diffFromStart > 5 ||
      diffFromEnd > 5 ||
      diffInMonths > 5
    )
  }

  const onCalendarChange = (value) => {
    if (value === null || value.length !== 2) {
      setDates(null)
    } else {
      setDates(value)
    }
  }

  return (
    <div className="w-[230px] sm:w-auto">
      <RangePicker
        picker="month"
        disabledDate={disabledDate}
        onCalendarChange={onCalendarChange}
        format="MM-YYYY"
        mode={["month", "month"]}
        showTime={false}
        defaultValue={[defaultStartDate, dayjs()]}
        value={dates}
      />
    </div>
  )
}

export default RangerPickerMonth
