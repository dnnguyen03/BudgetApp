import Login from "./components/Login/login"
import Main from "./components/Main"
import AddFormModal from "./components/Modal/AddFormModal"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthProvider from "./context/AuthProvider"

function App() {
  return (
    <div className="App px-2 sm:px-10 xl:px-12 lg:px-12 2xl:px-44 min-h-screen py-5 bg-slate-50">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Login />} />
          </Routes>
          <AddFormModal />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
