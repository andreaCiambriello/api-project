import { Static, Type } from "@sinclair/typebox";

export const planetSchema = Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
    diameter: Type.Integer(),
    moons: Type.Integer(),
}, { additionalProperties: false});

export type PlanetData = Static<typeof planetSchema>;

//COMMENTO
//Questo codice definisce uno schema per la validazione dei dati dei record del database (i pianeti), utilizzando la libreria typeBox. Lo
//schema è definito in planetSchema che specifica i campi richiesti per un oggetto di tipo PlanetData, alcuni sono opzionali, altri obligatori
//Il tipo PlanetData viene generato a partire dallo schema planetSchema utilizzando la funzione Static di TypeBox.