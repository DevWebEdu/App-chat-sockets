import { useContext, useEffect, useState } from "react";
import type { RoomType } from "../../types/ChatTypes";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const RoomsList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {
    joinRoom,
    rooms,
    deleteRoom,
    error,
    deletedNotification,
    setDeleteNotification,
    isOpenSidebar
  } = useContext(SocketContext)!;

  const { user } = useContext(AuthContext)!;

  const enterToChat = (room: RoomType) => {
    // handle entering the chat room here, e.g. console.log(room)
    joinRoom(room, user);
  };

  const deleteRoomButton = (roomId: string) => {
    deleteRoom(roomId);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (deletedNotification) {
      toast.success(deletedNotification);
      setDeleteNotification("");
    }
  }, [deletedNotification, setDeleteNotification]);

  return (
    <ul className={` flex-1 overflow-y-auto  space-y-2   pb-4   ${ isOpenSidebar ? '' : 'hidden' }  pr-2`} >
      {rooms.map((room, i) => (
        <li
          key={i}
          onClick={() => {
            setActiveIndex(i);
          }}
          className={` ${
            activeIndex === i ? "bg-neutral-800" : ""
          }  w-full   rounded-lg hover:bg-neutral-800/50  `}
        >
          <button
            className=" flex justify-between w-full h-full  p-3   cursor-pointer rounded-lg   "
            onClick={() => enterToChat(room)}
            type="button"
          >
            <div className=" flex flex-col ">
              <h5 className="font-semibold ">{room.name}</h5>
              <div className="flex  items-center gap-2 text-xs ">
                <span className=" rounded-full bg-green-900 animate-pulse w-3  h-3 block">
                  {" "}
                </span>
                {room.members.length}
              </div>
            </div>
            {/*  Validar si el usuario que esta logueado es el que creo el chat , si es asi, el puede borrarlo , si no no */}
            {room.createdBy === user?.data._id && room.name !== "lobby" && (
              <span
                role="button"
                onClick={() => deleteRoomButton(room._id)}
                className={`${
                  activeIndex !== i ? "hidden" : ""
                }  p-2 opacity-10 hover:opacity-100 flex items-center hover:bg-red-700 rounded-lg cursor-pointer  transition-opacity`}
              >
                <Trash2 size={15} />
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};
