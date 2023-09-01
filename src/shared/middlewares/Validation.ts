import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError} from "yup";
    
type TProperty =  'body' | 'header' | 'params' | 'query'

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TALLSchemas = Record<TProperty,ObjectSchema<any>>;

type GetAllSchemas = (getSchema: TGetSchema) => Partial<TALLSchemas>;

type TValidation = ( getAllSchemas: GetAllSchemas ) => RequestHandler

export const validation: TValidation = (getAllSchemas) => async (req,res,next) =>{

const schemas = getAllSchemas(schema => schema);

  const validationErrosResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach( ([key, schema]) =>{
    try {
      schema.validateSync(req[key as TProperty], {abortEarly: false});
     
  } catch (error) {
      const yupError = error as ValidationError;
      const validationErros: Record<string, string> = {};
  
  
    yupError.inner.forEach(error =>{
     if(!error.path) return  
      validationErros[error.path] = error.message
    })
  
    validationErrosResult[key] = validationErros;
  
  }
  })

  if (Object.entries(validationErrosResult).length === 0 ) {
    return next();
  }else{
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrosResult })
  }
        
};