const { PrismaClient } = require("@prisma/client")

const database =  new PrismaClient();

async function main() {
try {
    await database.category.createMany({
        data: [
            {name: "Arts" },
            {name: "Science" },
            {name: "Commerce" },                
        ]
    });

} catch (error) {
    console.log("Error seeding the database categories", error);
} finally {
    await database.$disconnect();
}
}

main();