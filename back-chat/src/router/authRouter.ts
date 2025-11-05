import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

export const authRouter = Router()

authRouter.post('/create-account',
    body('fullname').notEmpty().withMessage('Es obligatorio el nombre completo'),
    body('username').notEmpty().withMessage('Es obligatorio el username'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe ser minimo de 8 caracteres'),
    body('email').isEmail().withMessage('Debe tener el formato de un correo'),
    handleInputErrors,
    AuthController.createUser)

authRouter.post('/login',
    body('password').notEmpty().withMessage('La contraseña debe ser minimo de 8 caracteres'),
    body('email').isEmail().withMessage('Debe tener el formato de un correo'),
    handleInputErrors,
    AuthController.loginUser
)

authRouter.get('/user',
    authenticate,
    AuthController.getUser
)