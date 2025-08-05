// async function main() {
//   const sports = [
//     'Cricket',
//     'Football',
//     'Badminton',
//     'Tennis',
//     'Basketball',
//     'Volleyball',
//     'Table Tennis',
//     'Hockey',
//     'Kabaddi',
//     'Swimming',
//   ];

//   await prisma.sport.createMany({
//     data: sports.map((name) => ({ name })),
//     skipDuplicates: true, // avoids duplicate insertions
//   });

//   console.log('✅ Sports seeded successfully!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import prisma from '../src/config/db';

async function main() {
  console.log('🌱 Seeding database...');

  // Example: add some sports
  await prisma.sport.createMany({
    data: [
      { name: 'Football' },
      { name: 'Cricket' },
      { name: 'Tennis' },
      { name: 'Badminton' },
      { name: 'BasketBall' },
      { name: 'VolleyBall' },
      { name: 'Swimming' },
      { name: 'Kabaddi' },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
