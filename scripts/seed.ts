const { PrismaClient } = require("@prisma/client")

const database =  new PrismaClient();

async function main() {
try {
    await database.category.createMany({
        data: [
            {name: "Computer Science" },
            {name: "Medicine and Healthcare" },
            {name: "Engineering" },
            {name: "Education" },
            {name: "Business and Management" },
            {name: "Psychology" },
            {name: "Music and Performing Arts" },
            {name: "Environmental Science" },
            {name: "Agriculture and Farming" },
            {name: "Architecture" },
            {name: "Fashion and Apparel" },
            
        ]
    });

} catch (error) {
    console.log("Error seeding the database categories", error);
} finally {
    await database.$disconnect();
}
}

main();