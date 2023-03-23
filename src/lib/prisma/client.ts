import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

//importiamo Prisma Cliente, ne creiamo un instanza e la esportiamo in app in modo da separare i processi