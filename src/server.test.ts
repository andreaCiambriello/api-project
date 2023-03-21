// test("test", () => {

//  expect(true).toBe(true);
// });

//commento per non cancellare il vecchio, per ripasso, questo era un semplice test di server quando era un unico file

import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2023-03-21T09:29:20.208Z",
            updatedAt: "2023-03-21T09:29:01.280Z",
        },
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2023-03-21T09:28:42.790Z",
            updatedAt: "2023-03-21T09:29:20.208Z",
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
