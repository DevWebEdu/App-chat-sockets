import { useContext, useEffect } from "react";
import { Chat } from "../components/Chat";
import { RoomList } from "../components/ChatBar";
import { useSocketHook } from "../../hooks/useSocketHook";
import { AuthContext } from "../../context/authContext/AuthContext";

export const ChatView = () => {
  const { user } = useContext(AuthContext)!;
  const { connect, setterUserConnected } = useSocketHook();

  useEffect(() => {
    if (user) {
      connect(user);
      setterUserConnected(user);
    }
  },[user]);

  return (
    <div className=" flex  justify-center items-center  h-screen  max-w-[1490px]  mx-auto ">
      {/* roomlist */}
      <div className="col-span-2 h-full flex-none   ">
        <RoomList />
      </div>

      {/* Chat  */}
      <div className="col-span-4   h-full   flex flex-col w-full ">
        <Chat />
      </div>
    </div>
  );
};
