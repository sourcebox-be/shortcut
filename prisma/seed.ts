import { PrismaClient } from "@prisma/client";

const shortcuts = [
  {
    short_code: "svelte",
    url: "https://svelte.dev",
  },
  {
    short_code: "kit",
    url: "https://kit.svelte.dev",
  },
  {
    short_code: "supabase",
    url: "https://supabase.io",
  },
  {
    short_code: "prisma",
    url: "https://prisma.io",
  },
];

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const s of shortcuts) {
    const shortcut = await prisma.shortcuts.create({
      data: {
        url: s.url,
        short_code: s.short_code,
      },
    });
    console.log(`Created shortcut: ${s.short_code}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
