import express, { application } from 'express';
import config from './config'
import productsRouter from './routes/products.routes'

const app = express()

//settings
app.set('port', config.port)

//middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(productsRouter)

export default app


