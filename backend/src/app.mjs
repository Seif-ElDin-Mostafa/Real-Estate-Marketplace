import express from "express"
import cors from "cors"
import startServer from "./helpers/startServer.mjs"
import propertyRouter from "./routes/property.router.mjs"
import authRouter from "./routes/auth.routes.mjs"
import transactionRouter from "./routes/transaction.router.mjs"
import { authenticate } from "./middleware/authenticate.middleware.mjs"
import { exceptionHandler } from "./middleware/exceptionHandler.middleware.mjs"

export const app = express();
startServer();

app.use(express.json());
app.use(cors());

app.use("/property", authenticate, propertyRouter);
app.use('/auth', authRouter);
app.use('/transaction', authenticate, transactionRouter);

app.use(exceptionHandler);

app.get('/', (req, res) => {
    res.send('Hello World!')
})