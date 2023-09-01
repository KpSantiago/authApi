import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient()


interface IRole {
   Role:string
}



export const create = async (req: Request<{}, {}, IRole>, res: Response) =>{
    const {Role}  = req.body;

    try {
    const roles = await  prisma.role.create({data:{
      Role
    }});
    return res.status(StatusCodes.OK).json({msg: "Role criada com sucesso"})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({msg: "Erro: Role não foi criada"})
    }



}