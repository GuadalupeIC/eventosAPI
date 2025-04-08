import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import eventRoutes from './routes/event.routes.js';
import helmet from "helmet";

const app = express();

app.use(express.json());

app.use(
    helmet({
        referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    })
);

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());

app.use("/api", eventRoutes);

export default app;
