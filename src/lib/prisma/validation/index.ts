import addFormats from "ajv-formats";
import { Validator, ValidationError } from "express-json-validator-middleware";
import { ErrorRequestHandler } from "express";

const validator = new Validator({});

addFormats(validator.ajv, ["date-time"])
    .addKeyword("kind")
    .addKeyword("modifier");

export const validate = validator.validate;

export const validationErrorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof ValidationError) {
        response.status(422).send({
            error: error.validationErrors
        });

        next();
    } else {
        next(error);
    }
};

export * from "./planet";

//COMMENTO:
//Questo codice definisce una serie di middleware per la validazione dei dati in ingresso alle richieste dei server, le middleware si basano
//sulla libreria "express-json-validator-middleware".

//La costante validator istanzia un oggetto Validator e gli viene fatto il metodo validate e viene poi assegnata alla costante validate che
//viene poi esportata in planets, in poche parole questa costante ha una middleware che esegue la validazione degli oggetti JSON utilizzando
//lo schema JSON specificato e restituisce un errore di validazione se lo schema non viene rispettato.

//La funzione addFormats viene utilizzata per aggiungere alcuni formati personalizzari al validatore AJV utilizzato da
//express-json-validator-middleware. In particolare, il formato date-time viene aggiunto al validatore e vengono aggiunti due keyword
//personalizzate chiamate kind e modifier.

//La costante validationErrorMiddleware definisce una middleware per gestire gli errori di validazione dei dati di ingresso alle richieste.
//Se viene generato un errore di validazione, il middleware restituisce una risposta con un codice di stato 422 e un corpo di risposta
//contente l'array degli errori di validazione. Se nessun errore viene generato, si passa al middleware successivo