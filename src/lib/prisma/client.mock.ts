import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./client";

jest.mock("./client", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;


//COMMENTO:

//creiamo un file mock, un file che simula il comportamento di un oggetto, classe e nel nostro caso di un server, al fine di emularne il
//comportamento e utilizzarlo per fare testing in un ambiente controllato e riproducibile, e lo utiliziamo nel file test per eseguire i
//nostri test su questa copia e non sul vero database

//Questo codice è un codice mock standard preso da https://www.prisma.io/docs/guides/testing/unit-testing si chiama singleton

//Quello che dovremo fare noi sarà solo andare in jest.config.js e aggiungere clearMocks: true, che reset il mock dopo ogni test effettuato
//e setupFilesAferEnv: [.src/lib/prisma/client.mock.ts] che indica il file mock da eseguire