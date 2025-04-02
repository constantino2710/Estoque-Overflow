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
app.use(express.json());

app.get("/produto", async (req, res) => {
    const produto = await bd.getProduto()
    res.send(produto)
});

app.post("/add",async (req, res) => {
    //TODO: checar se no front tem a opção de tipo quando for dar add
    const {nome, quantidade, tipo} = req.body;
    try{
        const result = await bd.insertProduto(nome, quantidade, tipo);
        console.log("Produto Inserido:", result);
    }catch(err){
        console.error("Erro ao inserir: ", err);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
    
});

//http:://localhost:PORT
const port = 8080 //http:://localhost:8080

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


