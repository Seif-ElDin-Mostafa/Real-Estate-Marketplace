import express from "express"
import passport from "passport"
import cors from "cors"
import startServer from "./helpers/startServer.mjs"
import propertyRouter from "./routes/property.router.mjs"
import authRouter from "./routes/auth.routes.mjs"

export const app = express();
startServer();

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use("/property", propertyRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})