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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePass = exports.recoverMail = exports.ForgotPassword = exports.RecoverMail = void 0;
const Validation_1 = require("../../shared/middlewares/Validation");
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
exports.RecoverMail = (0, Validation_1.validation)((getSchema) => ({
    body: getSchema(yup.object().shape({
        email: yup.string().required().email().min(5),
    })),
}));
exports.ForgotPassword = (0, Validation_1.validation)((getSchema) => ({
    body: getSchema(yup.object().shape({
        password: yup.string().required().min(6),
    })),
}));
const recoverMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const usuario = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!usuario)
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: { default: "email não encontrado" } });
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "teste66312@gmail.com",
                pass: "pjhbedwchjayjkar",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        transporter.sendMail({
            from: "administrador <teste212133@gmail.com>",
            to: [email],
            subject: "Recuperação de Senha para login.",
            html: `
      <body>
      <div> 
      <div style="font-family: Arial; text-align: center; width: fit-content;">
      <svg width="184" height="74" viewBox="0 0 184 74" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="184" height="74" fill="url(#pattern0)"/>
        <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_25_35" transform="matrix(0.00273588 0 0 0.00680272 0.0184857 0)"/>
        </pattern>
        <image id="image0_25_35" width="352" height="147" xlink:href="data:image/png;base64,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"/>
        </defs>
      </svg>      
        <p style="font-weight: 400;border-bottom: 1px solid #295e59; width: fit-content;">Olá! Este é o e-mail enviado para você para a criação de uma nova senha.<p>
          <p>
        <a style="
        font-weight: 400;
          background-color: #295e59;
          text-decoration: none;
          color: #fff;
          width: fit-content;
          height: fit-content;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 14px;" href="https://auth-project-9ddj.onrender.com/new/${usuario.id}">Clique aqui!</a>
        </p>
        </div>
        </div>
      </body>
      `,
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: "Email de verificação enviado!" });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ message: "Erro no envio do email" });
    }
});
exports.recoverMail = recoverMail;
const updatePass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const hashPassword = yield bcrypt.hash(password, 10);
        const updatePass = yield prisma.user.update({
            where: {
                id,
            },
            data: {
                password: hashPassword,
            },
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ msg: "Senha atualizada com sucesso" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ msg: "Erro na mudaça de senha" });
    }
});
exports.updatePass = updatePass;
//# sourceMappingURL=RecoverPass.js.map