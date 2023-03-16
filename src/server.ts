// import express from "express";
// import "express-async-errors";

// const app = express();

// app.get("/", (request, response) => {
//     response.send("Up and running!");
// });

import app from "./app";

const port = 3000;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})

//commento perché ho diviso le due parti in due file, per avere tutto qui basta scommentare, togliere l'import e il server funziona lo stesso