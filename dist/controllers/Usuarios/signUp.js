"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signUpValidation = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const bcrypt = __importStar(require("bcryptjs"));
const yup = __importStar(require("yup"));
const Validation_1 = require("../../shared/middlewares/Validation");
const prisma = new client_1.PrismaClient();
exports.signUpValidation = (0, Validation_1.validation)((getSchema) => ({
    body: getSchema(yup.object().shape({
        name: yup.string().required().min(3),
        password: yup.string().required().min(6),
        email: yup.string().required().email().min(5),
        cpf: yup.string().required().min(11).max(11)
    })),
}));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, cpf, roleId } = req.body;
    const userExist = yield prisma.user.findUnique({ where: { email } });
    if (userExist)
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            msg: "Email já registrado!"
        });
    try {
        const hashPassword = yield bcrypt.hash(password, 10);
        const userRole = roleId || 1;
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                cpf,
                roleId: userRole
            }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: "Usuario criado com sucesso",
            user
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            default: {
                error: {
                    msg: "Usuario não cadastrado, revise os campos e preencha corretamente."
                }
            }
        });
    }
});
exports.signUp = signUp;
//# sourceMappingURL=signUp.js.map