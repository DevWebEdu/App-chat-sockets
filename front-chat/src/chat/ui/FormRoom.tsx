import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdAddBox, MdCancel } from "react-icons/md";
import { AuthContext } from "../../context/authContext/AuthContext";
import { SocketContext } from "../../context/socketContext/SocketContext";
import { toast } from "sonner";

const getTime = () => {
    const fecha = new Date()
    const horaMinuto = fecha.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second : "2-digit"

    });

    return horaMinuto
}



export const FormRoom = (  { stateForm , setStateForm }  : {
    stateForm : { formRoomSate: boolean } ,
    setStateForm :React.Dispatch<React.SetStateAction<{ formRoomSate: boolean; }>>} )=> {
    
 
  const initialValue = {
    name : ''
  }

  const { createRoom } = useContext(SocketContext)!
  const  { user } = useContext(AuthContext)!
  
  const { register , handleSubmit , resetField ,watch } = useForm({
    defaultValues : initialValue
  })
  
  const handleFormRoom = () => {
       setStateForm({...stateForm ,formRoomSate : false})
    }

  const inputValueData =  watch("name")
  const toSubmit = ( data : {name : string} ) =>  {
      if(!inputValueData) return

      const room = {
        
            createDate : getTime() , 
            createdBy  : user?.data.username || 'anonimo', 
            members : [],
            name : data.name
      }

      //console.log(room)
      // enviamos el param del nombre del room
      
      createRoom(room, user)
      resetField('name')
  }


if (stateForm.formRoomSate ) {
  return (
    <form  className=" p-3  bg-neutral-800 rounded-lg " noValidate onSubmit={handleSubmit(toSubmit)} >
        <div className=" flex flex-row-reverse justify-between items-start ">
            <button onClick={handleFormRoom} type="button" className="cursor-pointer">
                <MdCancel size={25} />
            </button>
            <label className="font-thin text-sm text-white block mb-2" > Ingresa el nombre de la sala </label>
        </div>
           <div className="flex justify-between gap-1">
            <input type="text" className="outline-none w-full border-dashed border-1 p-1"  
                autoComplete="off"
                  {...register('name',{
                    minLength : 1,
                    validate: (value) => {
                            if (value.trim().length > 0) return true;
                            toast.error('El mensaje debe tener al menos un caracter');
                            return
                        },
                        
                  })}
                />
              <button type="submit" className=" cursor-pointer "> <MdAddBox size={25} color="green" /> </button>
           </div>
            
      
    </form>
  )
  } else {
    return (<></>)
  }
}
