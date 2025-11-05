import { createContext } from "react";
import type { LoginForm, RegisterForm, userResponseType } from "../../types/AuthTypes";

type AuthContextType  = {
    register : ( data : RegisterForm  )=>Promise<{success:boolean}|undefined>
    login : ( data : LoginForm  )=>Promise<{success:boolean}|undefined>//Promise<void>//
    getUser : () => void 
    user : userResponseType | undefined
    error : any // averiguar
    isLoading : boolean
    logout : () => {success:boolean}
}

export const AuthContext  =  createContext<AuthContextType | null>(null)