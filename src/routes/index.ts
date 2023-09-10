import { Router } from "express";
import { UsuariosController } from "../controllers";
import { Validation } from "../shared/middlewares/JwtAuthValidation";
import { RolesController } from "../controllers/Roles";
import { signUpValidation } from "../controllers/Usuarios/signUp";
import { signInValidation } from "../controllers/Usuarios/signIn";
import {
	ForgotPassword,
	RecoverMail,
} from "../controllers/Usuarios/RecoverPass";
import { AttUsers } from "../controllers/Usuarios/UpdateUsers";
import { AttRoles } from "../controllers/Roles/update";

const router = Router();

router.post("/cadastro", signUpValidation, UsuariosController.signUp);
router.post("/Login", signInValidation, UsuariosController.signIn);
router.post("/send-email", RecoverMail, UsuariosController.recoverMail);
router.put("/forgot-pass/:id", ForgotPassword, UsuariosController.updatePass);
router.get("/Usuarios", Validation, UsuariosController.GetAll);
router.put("/attUsers/:id", Validation, AttUsers, UsuariosController.update);

router.post("/Roles", RolesController.create);
router.put("/Roles/:id", Validation, AttRoles, RolesController.updateRoles);

export { router };
