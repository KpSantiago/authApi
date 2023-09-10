import * as recover from './RecoverPass'
import * as signUp from './signUp'
import * as signIn from './signIn'
import * as GetAll from './GetAll'
import * as updateUsuarios from './UpdateUsers'
export const UsuariosController = {
    ...signUp,
    ...signIn,
    ...recover,
    ...GetAll,
    ...updateUsuarios
}