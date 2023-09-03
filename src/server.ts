import express from 'express';
import { router } from './routes'
import './shared/service/Translation'
import cors from 'cors'
import 'dotenv/config'





const app = express();
app.use(express.json())
app.use(cors({
    origin: process.env.ENABLED_CORS?.split(';') || []
}));
app.use(router)

app.listen(3333, () => {
    console.log('listening on 3333')
})


export {app}