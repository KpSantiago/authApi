import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer'
import * as crypto from 'crypto'
const prisma = new PrismaClient()


interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUsuario, 'id' |  'name' | 'roleId' | 'cpf'> {}

export const getUpdateValidation = validation((getSchema) =>({

  body: getSchema<IBodyProps>(yup.object().shape({
    password: yup.string().required().min(6),
    email: yup.string().required().email().min(5)
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().moreThan(0).integer(),
  })),
}));





export const recoverPass = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) =>{

  try {
    const { email } = req.body
    const { id } = req.params
    const usuario = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!usuario) return res.status(StatusCodes.BAD_REQUEST).json({error:{default: 'email não encontrado'}})
 
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a418eb509b5417",
          pass: "********63b1"
        }
    })

    

    transporter.sendMail({
        from: 'administrador <5cf2818663-9741e8@inbox.mailtrap.io>' ,
        to: email,
        subject: 'Recuperação de Senha para login.',
        html: `<p>Olá, sua nova senha para acessar nosso site é <p>`
    })
    
  } catch (error) {
    
  }



}