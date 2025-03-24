import express from 'express';
import cors from 'cors';
const app = express();
const corsOptions = {
    origin:  ["http://localhost:5173"],

};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({fruits: ["apple", "orange", "banana"]})
});

const port = 8080

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
