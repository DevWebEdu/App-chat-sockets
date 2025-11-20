
import { useEffect, useState } from "react"
import { FormRoom } from "../ui/FormRoom"
import { HandlersAccount } from "../ui/HandlersAccount"
import { RoomsList } from "../ui/RoomsList"
import { useSocketHook } from "../../hooks/useSocketHook"

export const RoomList = () => {
  const [stateChatBar ,setStateChatBar] = useState({
    formRoomSate : false
  })

  const  {isOpenSidebar} = useSocketHook()!
  
  
  return (
    <>
    {/* flex flex-col p-2 space-y-4 text-white h-full */}
      <div className={` h-full  flex flex-col  space-y-4 text-white  ${ isOpenSidebar ? 'w-80 ' : 'w-[0px] ' }    `} >
          <HandlersAccount stateForm={ stateChatBar}  setStateForm={setStateChatBar} />
          <FormRoom  stateForm={ stateChatBar}  setStateForm={setStateChatBar} />
          <RoomsList/>
      </div>
    </>
  )
}
