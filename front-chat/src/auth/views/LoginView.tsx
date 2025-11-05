import { useForm } from "react-hook-form"
import type { LoginForm } from "../../types/AuthTypes"
import { AuthContext } from "../../context/authContext/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router"

export const LoginView = () => {
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)!
  const initialState: LoginForm = {
    email: '',
    password: ''
  }

  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: initialState
  })

  const toSubmit = async(data : LoginForm) => {
     const res =  await login(data)
     if(res?.success){
        navigate('/chat')
     }
     return
  }

  return (
    <div className="flex flex-col  bg-gray-50  px-4 py-12 rounded-lg min-w-lg ">
      <h2 className="font-bold text-4xl text-center text-slate-800 " > Inicia Sesión</h2>

      <form className="mt-10  space-y-5 px-3" noValidate onSubmit={handleSubmit(toSubmit)}>

        {/* Email  */}
        <div className="grid grid-cols-1 space-y-3 ">
          <label htmlFor="email" className=" text-slate-500">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Ejm: jhondoe@gmail.com"
            className="bg-slate-200  p-3 rounded-lg placeholder-slate-400 outline-none"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {
            errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>
          }
        </div>

        {/* Password  */}
        <div className="grid grid-cols-1 space-y-3 ">
          <label htmlFor="password" className=" text-slate-500">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ejm: **********"
            className="bg-slate-200  p-3 rounded-lg placeholder-slate-400 outline-none"
            {...register('password', {
              required: 'El password es obligatorio'
            })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

        </div>

        <input
          type="submit"
          value="Iniciar Sesíon"
          className="bg-slate-700 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer hover:bg-slate-800 mt-5"
        />
      </form>
    </div>
  )
}
