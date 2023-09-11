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
exports.updateRoles = exports.AttRoles = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const Validation_1 = require("../../shared/middlewares/Validation");
const prisma = new client_1.PrismaClient();
exports.AttRoles = (0, Validation_1.validation)((getSchema) => ({
    body: getSchema(yup.object().shape({
        name: yup.string().required().min(3),
    })),
}));
const updateRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateRole = yield prisma.user.update({
            where: {
                id: Number(id)
            }, data: {
                name
            }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Role atualizada com sucesso" });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: "Configurações de Role não atualizadas" });
    }
});
exports.updateRoles = updateRoles;
//# sourceMappingURL=update.js.map