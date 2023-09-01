import  { Router } from 'express'
import { UsuariosController } from '../controllers'
import { Validation } from '../shared/middlewares/JwtAuthValidation' 
import { RolesController } from '../controllers/Roles'
import { signUpValidation } from '../controllers/Usuarios/signUp'


const router = Router()

router.post('/cadastro', signUpValidation , UsuariosController.signUp)
router.post('/Login', UsuariosController.signIn)


router.post('/Role', RolesController.create )

export { router }