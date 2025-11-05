
import { useState } from "react"
import { FormRoom } from "../ui/FormRoom"
import { HandlersAccount } from "../ui/HandlersAccount"
import { RoomsList } from "../ui/RoomsList"

export const RoomList = () => {
  const [stateChatBar ,setStateChatBar] = useState({
    formRoomSate : false
  })

  

  return (
    <>
      <div className=" flex flex-col p-2 space-y-4 text-white h-full">
          <HandlersAccount stateForm={ stateChatBar}  setStateForm={setStateChatBar} />
          <FormRoom  stateForm={ stateChatBar}  setStateForm={setStateChatBar} />
          <RoomsList/>
      </div>
    </>
  )
}
