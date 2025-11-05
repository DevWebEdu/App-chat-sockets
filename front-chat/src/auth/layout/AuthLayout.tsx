import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../../context/authContext/AuthContext"


export const AuthLayout = () => {

  const {  isLoading , user } = useContext(AuthContext)!
  console.log(user)
  if (isLoading) return <>Cargando</>
  if( user && user.success && user.data.fullname.length > 0 ) return <Navigate to={'/chat'} replace/>

  if( !user || user === undefined || user?.data.error && !user.success ) return (
    <div className="bg-neutral-950 min-h-screen  flex justify-center items-center ">
          <Outlet/>
    </div>
  )

  
}
