import { CgMenuGridO } from "react-icons/cg";
import { MdAttachFile } from "react-icons/md";
export const ChatProove = () => {
  return (
    <div className=" bg-neutral-950 min-h-screen  mx-auto flex justify-center  text-sm text-neutral-300">
      <div className="min-w-4xl border-x-[1px] border-gray-700 flex flex-row ">
        {/* Seccion de SideBar para chats  */}
        <div className=" min-h-screen  border-r-[1px] w-70 border-gray-700 py-5 px-2 space-y-2 flex  flex-col ">
          {/* espacio para widgets */}
          <div className="flex justify-between items-center mb-20">
            <p className=" font-bold text-lg">C</p>
            <div>
              <button>
                <CgMenuGridO />
              </button>
            </div>
          </div>
          {/* contenedor de los chats */}
          <div className="w-full flex flex-col gap-2">
            {/* cards para los chats  */}
            <div className="w-full shadow-xl/60 text-[11px] bg-neutral-900 px-2 py-4 rounded-lg space-y-3 cursor-pointer hover:inset-shadow-sm hover:inset-shadow-neutral-800">
              {/* primer div contendra solo el nombre de la sala  y boton para opciones */}
              <div className=" flex justify-between items-center ">
                <h4> XXXXXXXXX </h4>
                <p className=" "> connecting  : 3 </p>
              </div>
            </div>

          </div>
          <div>
          </div>
        </div>
        {/*  Seccion para lo que va salvaguardar el chatbox ( mensajes ) y  la caja de texto para comentar */}
        <div className="flex flex-col w-full px-5 py-5">
          <div className=" flex-1 ">
            chatbox 
          </div>
          <div className="  py-3 flex-none">
            <form className=" bg-neutral-700  text-neutral-300 rounded-lg px-3 py-3 flex items-center" >
              <input type="text" placeholder="Escriba su texto" className=" outline-none w-full " autoComplete="off" />
              <button className="cursor-pointer p-3 h-full">
                <MdAttachFile size={25} color="text-neutral-300"/>
              </button>
              {/*  es necesario crear un boton que tenga display none para que pueda lanzarse el method del imput  */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
