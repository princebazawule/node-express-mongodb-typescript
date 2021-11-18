import express, { Application, Request, Response }  from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import { connect } from './db/connect'
import itemsRoutes from './items/routes/items.routes'

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/items', itemsRoutes)

app.get('/status', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({message: 'hello world'})
})

connect()

export default app