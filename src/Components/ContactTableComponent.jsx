import { BiUserCircle } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { LuBookDown } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { deleteContact, updateTrash } from "../Services/Apis/FireStoreApi";
import moment from "moment/moment";
import Swal from "sweetalert2";



const ContactTableComponent = ({

  
  contact,
  checkedAmount,
  setCheckedAmount,
  minusClick,
  index,
}) => {
  const nameBgColors = [
    "bg-[#482ff7]",
    "bg-[#9c1de7]",
    "bg-[#f3558e]",
    "bg-[#f3f169]",
    "bg-[#a7ff83]",
    "bg-[#28c7fa]",
    "bg-[#ea7dc7]",
  ];

  const delay = index* 0.1


  const variant = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay } },
  };

  const contactImage = contact?.imgUrl;
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const username = contact?.name;

  const nav = useNavigate();

  const contactId = contact?.contactId;

  const delContactId = contact?.id;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setModalActive(false);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const getTime = () => moment().format("LLL");

  const trashData = { ...contact, deletionDate: getTime() };

  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-[#28c7fa] text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
      cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
    },
    buttonsStyling: false,
  });

  // const colorRandomLength = Math.floor(Math.random()* (nameBgColors?.length))
  const colorCode = nameBgColors[index];

  const handleDelete = () => {
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteContact(delContactId);
          updateTrash(trashData);
          swalWithButtons.fire(
            "Deleted!",
            "Your contact has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary contact is safe :)",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    if (isChecked) {
      setCheckedAmount(checkedAmount + 1);
    } else {
      if (checkedAmount > 0) setCheckedAmount(checkedAmount - 1);
    }
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(false);
    setCheckedAmount(0);
  }, [minusClick]);

  return (
    <motion.tr
    initial={'closed'}
    animate={'open'}
    variants={variant}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-pointer relative   ${
        isChecked || isHovered ? "bg-[#4f546b]" : ""
      }`}
    >
      <td className=" w-[40%] sm:w-[35%] md:w-[30%] lg:w-1/4 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
        <div className="flex items-center justify-start gap-2">
          {isChecked || isHovered ? (
            <div className="md:w-10 md:h-10 w-6 h-6 flex items-center">
              <input
                value={isChecked}
                onChange={handleCheckboxChange}
                className=" h-6 w-6 text-blue-500  rounded-sm border-gray-300 focus:ring-blue-500 inline-block "
                type="checkbox"
              />
            </div>
          ) : (
            <div
              onClick={() => {
                nav(`person/${contactId}`);
              }}
              className="md:w-10 md:h-10 w-6 h-6  overflow-hidden "
            >
              {contactImage ? (
                <img
                  src={contactImage}
                  className="w-full h-full rounded-full "
                  alt=""
                />
              ) : (
                <div
                  className={`w-full h-full rounded-full bg-[#28c7fa] grid place-items-center`}
                >
                  <h1 className="text-xl ">{username && username[0]}</h1>
                </div>
              )}
            </div>
          )}
          {contact?.name}
        </div>
      </td>
      <td className="text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"
        onClick={(e) => {
          nav(`person/${contactId}`);
        }}
      >
        {contact?.email}
      </td>
      <td className="text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"
        onClick={(e) => {
          nav(`person/${contactId}`);
        }}
      >
        {contact?.phone}
      </td>
      <td className="text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"
        onClick={(e) => {
          nav(`person/${contactId}`);
        }}
      >
        {contact?.jobTitle}
      </td>
      {/* <td
        onClick={(e) => {
          nav(`person/${contactId}`);
        }}
        className="relative "
      ></td> */}
      <td className="hidden md:block">
        {(isChecked || isHovered || modalActive) && (
          <div
            onClick={() => nav("/")}
            className={`flex items-center justify-end gap-4  `}
          >
            <AiOutlineStar className="text-xl" />
            <MdOutlineModeEditOutline className="text-xl" />
            <HiOutlineDotsVertical
              onClick={() => setModalActive(!modalActive)}
              className="text-xl "
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, height: "1rem", width: "2rem" }}
              animate={
                modalActive
                  ? { opacity: 1, scale: 1, height: "9rem", width: "15rem" }
                  : { opacity: 0, scale: 0, height: "1rem", width: "2rem" }
              }
              transition={{ duration: 0.2 }}
              className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
            >
              <div className="z-50">
                <div className="flex items-center justify-start gap-5">
                  <AiFillPrinter />
                  <span>To print out</span>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <FiUpload />
                  <span>to take out</span>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <LuBookDown />
                  <span>Hide from contacts</span>
                </div>
                <div
                  onClick={handleDelete}
                  className="flex items-center justify-start gap-5 "
                >
                  <RiDeleteBin6Line />
                  <span>to delete</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </td>

      {/* <motion.div
              initial={{ opacity: 0, scale: 0, height: "1rem", width: "2rem" }}
              animate={
                modalActive
                  ? { opacity: 1, scale: 1, height: "9rem", width: "15rem" }
                  : { opacity: 0, scale: 0, height: "1rem", width: "2rem" }
              }
              transition={{ duration: 0.2 }}
              className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg z-50 rounded-sm"
            >
              <div  className="z-50">
                <div className="flex items-center justify-start gap-5">
                  <AiFillPrinter />
                  <span>To print out</span>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <FiUpload />
                  <span>to take out</span>
                </div>
                <div className="flex items-center justify-start gap-5">
                  <LuBookDown />
                  <span>Hide from contacts</span>
                </div>
                <div
                  onClick={handleDelete}
                  className="flex items-center justify-start gap-5 "
                >
                  <RiDeleteBin6Line />
                  <span>to delete</span>
                </div>
              </div>
            </motion.div> */}
    </motion.tr>
  );
};

export default ContactTableComponent;
