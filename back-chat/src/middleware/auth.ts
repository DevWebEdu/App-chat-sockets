import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../model/User'

// Extiende la interfaz Request para incluir 'user'
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    // 1. obtenemos el bearer 
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({ error: error.message })
        return
    }
    // 2. Separamos el token del bearer
    const [, token] = bearer.split(' ')

    if (!token) {
        const error = new Error('No Autorizado')
        res.status(401).json({ error: error.message })
        return
    }

    // validamos el jwt 
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id).select('-password  -__v')
            //console.log(user)
            if (!user) {
                const error = new Error('Usuario no existe')
                res.status(404).json({ error: error.message })
                return
            } else {
                // if ( user.socketid === "" ) {
                //      const error = new Error('Usuario ya esta conectado')
                //     res.status(404).json({ error: error.message })
                //     return
                // }
                req.user = user 
                next()
            }
           
        }
    } catch (error) {
        res.status(500).json({ error: 'Token no valido' })
    }
}