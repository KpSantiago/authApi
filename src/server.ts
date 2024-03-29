import express from 'express';
import { router } from './routes'
import './shared/service/Translation'
import cors from 'cors'
import 'dotenv/config'





const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});
app.use(router)

app.listen(3333, () => {
    console.log('listening on 3333')
})


export {app}