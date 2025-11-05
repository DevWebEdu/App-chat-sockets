import { isAxiosError } from "axios";
import api from "../../config/axios";
import type { LoginForm, RegisterForm, userResponseType } from "../../types/AuthTypes";
import { AuthContext } from "./AuthContext"
import { toast } from "sonner";
import useSWR, { mutate } from 'swr'


type AuthContextProviderProps = {
  children: React.ReactNode;
}


export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {


  const getUser = async () => {
    try {
      const response = await api.get('/api/auth/user')
      return {
        data: response.data,
        success: true
      }
    } catch (error) {

      if (isAxiosError(error) && error.message) {
        console.log(error.response?.data.error)//al obtener el valor de no autorizado podemos redireccionar a un usuario fuera
        return {
          success: false,
          data: {error : error.response?.data.error}
        }
      }
    }

  }

  const { data: user, isLoading, error } = useSWR('/api/user', getUser, {
    onSuccess: (data: userResponseType | undefined) => {
      if (!data?.success) {
        const token = localStorage.getItem('AUTH_TOKEN')
        if(token) {
           toast.error(data?.data.error )
           localStorage.removeItem('token');
            mutate('/api/user', null, false);
        }
      }
    }
  })

  const register = async (data: RegisterForm) => {

    try {
      const response = await api.post<string | null>('/api/auth/create-account', data)
      if (response?.data) {
        toast.success(response.data)
      }
      return {
        success: true
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
        return {
          success: false
        }
      }
    }

  }

  const login = async (data: LoginForm) => {
    try {
      const response = await api.post('/api/auth/login', data)
      if (response) {
        const { data: token } = response
        //guardar en el localStorage 
        localStorage.setItem('TOKEN_AUTH', token)
         // Actualizamos SWR inmediatamente (optimista)
        mutate("/api/user", user, false)
        // Mostramos un mensaje de éxito
        mutate("/api/user")
        return {
          success: true
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
        return {
          success: false
        }
      }
    }
  }

  const logout = () => {
    try {
      localStorage.removeItem('TOKEN_AUTH')
      // 2. Limpiar cache del usuario (sin revalidar aún)
      // Parametro 1 : la key 
      // Parametro 2 : el valor de la data que queremos poner (null)
      // Parametro 3 : opciones (revalidar o no) -> backend
      mutate("/api/user", null);
         // 3. Revalidar todo el caché activo (para limpiar todo)
      mutate(undefined);
      return {
        success: true
      }
    } catch (error) {

      return {
        success: false
      }

    }
  }

  return (
    <AuthContext value={{ register, login, user, getUser, isLoading, error, logout }}>{children}</AuthContext>
  )
}
