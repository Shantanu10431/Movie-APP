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
        console.warn("DATABASE_URL is missing. Using HARDCODED fallback (Emergency Fix).");
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: "postgres://avnadmin:AVNS_6sb1c9Hege1FH6rY7kU@pg-25579498-movienova.d.aivencloud.com:22367/defaultdb?sslmode=require",
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
