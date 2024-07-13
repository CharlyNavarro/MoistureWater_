import { Server } from 'azle';
import express from "express";

export default Server(() => {
    const app = express();
    app.use(express.json());

    app.post('/', (req, res) => {
        var infoCompuesta =res.json(req.body);
    });



    return app.listen();
})