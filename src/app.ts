import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

export default app;
