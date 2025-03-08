import express from "express"
import cors from "cors"
import startServer from "./helpers/startServer.mjs"

export const app = express();
startServer();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})