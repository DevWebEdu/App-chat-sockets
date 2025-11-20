import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { useSocketHook } from "../../hooks/useSocketHook";
import { Paperclip, Send } from "lucide-react";

export const FormChat = () => {
  const { currentRoom } = useSocketHook();
  //console.log(horaMinuto)
  //obtener el usuario -> para enviar en el mensaje el username
  const { user } = useContext(AuthContext)!;
  const { sendMessage } = useContext(SocketContext)!;

  const initialValues = {
    username: user?.data.username || "user",
    content: "",
    room: currentRoom,
  };

  // generar la hora actual para mostrarla formateada en la web
  const { register, handleSubmit, resetField, watch } = useForm({
    defaultValues: initialValues,
  });

  //console.log(getValues('content'))
  //obtener el mensaje
  const toSubmit = (data: any) => {
    const contentValidation = watch("content");

    if (!contentValidation || contentValidation.trim().length < 1) {
      return;
    } else {
      sendMessage(data, currentRoom);
      resetField("content");
    }
  };

  if (currentRoom === "") return;
  else
    return (
      <form
        className="row-span-1 flex flex-none  row gap-1 justify-between py-2 px-2 bg-neutral-100  border-t-1 border-neutral-300  "
        onSubmit={handleSubmit(toSubmit)}
      >
        <div className="flex  w-full  rounded-full  px-2 bg-neutral-200">
          <input
            type="text"
            className="w-full outline-none py-3 px-3     "
            autoComplete="off"
            id="content"
            {...register("content", {
              validate: (value) => {
                if (value.trim().length > 0) return true;
                toast.error("El mensaje debe tener al menos un caracter");
                return;
              },
            })}
          />
          <button
            type="submit"
            className=" p-2 bg-gray-300 hover:bg-gray-400  w-12 h-12  flex items-center justify-center rounded-full transition-colors my-2 cursor-pointer"
          >
            <Send className="text-gray-700 " size={25} />
          </button>
        </div>
      </form>
    );
};
