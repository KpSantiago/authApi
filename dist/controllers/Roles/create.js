"use strict";
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
exports.create = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Role } = req.body;
    try {
        const roles = yield prisma.role.create({ data: {
                Role
            } });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Role criada com sucesso" });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: "Erro: Role não foi criada" });
    }
});
exports.create = create;
//# sourceMappingURL=create.js.map