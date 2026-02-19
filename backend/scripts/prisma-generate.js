const { execSync } = require('child_process');
const path = require('path');

try {
    // Resolve the prisma CLI entry point using Node's resolution algo
    // This handles hoisting in monorepos correctly.
    const prismaEntry = require.resolve('prisma/build/index.js');
    console.log(`Found Prisma CLI at: ${prismaEntry}`);

    // Execute it with node, inheriting stdio to see output
    execSync(`node "${prismaEntry}" generate`, { stdio: 'inherit' });
    console.log('Prisma Client generated successfully.');
} catch (error) {
    console.error('Failed to generate Prisma Client:', error);
    process.exit(1);
}
