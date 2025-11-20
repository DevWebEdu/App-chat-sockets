import { ChatBox } from "../ui/ChatBox"
import { FormChat } from "../ui/FormChat"

export const Chat = () => {
  
  return (
    <>
        {/* Component que muestra los moviemientos de un chat */}
        {/* Componente en caso de que ningun room haya sigo seleccionado */}
        <ChatBox />
        <FormChat/>
        {/*    
            Componente
            formulario para enviar un mensaje  
            1. que se pueda enviar mensajes ( plano )
            2. que se puedan enviar documentos ( .doc .png )
        */}
    </>
  )
}
