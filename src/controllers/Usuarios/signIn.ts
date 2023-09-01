import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { IUsuario } from "../../database/models";
import { validation } from '../../shared/middlewares/Validation';
import * as yup from 'yup'
const prisma = new PrismaClient()



interface IBodyProps extends Omit<IUsuario, 'id' | 'name' | 'cpf' | 'roleId'> {}







export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    })),
  }));



export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) =>{
    const {email, password} = req.body
  
  try {
    const user: { id: number; email: string; name: string; password: string } | null   = await prisma.user.findFirst({ where: { email } });

    if(!user) return res.status(StatusCodes.UNAUTHORIZED).json({
        default:{
            error:{
                msg: "Usuario não encontrado"
            }
        }
    });

    const verifyPass = await bcrypt.compare(password, user.password)

    if(!verifyPass) return res.status(StatusCodes.UNAUTHORIZED).json({
        default:{
            error:{
                msg: "Email ou senha incorretos"
            }
        }
    });
     
   const token =  jwt.sign({id: user.id}, 'secret', {
        expiresIn: "24h"
    } )

    return res.status(StatusCodes.OK).json({
       msg: "Logado com sucesso",
       acessToken: token

    })
    
  } catch (error) {
  console.log(error)
    return res.status(StatusCodes.UNAUTHORIZED).json({
        default:{
            error:{
                msg: "Email ou senha incorretos"
            }
        }
    })
  }


}