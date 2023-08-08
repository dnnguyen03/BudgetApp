import { useState } from "react"
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { addDocument } from "../../firebase/services"
import bgSignIn from "../../assets/img/bgSignIn.avif"
import { Input, Checkbox } from "antd"

export default function Login() {
  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("admin12345")
  const handleEmailAndPassword = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (getAdditionalUserInfo(result).isNewUser) {
          addDocument("users", {
            email: result.user.email,
            uid: result.user.uid,
            listWork: [],
          })
        }
      })
      .catch((error) => {
        console.log(error)
        // ..
      })
  }
  return (
    <>
      <img
        src={bgSignIn}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4 rounded-lg">
        <div className="absolute top-2/4 left-2/4 w-80 sm:w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4 bg-white p-4 rounded-xl">
          <div className="-mt-12 grid h-28 place-items-center bg-[#068FFF] rounded-xl shadow-lg shadow-[#68b6ff]">
            <h3 className="font-bold text-white text-3xl">Sign In</h3>
          </div>
          <div className="flex flex-col gap-1 py-6">
            <label>Email</label>
            <Input
              className="py-2"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <label className="mt-2">Password</label>
            <Input
              className="py-2"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex mt-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="ml-3 cursor-pointer text-[#616161]"
              >
                Remember Me
              </label>
            </div>
          </div>
          <button
            className="uppercase mb-6 w-full bg-[#068FFF] rounded-xl text-white py-3 px-6 font-bold ease-in-out transition-all hover:shadow-lg hover:shadow-[#95ccfff9]"
            onClick={handleEmailAndPassword}
          >
            Sign In
          </button>
          <div className=" flex justify-center items-center gap-2">
            <p className=" text-[#616161]">Don't have an account?</p>
            <h3 className="text-[#068FFF] font-bold cursor-pointer">Sign Up</h3>
          </div>
        </div>
      </div>
    </>
  )
}
