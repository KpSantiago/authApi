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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt = __importStar(require("jsonwebtoken"));
const Validation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ default: {
                error: {
                    msg: "Não autenticado"
                }
            } });
    const [, token] = authorization.split(' ');
    if (!token)
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Não autenticado" } } });
    try {
        const data = jwt.verify(token, 'secret');
        const { id } = data;
        req.userId = id;
        return next();
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ default: { error: { msg: "Token invalido" } } });
    }
};
exports.Validation = Validation;
//# sourceMappingURL=JwtAuthValidation.js.map