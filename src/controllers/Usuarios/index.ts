
import * as signUp from './signUp'
import * as signIn from './signIn'

export const UsuariosController = {
    ...signUp,
    ...signIn
}