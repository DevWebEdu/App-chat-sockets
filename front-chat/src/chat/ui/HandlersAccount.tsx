import { useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/authContext/AuthContext"
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";



export const HandlersAccount =  (  { stateForm , setStateForm }  : {
    stateForm : { formRoomSate: boolean } ,
    setStateForm :React.Dispatch<React.SetStateAction<{ formRoomSate: boolean; }>>} ) => {


    const navigate = useNavigate()
    const { logout, user } = useContext(AuthContext)!
    
    //console.log(stateForm)

    const onLogout = () => {
        logout()
        navigate('/auth/authenticate', {
            replace: true
        })
    }

    const handleFormRoom = () => {
       setStateForm({...stateForm ,formRoomSate : true})
    }

    return (
        <div className="flex  justify-between  items-center  w-full flex-wrap">
            {/* Avatar del usuario y username */}
            <div className="flex items-center gap-2">
                <div className="rounded-full w-[50px] h-[50px] bg-green-600"></div>
                <h4 className="text-xs txt-semibold text-wrap  w-3/6 text-white"> {user?.data.fullname} </h4>
            </div>
            {/* botones de logout o crear una nueva sala */}
            <div className="flex gap-2" >
                <button 
                    className={`bg-green-700 text-white p-3 rounded-lg font-bold text-xs cursor-pointer ${ stateForm.formRoomSate ? 'hidden' : 'block'} `} 
                    onClick={handleFormRoom}  >
                    <BiSolidMessageRoundedAdd size={20}/>
                </button>
                <button className="bg-red-700 text-white p-3 rounded-lg font-bold text-xs cursor-pointer" onClick={onLogout}>
                    <IoLogOut  size={20} />
                </button>
            </div>
        </div>
    )
}
