import { useState } from "react"
import { useEffect } from "react"
import tinycolor from "tinycolor2"

export default function StatisticsCard({ color, icon, title, value }) {
  const colorBtn = tinycolor(color).lighten(20).toString()

  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 900 // Thời gian trong ms (0.3 giây)
    const start = performance.now()

    const animateCount = (timestamp) => {
      const progress = timestamp - start
      const increment = Math.ceil((value / duration) * progress)

      if (progress >= duration) {
        setCount(value)
        return
      }

      setCount(increment)

      requestAnimationFrame(animateCount)
    }

    requestAnimationFrame(animateCount)

    return () => {
      cancelAnimationFrame(animateCount)
    }
  }, [value])

  return (
    <div
      style={{ boxShadow: "0px 1px 5px 2px rgba(118, 118, 118, 0.3)" }}
      className="bg-white rounded-lg p-2 sm:p-4 relative"
    >
      <button
        style={{
          background: `linear-gradient(to top, ${color}, ${colorBtn})`,
          boxShadow: `0px 2.5px 3px 0.5px ${colorBtn}`,
        }}
        className={`abc absolute p-3 sm:p-5 rounded-xl -top-5 shadow-md `}
      >
        {icon}
      </button>
      <div className="text-right">
        <p className="text-gray-600 text-sm capitalize">{title}</p>
        <div className="text-slate-800 font-black text-xl sm:text-2xl">{`${count} $`}</div>
      </div>
    </div>
  )
}
