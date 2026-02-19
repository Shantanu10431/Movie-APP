const { PrismaClient } = require('@prisma/client');

console.log("Checking DATABASE_URL...", process.env.DATABASE_URL ? "Defined" : "UNDEFINED");

let prisma;

try {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: dbUrl,
                },
            },
        });
    } else {
        console.warn("DATABASE_URL is missing. Initializing Prisma with DUMMY url to prevent crash.");
        // We must provide A url to satisfy the schema validation, even if it's fake.
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: "postgresql://dummy:dummy@localhost:5432/dummy",
                },
            },
        });
    }
} catch (error) {
    console.error("Failed to initialize Prisma Client:", error);
    // Allow the app to start even if Prisma fails, so we can see debug logs
    prisma = new Proxy({}, {
        get: () => async () => { throw new Error("Prisma Client failed to initialize. Check server logs."); }
    });
}

module.exports = prisma;
