import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/authContext/AuthContext";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { useSocketHook } from "../../hooks/useSocketHook";
import { EllipsisVertical } from "lucide-react";

export const HandlersAccount = ({
  stateForm,
  setStateForm,
}: {
  stateForm: { formRoomSate: boolean };
  setStateForm: React.Dispatch<React.SetStateAction<{ formRoomSate: boolean }>>;
}) => {
    
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext)!;
  const { isOpenSidebar } = useSocketHook()!;
  const [enableHandlersButton ,setEnableHandlersButton] = useState(false);
  //console.log(stateForm)

  const onLogout = () => {
    logout();
    navigate("/auth/authenticate", {
      replace: true,
    });
  };

  const handleFormRoom = () => {
    setStateForm({ ...stateForm, formRoomSate: true });
  };

  return (
    <div
      className={` flex  justify-between pt-5 pb-8 items-center  w-full  ${
        isOpenSidebar ? "opacity-100 " : "opacity-0 "
      } transition-all duration-100  border-b-1 border-neutral-800 `}
    >
      {/* Avatar del usuario y username */}
      <div className="flex items-center gap-2">
        <div className="rounded-full w-[50px] h-[50px] bg-green-600"></div>
        <h4 className="text-xs txt-semibold  w-3/6 text-white">
          {user?.data.fullname}
        </h4>
      </div>
      {/* botones de logout o crear una nueva sala */}
      {/* crear un boton de menu para estas funcionalidad */}
      <div className="cursor-pointer">
        <button className="pr-4" onClick={ () => setEnableHandlersButton(!enableHandlersButton) } >
          <EllipsisVertical />
        </button>
        {/* modal */}
         <div className={` absolute ml-5 -mt-8 bg-neutral-800  flex flex-col  rounded-lg  p-2  space-y-2  ${ enableHandlersButton ? 'block' : 'hidden' } `} >
                <button 
                    className={`bg-green-700 text-white p-3 rounded-lg font-bold text-xs cursor-pointer ${ stateForm.formRoomSate ? 'hidden' : 'block'} `} 
                    onClick={handleFormRoom}  >
                    <BiSolidMessageRoundedAdd size={20}/>
                </button>
                <button className="bg-red-700 text-white p-3 rounded-lg font-bold text-xs cursor-pointer" onClick={onLogout}>
                    <IoLogOut  size={20} />
                </button>
            </div> 
      </div>
    </div>
  );
};
