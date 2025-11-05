import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User'
import { hashPassword, verifyPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export class AuthController {

    // crear un usuario - register
    static createUser = async (req: Request, res: Response) => {
        //const { fullname , name , email , password } = req.body
        const { username, email, password } = req.body
        // 1. validar correo: que el correo no exista registrado, ni tampoco el username
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            const error = new Error('El correo ya ha sido tomado')
            res.status(409).json({ error: error.message })
            return
        }

        const usernameExists = await User.findOne({ username })
        if (usernameExists) {
            const error = new Error('El username ya ha sido tomado')
            res.status(409).json({ error: error.message })
            return
        }
        // 2 . creamos el usuario luego de la validacion
        const user = new User(req.body)

        // 3. Hashear la contraseña 
        user.password = await hashPassword(password)
        // 4.  Guardamos al usuario
        user.save()

        // 5. Enviamos el token
        res.json('User creado')
    }

    // loguear a un usuario 
    static loginUser = async (req: Request, res: Response) => {
        // 1. obtenemos el correo y password ingresados
        const { email, password } = req.body
        // 2. validamos que el email exista
        const user = await User.findOne({ email })
        console.log(password)
        if(!user) {
             const error = new Error('Correo no existe, por favor registrate.')
            res.status(401).json({ error: error.message })
            return
        }
        // 3. validamos le password con el del usuario en la bd

        const verifyPass = await verifyPassword(password, user.password)
        if (!verifyPass) {
            const error = new Error('Datos Incorrectos')
            res.status(401).json({ error: error.message })
            return
        }

        user.status = 'online'
        user.save()

        // 4. Si todo es correcto entregamos el token
        const token = generateJWT({ id: user._id })
        res.json(token)

    }

    // obtener el usuario logueado 
    static getUser = async (req: Request, res: Response) => {
        res.json(req.user)
    }
}