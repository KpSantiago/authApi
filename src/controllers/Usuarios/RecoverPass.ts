import { Request, Response } from "express";
import { IUsuario } from "../../database/models";
import { validation } from "../../shared/middlewares/Validation";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer'
import * as crypto from 'crypto'
import * as bcrypt from 'bcryptjs'
const prisma = new PrismaClient()


interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IUsuario, 'id' |  'name' | 'roleId' | 'cpf' | 'password'> {}

export const RecoverMail = validation((getSchema) =>({

  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().min(5)
  })),
 
}));

interface IPasscover {
  password: string;
 
}

export const ForgotPassword = validation((getSchema) =>({

  body: getSchema< IPasscover>(yup.object().shape({
    password: yup.string().required().min(6)
  }))
 
}));



export const recoverMail = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) =>{

  try {
    const { email } = req.body
    const usuario = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!usuario) return res.status(StatusCodes.BAD_REQUEST).json({error:{default: 'email não encontrado'}})
 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
          user: "teste212133@gmail.com",
          pass: "teste1234567"
        }
    })

    transporter.sendMail({
        from: 'administrador <teste212133@gmail.com>' ,
        to: ['kayyogui87@gmail.com'],
        subject: 'Recuperação de Senha para login.',
        html: `<p>Olá, sua nova senha para acessar nosso site é <p>`
    })

    return res.status(StatusCodes.OK).json({message: "Email de verificação enviado!"})

    
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({message: "Erro no envio do email"})
  }
    

}


export const updatePass = async (req: Request<IParamProps, {}, IPasscover>, res: Response) =>{


try {
  const { id } = req.params;
const { password } = req.body

const hashPassword = await bcrypt.hash(password, 10)

  const updatePass = await prisma.user.update({
    where:
    {
      id
    }, data: {
    password: hashPassword
  }});

  return res.status(StatusCodes.OK).json({msg: "Senha atualizada com sucesso"})

} catch (error) {
  console.log(error)
  return res.status(StatusCodes.BAD_REQUEST).json({msg: "Erro na mudaça de senha" })
}
}