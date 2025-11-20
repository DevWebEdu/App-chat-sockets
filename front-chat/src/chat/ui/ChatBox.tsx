import { useContext, useEffect, useRef } from "react";
import { useSocketHook } from "../../hooks/useSocketHook";

import { AuthContext } from "../../context/authContext/AuthContext";
import { toast } from "sonner";
import { MoveLeft, MoveRight } from "lucide-react";

export const ChatBox = () => {
  const {
    usersConnected,
    messages,
    advises,
    advisesToRoom,
    currentRoom,
    setIsOpenSidebar,
    isOpenSidebar,
  } = useSocketHook()!;

  //console.log(messages)
  const { user } = useContext(AuthContext)!;
  const bottomRef: any = useRef(null);

  //console.log(advisesToRoom);
  const enableSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  useEffect(() => {});

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (advisesToRoom.length) {
      toast.warning(advisesToRoom);
    }
  }, [advisesToRoom]);

  useEffect(() => {
    if (advises.length) {
      toast.warning(advises);
    }
  }, [advises]);

  useEffect(() => {
    if (Array.isArray(usersConnected) && usersConnected.length > 0) {
      usersConnected.map((user) =>
        toast.info(` Se acaba de conectar el usuario ${user}.`)
      );
    }
  }, [usersConnected]);

  if (currentRoom === "")
    return (
      <div className="relative row-span-7 h-full overflow-y-auto px-1 bg-neutral-200/50 ">
       

          <p className="bg-yellow-500 font-bold text-white rounded-lg w-full p-2 mt-2">
            Debes seleccionar una sala para poder chatear con las demas personas
            conectadas
          </p>

      </div>
    );

  return (
    <div
      className="row-span-6  h-full overflow-y-auto inset-shadow-sm   overflow-auto  space-y-1 flex flex-col  bg-neutral-100  text-neutral-300  
      "
    >
      {/*  estudiarlo  */}
      <div className=" text-center  bg-neutral-300 text-black  py-3 uppercase text-2xl flex px-4  ">
        <button className="p-1 cursor-pointer" onClick={enableSidebar}>
          <div className="relative w-8 h-8">
            {/* Icono MoveLeft */}
            <div
              className={`absolute   ${
                isOpenSidebar
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-50"
              }`}
            >
              <MoveLeft size={30} absoluteStrokeWidth={true} />
            </div>

            {/* Icono MoveRight */}
            <div
              className={`absolute ${
                !isOpenSidebar
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              }`}
            >
              <MoveRight size={30} absoluteStrokeWidth={true} />
            </div>
          </div>
        </button>
        <p className=" font-semibold text-3xl flex-1 "> {currentRoom} </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* MOSTRAMOS LOS MENSAJES */}
        {messages[currentRoom]?.map((msg: any, i: number) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.sender.username === user?.data.username
                ? "flex-row-reverse"
                : ""
            }`}
          >
            {/* Avatar */}
            {msg.sender.username !== user?.data.username && (
              <div className="flex-shrink-0 w-15 h-15 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white font-semibold text-2xl uppercase">
                  {msg.sender.username[0]}
                </div>
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-md px-6 py-2 rounded-3xl ${
                msg.sender.username === user?.data.username
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-neutral-200 text-gray-800 rounded-bl-md"
              }`}
            >
              <p className="text-lg leading-snug">{msg.content}</p>
            </div>
          </div>
        ))}
        {/* 👇 AQUÍ COLOQUÉ LA REFERENCIA - AL FINAL DE TODOS LOS MENSAJES */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
