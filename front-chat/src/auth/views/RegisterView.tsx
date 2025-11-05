import { useForm } from "react-hook-form"
import type { RegisterForm } from "../../types/AuthTypes"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext/AuthContext"
import { useNavigate } from "react-router"

export const RegisterView = () => {
  const navigate = useNavigate()
  const { register : authRegister} = useContext(AuthContext)!

  const initialState: RegisterForm = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const { register, formState: { errors }, watch, handleSubmit } = useForm({
    defaultValues: initialState
  })


  const toSubmit = async(data: RegisterForm) => {
    const resp  = await authRegister(data)!
    if(resp?.success){
      navigate('/auth/authenticate')
    }
    return
  }

  const password = watch("password")

  return (
    <div className="flex flex-col  bg-gray-50  px-4 py-12 rounded-lg min-w-lg ">
      <h2 className="font-bold text-4xl text-center text-slate-800 " > Crea tu cuenta </h2>
      <form className="mt-10  space-y-5 px-3" onSubmit={handleSubmit(toSubmit)} noValidate>

        {/* FullName */}
        <div className="grid grid-cols-1 space-y-3 ">
          <label htmlFor="fullname" className=" text-slate-500">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Jhon Doe Tristan"
            className="bg-slate-200  p-3 rounded-lg placeholder-slate-400 outline-none"
            {...register("fullname", { required: "El nombre completo es obligatorio" })}
          />
          {
            errors.fullname && <span className="text-red-500 text-sm">{errors.fullname.message}</span>
          }
        </div>


        {/* username */}
        <div className="grid grid-cols-1 space-y-3 ">
          <label htmlFor="username" className=" text-slate-500">UserName</label>
          <input
            type="text"
            id="username"
            placeholder="Jhon Doe Tristan"
            className="bg-slate-200  p-3 rounded-lg placeholder-slate-400 outline-none"
            {...register("username", { required: "El username es obligatorio" })}
          />
          {
            errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>
          }
        </div>

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
              required: 'El password es obligatorio',
              minLength: {
                value: 8,
                message: 'Password minimo de 8 caracteres'
              }
            })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

        </div>

        {/* Confirm Password  */}
        <div className="grid grid-cols-1 space-y-3 ">
          <label htmlFor="password_confirmation" className=" text-slate-500">Confirmar contraseña</label>
          <input
            type="password"
            id="password_confirmation"
            placeholder="Ejm: **********"
            className="bg-slate-200  p-3 rounded-lg placeholder-slate-400 outline-none"
            {...register('password_confirmation', {
              required: 'Repetir el password es obligatorio',
              validate: (value) => value === password || 'Los passwords no son iguales'
            })}
          />
          {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation.message}</span>}
        </div>


        <input
          type="submit"
          value="Registrarse"
          className="bg-slate-700 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer hover:bg-slate-800 mt-5"
        />
      </form>
    </div>
  )
}
