import { useContext, useEffect, useRef } from "react"
import { useSocketHook } from "../../hooks/useSocketHook"

import { AuthContext } from "../../context/authContext/AuthContext"
import { toast } from "sonner"


export const ChatBox = () => {

  const { usersConnected, messages, advises, advisesToRoom, currentRoom } = useSocketHook()!
  //console.log(messages)
  const { user } = useContext(AuthContext)!
  const bottomRef: any = useRef(null);
  console.log(advisesToRoom)

  useEffect(() => {

  }, [currentRoom])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(()=>{
    if(advisesToRoom.length){
      toast.warning(advisesToRoom)
    }
  },[advisesToRoom])

  useEffect(()=>{
    if(advises.length){
      toast.warning(advises)
    }
  },[advises])
  
  if (currentRoom === '') return ( 
    <div className="row-span-7 h-full overflow-y-auto inset-shadow-sm  inset-shadow-gray-950  overflow-auto bg-neutral-500 rounded-lg p-4 space-y-1 flex flex-col 
      ">
      <p className=" bg-red-600 font-bold text-white rounded-lg w-full p-2">
        Debes seleccionar una sala para poder chatear con las demas personas conectadas
      </p>
      {Array.isArray(usersConnected) && usersConnected.length > 0 ? usersConnected.map((connectedUser, i) => (
        <p className=" font-bold  bg-green-950 text-white rounded-lg w-full p-2" key={i}> {connectedUser} se ha conectado a la sesion. </p>
      )) : <></>}
    </div>
  )

  return (

    <div className="row-span-6  h-full overflow-y-auto inset-shadow-sm  inset-shadow-gray-950  overflow-auto rounded-lg p-4 space-y-1 flex flex-col  bg-neutral-700  text-neutral-300
      ">
      <p className=" text-center font-bold bg-black text-white "> {currentRoom} </p>


      {/* MOSTRAMOS LOS MENSAJES */}
      {messages[currentRoom]?.map((msg: any, i: number) => (

        <div className={`font-mono text-sm  text-white rounded-lg  p-2 flex justify-between ${msg.sender.username === user?.data.username ? "flex-row-reverse  bg-gray-500" : "flex-row bg-gray-400 "}`} key={i}>
          <div className=" flex ">
            <span className=" font-bold text-sm  ">{msg.sender.username === user?.data.username ? '' : msg.sender.username + " :  "}  </span>
            <p>{msg.content} </p>
          </div>
          <span className="">
            {msg.createdTime}
          </span>
        </div>

      )) }


    </div>

  )
}
