import { useContext} from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { useSocketHook } from "../../hooks/useSocketHook";
import { IoMdSend } from "react-icons/io";


export const FormChat = () => {

    const  { currentRoom } = useSocketHook()
    //console.log(horaMinuto)
    //obtener el usuario -> para enviar en el mensaje el username 
    const { user } = useContext(AuthContext)!
    const { sendMessage   } = useContext(SocketContext)!


    const initialValues = {
        username: user?.data.username || 'user',
        content: '',
        room : currentRoom
    }

    // generar la hora actual para mostrarla formateada en la web
    const { register,  handleSubmit ,resetField , watch } = useForm({
        defaultValues: initialValues
    })
    
    //console.log(getValues('content'))
    //obtener el mensaje
    const toSubmit = ( data :any  ) => {
        const contentValidation = watch('content')

        if(  !contentValidation  || contentValidation.trim().length < 1){
            return
        } else {
                         
                sendMessage(data,currentRoom)
                resetField('content')      
        }
    }
    
    
    if(currentRoom === '' ) return
    else  return (
        <form className="row-span-1 h-auto flex row gap-2 justify-between" onSubmit={handleSubmit(toSubmit)}>
            <input
                type="text"
                className="w-full outline-none py-2 px-3 inset-shadow-sm  inset-shadow-gray-950   bg-neutral-700 rounded-lg text-white"
                autoComplete="off"
                id="content"
                {
                ...register('content', {
                    validate: (value) => {
                        if (value.trim().length > 0) return true;
                        toast.error('El mensaje debe tener al menos un caracter');
                        return
                    }
                })
                }
            />
            <button type="submit" className=" cursor-pointer ">
                <IoMdSend  size={30} color="gray" />
            </button>
           
        </form>
    )
}
