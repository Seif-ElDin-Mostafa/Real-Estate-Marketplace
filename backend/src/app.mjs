import express from "express"
import cors from "cors"
import startServer from "./helpers/startServer.mjs"
import propertyRouter from "./routes/property.router.mjs"

export const app = express();
startServer();

app.use(express.json());
app.use(cors());

app.use("/property", propertyRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})