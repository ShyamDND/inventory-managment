import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const demoUserId = 'dbdcfa7c-9a80-44b0-a376-3e881c3863cc'

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Demo Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  })

  console.log('Seeding completed.')
  console.log(`Created 25 demo products for user ${demoUserId}.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    prisma.$disconnect()
  })
