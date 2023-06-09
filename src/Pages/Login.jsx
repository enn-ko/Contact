import { useEffect, useState } from "react"
// import { useLoginMutation } from "../Services/Apis/authApi"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../Services/slice/userSlice"
import { toast } from "react-toastify"
import { loginApi } from "../Services/Apis/authApi"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase.config"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const contactData = {email, password}

  // const [login] = useLoginMutation()
  const nav = useNavigate()

  const dispatch = useDispatch()

  
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken)

        nav("/")})
  }, [])

  // const handleLogin =async (e) => {
  //   try {
  //     e.preventDefault()
  //     const {data}= await login(contactData)
  //     console.log(data)
  //     dispatch(addUser(data))
  //     if(data.success) nav('/')
  //     toast.success("Sign in successfully")
  //   } catch (error) {
  //     toast.error("Cannot sign in to your account. Please try again.")

  //     console.log(error)
  //   }
  // }

  const login = async (e) => {
    try {
      e.preventDefault()
      let res = await loginApi(email, password);
      toast.success("Signed In to your account!");
      localStorage.setItem("userEmail", res.user.email);
      nav("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };
  return (
    <div className="bg-transparent w-full h-screen grid place-items-center">
      <form onSubmit={login} action="" className=" w-[20rem] mx-auto">
        
        <div className="my-5">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
        </div>
        <div className="">
          <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
        </div>
        
        <div className="">
          <button  className="bg-button px-3 py-2 text-button-text rounded-md mt-5">login</button>
        </div>

        <div className="mt-5">
          <h1>Don't you have account? <span onClick={() => nav('/register')} className="text-blue-600 cursor-pointer">Register now</span> </h1>
        </div>
      </form>
    </div>
  )
}

export default Login
