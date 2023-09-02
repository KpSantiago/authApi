import  { Router } from 'express'
import { UsuariosController } from '../controllers'
import { Validation } from '../shared/middlewares/JwtAuthValidation' 
import { RolesController } from '../controllers/Roles'
import { signUpValidation } from '../controllers/Usuarios/signUp'
import { signInValidation } from '../controllers/Usuarios/signIn'
import { ForgotPassword, RecoverMail } from '../controllers/Usuarios/RecoverPass'


const router = Router()

router.post('/cadastro', signUpValidation , UsuariosController.signUp)
router.post('/Login', signInValidation, UsuariosController.signIn)
router.post('/send-email', RecoverMail, UsuariosController.recoverMail)
router.put('/forgot-pass/:id', ForgotPassword, UsuariosController.updatePass)

router.post('/Role', RolesController.create )

export { router }