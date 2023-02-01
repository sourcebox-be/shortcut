import { redirect, error } from "@sveltejs/kit";
import { supabase } from "$lib/supabase-client";

interface Params {
  params: {
    code: string;
  };
}

export async function load({ params: { code } }: Params) {
  const { data } = await supabase
    .from("shortcuts")
    .select("url")
    .eq("short_code", code);

  if (!data || !data[0]) throw error(404);

  throw redirect(301, data[0].url);
}
