import { createContext, useEffect, useState } from "react"

import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { Spin } from "antd"

export const AuthConText = createContext()

export default function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubcribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user
        setUser({ email, uid })
        navigate("/BudgetApp/")
        setLoading(false)

        return
      }
      setUser({})
      setLoading(false)
      navigate("/login")
    })
    //clear function
    return () => {
      unsubcribed()
    }
  }, [navigate])
  return (
    <AuthConText.Provider value={{ user }}>
      {loading ? <Spin /> : children}
    </AuthConText.Provider>
  )
}
