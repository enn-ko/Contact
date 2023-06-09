import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTrashData } from "../Services/Apis/FireStoreApi";
import { motion } from "framer-motion";
import TrashTableComponent from "../Components/TrashTableComponent";
import { StateContext } from "../Services/Context/Context";
import { useMediaQuery } from "react-responsive";
import Loader from "../Services/Common/loader/Loader"
// import Loader from "../Services/Common/loader/loader";

const TrashTable = () => {


  const tablet = useMediaQuery({
    query: '(min-width: 1024px)'
  })


  const [allTrash, setAllTrash] = useState([]);
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  const { menuActive } = useContext(StateContext);

  useMemo(() => {
    getAllTrashData(setAllTrash, userEmail);
  }, []);


  return (
    <motion.div
    initial={tablet?{ marginLeft: "18%" }:{ marginLeft: 0 }}
    animate={menuActive ? { marginLeft: 0 } :( tablet?{ marginLeft: "18%" }:{ marginLeft: 0 })}
      transition={{ duration: 0.25 }}
      className={`flex-1 md:px-8  `}
    >
      <table className="table-auto w-full px-5 font-medium ">
        <thead>
            <tr>
                <td className="w-1/3">Name</td>
                <td className="w-1/3">Why is in the trash?</td>
                <td span={2} className="w-1/3">date of deletion</td>
            </tr>
        </thead>
        <tbody>
        <tr className="">
            <td className="">
              <p className="my-3 w-full">Trash ({allTrash?.length})</p>
            </td>
          </tr>
            {allTrash.length>0?(allTrash?.map((trash, index) => <TrashTableComponent key={trash.id} trash={trash} index={index}/>)):(
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

export default TrashTable;
