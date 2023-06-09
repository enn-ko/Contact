import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { editComment, getContactById } from "../Services/Apis/FireStoreApi";
import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import EditContactForm from "../Components/EditContactForm";
import { LuImagePlus } from "react-icons/lu";
import {BsX} from "react-icons/bs"
import { uploadContactImage } from "../Services/Apis/ImageUploadApi";
import { useMediaQuery } from "react-responsive";

const Person = () => {
  const [contact, setContact] = useState({});

  const isDesktop = useMediaQuery({
    query: '(min-width: 1537px)'
  })
  const laptop = useMediaQuery({
    query: '(min-width: 1280px)'
  })
  const tablet = useMediaQuery({
    query: '(min-width: 1024px)'
  })

  const phone = useMediaQuery({
    query: '(min-width: 768px)'
  })

  const smPhone = useMediaQuery({
    query: '(min-width: 640px)'
  })
  const nav = useNavigate();
  const { id } = useParams();

  const originImg = contact?.imgUrl

  

  useMemo(() => {
    getContactById(setContact, id);
  }, []);


  // const [name, setName] = useState(contact?.name);
  // const [phone, setPhone] = useState(contact?.phone);
  // const [email, setEmail] = useState(contact?.email);
  // const [address, setAddress] = useState(contact?.address);
  // const [jobTitle, setJobTitle] = useState(contact?.jobTitle);

  const fileRef = useRef(null);
  const [progresspercent, setProgressPercent] = useState(0);
  const [inputImage, setInputImage] = useState(0);

  const [imgUrl, setImgUrl] = useState("");

  const handleImageUpload = (event) => {
    uploadContactImage(event.target.files[0], setImgUrl, setProgressPercent);

    const file = event?.target?.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setInputImage(imageURL);
    }
  };

  const { menuActive } = useContext(StateContext);

  // const token = localStorage.getItem("token");
  const username = contact?.name;

  const [editActive, setEditActive] = useState(false);

  // useEffect(() => {
  //   if (!token) nav("/login");
  // }, []);
  return (
    <motion.div
    initial={tablet?{ marginLeft: "18%" }:{ marginLeft: 0 }}
    animate={menuActive ? { marginLeft: 0 } :( tablet?{ marginLeft: "18%" }:{ marginLeft: 0 })}
      transition={{ duration: 0.25 }}
      className={`mt-8 bg-transparent ${menuActive ? "" : ""}`}
    >
      <div className="ml-8">
        <div className="pb-4 mr-8 border-b-2 ">
        <Link to={"/"} >
        <button className="text-3xl ">
          <BsX/>
        </button>
        </Link>
          {editActive ? (
            <div className="">
              <div
                onClick={() => fileRef.current.click()}
                className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]  lg:w-[8rem] lg:h-[8rem] mb-8 bg-button rounded-full grid place-items-center cursor-pointer overflow-hidden"
              >
                {inputImage? (
                  <img src={inputImage} className="block w-full h-full" alt="" />
                    
                ): (
                  originImg? (
                    <img src={originImg} className="block w-full h-full" alt="" />
                  ) : (

                    <LuImagePlus className="text-button-text text-4xl" />
                  )

                )}
              </div>
              <input
                ref={fileRef}
                onChange={(event) => handleImageUpload(event)}
                type="file"
                name=""
                id=""
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-start gap-8">
              {contact?.imgUrl ? (
                <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden">
                  <img src={contact?.imgUrl} className="w-full h-full " alt="" />
                </div>
              ) : (
                <div className="w-[10rem] h-[10rem] rounded-full bg-green-500 grid place-items-center">
                  <h1 className="text-5xl">{username && username[0]}</h1>
                  {/* <h1 className="text-5xl">w</h1> */}
                </div>
              )}
              {/* <h1 className="text-xl">w</h1> */}
              <h1 className="text-xl">{username}</h1>
            </div>
          )}

          <div className="text-right w-[80%]">
            <button
              onClick={() => setEditActive(!editActive)}
              className="bg-blue-400 px-4 py-2 rounded-md "
            >
              To prepare
            </button>
          </div>
        </div>

        <div className="">
          {editActive ? (
            <EditContactForm
              contact={contact}
              imgUrl={imgUrl}
              inputImage={inputImage}
              originImg={originImg}
            />
          ) : (
            <div className="mt-10 flex items-center justify-start gap-10">
              <div className="border px-6 py-4 basis-[40%]">
                <h4>Contact details</h4>
                <p>{contact?.email}</p>
                <p>{contact?.phone}</p>
              </div>
              <div className="">
                <h6>Records</h6>
                <p>Last update time : {contact?.updateDate}</p>
                <p>Created at : {contact?.createDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Person;
