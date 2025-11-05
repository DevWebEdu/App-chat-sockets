import { Navigate, Outlet } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext/AuthContext"
import { SocketContextProvider } from "../../context/socketContext/socketContextProvider"


export const ChatLayout = () => {
  
  const { user , isLoading  } = useContext(AuthContext)!


  if(isLoading ) return <> Cargando </>
  if(  user?.data.error && !user.success )  return <Navigate to={'/auth/authenticate'}/>

  if( user && user.success && user.data.fullname.length > 0 )  return (
    <div className="bg-neutral-950 min-h-screen     "  >
      <SocketContextProvider>

      <Outlet/>
      </SocketContextProvider>
    </div>
  )
}
