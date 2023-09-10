import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();








export const GetAll: RequestHandler = async (req, res) =>{
    try {
       const response = await prisma.user.findMany({
        include:{
            Roles: {
                select:{
                    Role: true,
                
                }
            }
        } 
      });
        return res.status(StatusCodes.OK).json(response)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.NOT_FOUND).json({msg: "Erro na busca de Usuarios"})
    }
}
