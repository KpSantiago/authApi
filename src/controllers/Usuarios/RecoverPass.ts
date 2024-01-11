import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();

interface IParamProps {
	id?: number;
}

interface IBodyProps
	extends Omit<IUsuario, "id" | "name" | "roleId" | "cpf" | "password"> { }

export const RecoverMail = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			email: yup.string().required().email().min(5),
		})
	),
}));

interface IPasscover {
	password: string;
}

export const ForgotPassword = validation((getSchema) => ({
	body: getSchema<IPasscover>(
		yup.object().shape({
			password: yup.string().required().min(6),
		})
	),
}));

export const recoverMail = async (
	req: Request<IParamProps, {}, IBodyProps>,
	res: Response
) => {
	try {
		const { email } = req.body;
		const usuario = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!usuario)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: { default: "email não encontrado" } });

		const transporter = nodemailer.createTransport({
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
			.status(StatusCodes.OK)
			.json({ message: "Email de verificação enviado!" });
	} catch (error) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: "Erro no envio do email" });
	}
};

export const updatePass = async (
	req: Request<IParamProps, {}, IPasscover>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { password } = req.body;

		const hashPassword = await bcrypt.hash(password, 10);

		const updatePass = await prisma.user.update({
			where: {
				id: Number(id),
			},
			data: {
				password: hashPassword,
			},
		});

		return res
			.status(StatusCodes.OK)
			.json({ msg: "Senha atualizada com sucesso" });
	} catch (error) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Erro na mudaça de senha" });
	}
};
