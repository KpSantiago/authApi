import * as recover from "./RecoverPass";
import * as signUp from "./signUp";
import * as signIn from "./signIn";

export const UsuariosController = {
	...signUp,
	...signIn,
	...recover,
};
