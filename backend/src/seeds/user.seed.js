import { prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  // ... other users
];

async function seed() {
  for (const user of seedUsers) {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        email: user.email,
        fullName: user.fullName,
        password: hashedPassword,
        profilePic: user.profilePic,
      },
    });
  }
  console.log("Database seeded successfully");
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
