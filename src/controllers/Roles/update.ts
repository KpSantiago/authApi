import { Request, Response } from "express";
import { IRole, IUsuario } from "../../database/models";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import { validation } from "../../shared/middlewares/Validation";
const prisma = new PrismaClient();



interface IParamsProps {
    id?: number
}

interface IBodyProps extends Omit<IRole, 'id'> { }


export const AttRoles = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
}));


export const updateRoles = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

    try {
        const { id } = req.params;
        const { name } = req.body

        const updateRole = await prisma.user.update({
            where:
            {
                id: Number(id)
            }, data: {
                name
            }
        });

        return res.status(StatusCodes.OK).json({ msg: "Role atualizada com sucesso" })

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Configurações de Role não atualizadas" })
    }
}