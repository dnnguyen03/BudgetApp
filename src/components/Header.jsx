import { useDispatch } from "react-redux"
import logo from "../assets/img/logo_dark.png"
import { auth } from "../firebase/config"
import { listWorkReducer } from "../redux/reducer/ListWork"
import { filterReducer } from "../redux/reducer/filter"

export default function Header() {
  const dispatch = useDispatch()
  const signOut = () => {
    dispatch(listWorkReducer.actions.reset())
    dispatch(filterReducer.actions.reset())
    auth.signOut()
  }
  return (
    <header className="flex gap-8 justify-center items-center h-20 mb-5 relative">
      <img src={logo} className="object-cover h-full" alt="" />
      <h1 className="font-black text-4xl">Budget App</h1>
      <button
        className="absolute right-0 sm:right-1 -top-6 sm:top-auto my-2 px-3 py-2 rounded-md bg-[#068FFF] text-white"
        onClick={signOut}
      >
        Log out
      </button>
    </header>
  )
}
