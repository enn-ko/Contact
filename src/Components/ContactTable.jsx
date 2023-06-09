import { useContext, useEffect, useMemo, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillMinusSquare } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { CgToggleSquareOff } from "react-icons/cg";
import { LuBookDown } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsColumns } from "react-icons/bs";

import { StateContext } from "../Services/Context/Context";
import { motion } from "framer-motion";
import ContactTableComponent from "./ContactTableComponent";
import {
  getAllContactData,
  postContactData,
} from "../Services/Apis/FireStoreApi";
import { useNavigate } from "react-router-dom";
import { useGetContactQuery } from "../Services/Apis/ContactApi";
import { useMediaQuery } from "react-responsive";
import Loader from "../Services/Common/loader/Loader";
const ContactTable = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1537px)",
  });
  const laptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const phone = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const smPhone = useMediaQuery({
    query: "(min-width: 640px)",
  });

  // const nameBgColors = ['bg-[#482ff7]','bg-[#9c1de7]','bg-[#f3558e]','bg-[#f3f169]','bg-[#a7ff83]','bg-[#28c7fa]','bg-[#ea7dc7]']

  const [allContacts, setAllContacts] = useState([]);

  const nav = useNavigate();

  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));

  // const userEmail = user?.email

  const userEmail = localStorage.getItem("userEmail");

  console.log("object"); 

  // useEffect(() => {
  //   if (!token) nav("/login");
  // }, []);

  // const { data } = useGetContactQuery(token);

  const { menuActive, searchContact } = useContext(StateContext);

  const [checkedAmount, setCheckedAmount] = useState(0);
  const [minusClick, setMinusClick] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalActive2, setModalActive2] = useState(false);

  // const contacts = data?.contacts.data;

  useEffect(() => {
    getAllContactData(setAllContacts, userEmail);
  }, []);

  const searchItems =
    searchContact.length > 0
      ? allContacts?.filter((contact) =>
          contact?.name.toLowerCase().includes(searchContact)
        )
      : allContacts;

  return (
    <motion.div
      initial={tablet ? { marginLeft: "18%" } : { marginLeft: 0 }}
      animate={
        menuActive
          ? { marginLeft: 0 }
          : tablet
          ? { marginLeft: "18%" }
          : { marginLeft: 0 }
      }
      transition={{ duration: 0.25 }}
      className={`flex-1 lg:px-8 px-1  `}
    >
      <table className="table-auto w-full sm:px-5 font-medium">
        <thead className="">
          {checkedAmount <= 0 ? (
            <tr className="border-b-[1px] ">
              <th className="text-start w-[30%] sm:w-[33%] md:w-[30%] lg:w-1/4  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                Name
              </th>
              <th className="text-start w-1/5 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">Email</th>
              <th className="text-start  w-1/5 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">ph no</th>
              <th className="text-start w text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">job</th>
              {/* <motion.th
                initial={{ opacity: 0, display: "none" }}
                animate={
                  menuActive
                    ? { opacity: 1, display: "block" }
                    : { opacity: 0, display: "none" }
                }
                transition={{ duration: 0.45 }}
                className="text-start hidden md:block"
              >
                indicator
              </motion.th> */}

              <th
                colSpan={menuActive ? 1 : 2}
                className="text-end relative font-primary hidden md:block"
              >
                <div className="flex items-center justify-end gap-4">
                  <AiFillPrinter className="text-xl" />
                  <FiDownload className="text-xl" />
                  <FiUpload className="text-xl" />
                  <HiOutlineDotsVertical
                    onClick={() => setModalActive2(!modalActive2)}
                    className="text-xl cursor-pointer"
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                      height: "2rem",
                      width: "5rem",
                    }}
                    animate={
                      modalActive2
                        ? {
                            opacity: 1,
                            scale: 1,
                            height: "6rem",
                            width: "15rem",
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                            height: "2rem",
                            width: "5rem",
                          }
                    }
                    transition={{ duration: 0.2 }}
                    className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
                  >
                    <div className="">
                      <div className="flex items-center justify-start gap-5">
                        <FiUpload />
                        <span>Display pixel density</span>
                      </div>
                      <div className="flex items-center justify-start gap-5">
                        <BsColumns />
                        <span>Change column order</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </th>
            </tr>
          ) : (
            <tr className="border-b-[1px]">
              <th className="text-start w-3/5 sm:w-2/5 text-[.8rem] md:text-[1rem] lg:text-[1.2rem]">
                <div className="flex items-center justify-start gap-3">
                  <button>
                    <AiFillMinusSquare
                      onClick={() => setMinusClick(!minusClick)}
                      className="text-2xl"
                    />
                  </button>
                  <BsFillCaretDownFill className="text-md" />
                  <span>{checkedAmount} selected</span>
                </div>
              </th>
              <th className="w-1/5   text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"></th>
              <th className=" w-1/5  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"></th>
              <th className=" w-1/5  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"></th>
              {/* <th className=" w-1/5 "></th> */}

              <th
                colSpan={menuActive ? 1 : 2}
                className="text-end relative hidden md:block  text-[.8rem] md:text-[1rem] lg:text-[1.2rem]"
              >
                <div className="flex items-center justify-end gap-4">
                  <AiFillPrinter className="text-xl" />
                  <FiDownload className="text-xl" />
                  <FiUpload className="text-xl" />
                  <HiOutlineDotsVertical
                    onClick={() => setModalActive2(!modalActive2)}
                    className="text-xl cursor-pointer"
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                      height: "1rem",
                      width: "2rem",
                    }}
                    animate={
                      modalActive2
                        ? {
                            opacity: 1,
                            scale: 1,
                            height: "6rem",
                            width: "15rem",
                          }
                        : {
                            opacity: 0,
                            scale: 0,
                            height: "1rem",
                            width: "2rem",
                          }
                    }
                    transition={{ duration: 0.2 }}
                    className="absolute top-[3rem]   right-0 px-4 py-6 bg-button text-button-text shadow-lg rounded-sm z-50"
                  >
                    <div className="">
                      <div className="flex items-center justify-start gap-5">
                        <FiUpload />
                        <span>Display pixel density</span>
                      </div>
                      <div className="flex items-center justify-start gap-5">
                        <BsColumns />
                        <span>Change column order</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </th>
            </tr>
          )}
        </thead>
        <tbody className="max-h-[50vh] overflow-y-auto">
          <tr>
            <td className="">
              {allContacts?.length>0 &&(<p className="my-3">Contacts ({allContacts?.length})</p>)}
            </td>
          </tr>
          {searchItems.length > 0 ? (
            searchItems?.map((contact, index) => (
              <ContactTableComponent
                key={index}
                index={index}
                contact={contact}
                setCheckedAmount={setCheckedAmount}
                checkedAmount={checkedAmount}
                minusClick={minusClick}
                // nameBgColors={nameBgColors}
              />
            ))
          ) : (
            <tr>
              <td>
                <Loader/>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ContactTable;
