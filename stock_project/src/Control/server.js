import express from 'express';
import cors from 'cors';
//importa as funcoes do database.js
import {} from './database.js'

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

app.get("/api", (req, res) => {
    res.json({fruits: ["apple", "orange", "banana"]})
});

//http:://localhost:PORT
const port = 8080 //http:://localhost:8080

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
