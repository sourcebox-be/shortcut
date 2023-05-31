import { redirect, error } from "@sveltejs/kit";
import prisma from "$lib/prisma";

interface Params {
  params: {
    code: string;
  };
}

export async function load({ params: { code } }: Params) {
  const data = await prisma.shortcuts.findFirstOrThrow({
    where: {
      short_code: code,
    },
  });

  if (!data) throw error(404);

  throw redirect(301, data.url);
}
