const { PrismaClient } = require('@prisma/client');

console.log("Checking DATABASE_URL...", process.env.DATABASE_URL ? "Defined" : "UNDEFINED");

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

module.exports = prisma;
