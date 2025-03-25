import express from 'express';
import cors from 'cors';
//importa as funcoes do database.js
import * as bd from '../Model/database.js';

const app = express();
const corsOptions = {
    origin:  ["http://localhost:5173"],

};
//error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Alguma coisa quebrou!')
})

app.use(cors(corsOptions));

app.get("/produto", async (req, res) => {
    const produto = await bd.getProduto()
    res.send(produto)
});

//http:://localhost:PORT
const port = 8080 //http:://localhost:8080

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
