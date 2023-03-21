// // test("test", () => {

// //  expect(true).toBe(true);
// // });

// //commento per non cancellare il vecchio, per ripasso, questo era un semplice test di server quando era un unico file

// import supertest from "supertest";
// import app from "./apptempo";

// const request = supertest(app);

// test("GET /planets", async() => {
//     const response = await request
//         .get("/planets")
//         .expect(200)
//         .expect("Content-Type", /application\/json/);

//     expect(response.body).toEqual([
//         { name: "Mercury" },
//         { name: "Venus" }
//     ]);
// });