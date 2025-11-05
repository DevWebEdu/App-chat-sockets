
import { useContext, useEffect } from "react"
import { Chat } from "../components/Chat"
import { RoomList } from "../components/ChatBar"
import { useSocketHook } from "../../hooks/useSocketHook"
import { AuthContext } from "../../context/authContext/AuthContext"




export const ChatView = () => {
  const { user } = useContext(AuthContext)!  
  const { connect  ,setterUserConnected   } = useSocketHook()

   useEffect(() => {
    if(user){
      connect(user) 
      setterUserConnected(user)
    }
   }, [])
  
  
  return (

<div className="  px-36 flex  justify-center items-center gap-2  h-screen border-1" >
  {/* roomlist */}
    <div className="col-span-2 bg-neutral-900 rounded-lg h-9/12 flex-none p-2">
        <RoomList />
      </div>

      {/* Chat  */}
      <div className="col-span-4 bg-neutral-900  rounded-lg  p-2 grid h-9/12 grid-flow-col grid-rows-7  w-full gap-1">
        <Chat />
      </div>
</div>


  )
}
