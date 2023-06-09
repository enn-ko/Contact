import { useEffect, useState } from "react";
import { registerApi } from "../Services/Apis/authApi";
// import { registerApi, useRegisterMutation } from "../Services/Apis/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUniqueID } from "../Services/Common/Uuid/UniqueId";
import { postUserData } from "../Services/Apis/FireStoreApi";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')

  const contactData = {name, email, password, password_confirmation}

  const nav = useNavigate()

// const [register] = useRegisterMutation()

// const handleRegister = async (e) => {
//   try {
//     e.preventDefault()
//     const {data} = await register(contactData)
//     if(data.success) nav('/login')
//     toast.success('Account created successfully.')
//   } catch (error) {
//     toast.error("Can't create account. Please check your input.")
//     console.log(error)
//   }
// }

// useEffect(() => {
//   onAuthStateChanged(auth, res => {
//     if(res?.accessToken)

//       nav("/")})
// }, [])

const register = async (e) => {
  try {
    e.preventDefault()
    let res = await registerApi(email, password);
    const obj = {
      name: name,
      email: email,
      userId: getUniqueID(),
    };
    postUserData(obj);

    nav("/home");
    localStorage.setItem("userEmail", res.user.email);
    toast.success("Account Created successfully");
  } catch (err) {
    toast.error("Can't create account.Try again.")
    return err;
  }
};
 
  return (
    <div className="bg-transparent w-full h-screen grid place-items-center">
      <form onSubmit={register} action="" className=" w-[20rem] mx-auto">
        <div className="">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
        </div>
        <div className="my-5">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
        </div>
        <div className="">
          <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
        </div>
        <div className="mt-5">
          <input  value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} type="password" placeholder="Confirm Password" className="w-full py-2 px-3 focus:outline-none bg-transparent border bottom-2" />
        </div>
        <div className="">
          <button  className="bg-button px-3 py-2 text-button-text rounded-md mt-5">Register</button>
        </div>
        <div className="mt-4">
          <p>Already have an account. <span onClick={() => nav('/login')} className="text-blue-500 cursor-pointer">sign in</span> </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
