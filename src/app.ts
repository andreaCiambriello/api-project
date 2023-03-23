import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";
import { validate, validationErrorMiddleware, planetSchema, PlanetData } from "./lib/prisma/validation";

const app = express();

app.use(express.json());

app.get("/planets", async (request, response) => {

    const planets = await prisma.planet.findMany();

    response.json(planets);
});

app.post("/planets", validate({ body: planetSchema }), async (request, response) => {         //valida
    const planetData: PlanetData = request.body;                                              //e salva

    const planet = await prisma.planet.create({                                               //il nuovo
        data: planetData
    });

    response.status(201).json(planet);                                                        //dato nel natabase
});

app.use(validationErrorMiddleware);

export default app;

//COMMENTO DEL FILE:
//importiamo express e express-async-errors per creare un server express correttamente

//importiamo prisma, che altro non è che un'instanza di Prisma Client creata in un altro file e importata qui

//creiamo il server express e lo assegnamo alla variabile app

//app.use serve ad aggiungere una funzione middleware, una funzione che viene eseguita tra il momento in cui il server riceve una richiesta
//HTTP e il momento in cui restituisce un risposta, all'applicazione Express. express.json() consente di analizzare i dati in formato JSON e
//di convertirli in oggetto Javascript
//Quindi nel nostro caso app.use(express.json()) serve a configurare l'applicazione express per analizzare i dati della richiesta HTTP come
//oggetti JSON

//app.get serve a definire una route HTTP per le richieste GET, quando un client invia una richiesta HTTP GET al server, il server risponde
//tramite il metodo app.get
//nel nostro caso quando un client fa una richiesta HTTP GET al route /planets, il server fa partire la middleware asincrona che tramite
//Prisma Client, importato nel nome di prisma, effettua una query al database per recuperare l'elenco (findMany) dei pianeti (dati) presenti
//nel database. Una volta finita la query al database, la risposa è inviata in formato JSON (response.json(planets);)

//app.post serve a definire una route HTTP per le richieste POST, quando un client invia una richiesta HTTP POST al server, il server risponde
//tramite il metodo app.post
//Nel nostro caso quando il client fa una richiesta HTTP POST al route /planets, il server esegue la middleware validate per validare il corpo
//della richiesta POST utilizzando uno schema definito (planetSchema), poi fa partire la middleware asincrona che elabora il corpo della
//richiesta e restituisce una risposta, in questo caso prende il corpo della richiesta POST (request.body) e lo salva in planetData. Poi
//viene utilizzato Prisma Client per creare un nuovo record nel database con i dati dei planetData utilizzando il metodo prisma.planet.create
//Infine viene restituita una risposta al client con codice 201 Created e il corpo della risposta in formato JSON contenente l'ogetto planet
//appena salvato nel database

//app.use(validationErrorMiddleware) è una middleware che viene eseguita per tutte le richieste di ingresso e di uscita dal server, per
//gestire eventuali errori di validazione dei dati durante le richieste (vedere il file che le contiene)