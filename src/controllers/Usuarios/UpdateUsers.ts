import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import { validation } from "../../shared/middlewares/Validation";
const prisma = new PrismaClient();

interface IParamProps {
	id: number;
}

interface IBodyProps extends Omit<IUsuario, "id" | "cpf" | "password"> {}

export const AttUsers = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			name: yup.string().required().min(3),
			email: yup.string().required().email().min(5),
			roleId: yup.number().required(),
		})
	),
}));

export const update = async (
	req: Request<IParamProps, {}, IBodyProps>,
	res: Response
) => {
	try {
		const { id } = req.params;
		const { name, email, roleId } = req.body;

		const updateUsers = await prisma.user.update({
			where: {
				id: Number(id),
			},
			data: {
				name,
				email,
				roleId,
			},
		});

		return res
			.status(StatusCodes.OK)
			.json({ msg: "Usuario atualizado com sucesso" });
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Configurações de Usuario não atualizadas" });
	}
};
