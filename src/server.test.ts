import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 1234,
                moons: 12,
                createdAt: "2023-03-21T09:28:42.790Z",
                updatedAt: "2023-03-21T09:29:20.208Z",
            },
            {
                id: 2,
                name: "Venus",
                description: null,
                diameter: 5678,
                moons: 2,
                createdAt: "2023-03-21T09:29:20.208Z",
                updatedAt: "2023-03-21T09:29:01.280Z",
            },
        ];

        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });
});

describe("POST /planets", () => {
    test("Valid request", async () => {
        const planet = {
            name: "Mercury",
            diameter: 1234,
            moons: 12,
        };

        // @ts-ignore
        prismaMock.planet.create.mockResolvedValue(planet);

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planet);
    });

    test("Invalid request", async () => {
        const planet = {
            diameter: 1234,
            moons: 12,
        };

        const response = await request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });
})

//COMMENTO:

//importiamo supertest e app

//importiamo prismaMock che contiene il file mock che simula il database e le sue query su cui effettuare i test

//supertest

//Il metodo describe consente di wrappare più test sulla stessa richiesta GET e sullo stesso route /planets

//Il metodo test da il via al test di nome Valid request per convenzione, avvia una middleware asincrona. Dentro la middleware c'è un array
//di oggetti contenente le informazioni da testare. Viene impostato il mock del Prisma Client utilizzando il metodo mockResolvedValue che
//restituisce la lista di pianeti quando viene chiamato il metodo findMany. Il findMany viene quindi eseguito sul mock

//Viene poi inviata un richiesta GET alla route /planets utilizzando request.get, verifichiamo che la risposta abbia status code 200 e che
//il contenuto sia di tipo JSON. Infine si verifica che il corpo della risposta sia uguale all'array di oggetti planets

//Il secondo metodo describe funziona come il primo, solo che qui wrappa i test che vengono eseguiti sulle richieste POST della route /planets.

//Il primo test prende il nome di valid request per convenzione, ed esegue il test di una richiesta valida. Ha una middleware asincrona con
//l'oggetto di cui vogliamo simulare l'invio.
//Il test utilizza prismaMock per simulare il comportamento del database, usa il metodo create per crea un nuovo record che poi passiamo a
//mockResolvedValue.
//Il test invia la richiesta POST al server nel route /planets, verifica che sia stato inviato l'oggetto corretto, verifica che il codice di
//stato sia 201 (creato con successo) e che il tipo di contenuto della risposta sia JSON, infine verifica che il corpo della risposta sia
//uguale all'oggetto inviato col toEqual, che corrisponde anche a send

//Il secondo test prende il nome di invalid request per convenzione ed esegue il test di una richiesta non valida, in questo caso manca la
//proprietà name nell'oggetto che mandiamo che è obbligatoria, definito in planet.ts ....
//Il test ha una middleware asincrona, l'oggetto non valido che manda, poi invia la richiesta POST al server nel route /planets, verifica che
//sia stato inviato l'oggetto corretto, verifica che il codice sia stato 422 (non processabile) e che il  tipo di contenuto della risposta sia
//JSON, infine verifica che il corpo della risposta contenga un oggetto error con un array di errori relativi al corpo della richiesta.
//Più in dettaglio, l'oggetto passato alla funzione toEqual ha una proprietà "errors", che è un oggetto che a sua volta ha una proprietà
//"body". La proprietà "body" viene verificata utilizzando la funzione expect.any(Array), che verifica che "body" sia un array. In altre
//parole, il test si aspetta che la risposta del server contenga un oggetto "errors" con almeno un errore relativo al corpo della richiesta.
//Se la risposta non soddisfa questa aspettativa, il test fallirà.