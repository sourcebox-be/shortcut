import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "$lib/supabase-client";
import { SHORT_URL_DOMAIN } from "$env/static/private";
import Hashids from "hashids";

let shortcut: Shortcut = {
  url: null,
};

interface Response {
  success: boolean;
  error?: string | null;
  data?: {
    url: string | null;
  };
}

const server = `https://${SHORT_URL_DOMAIN}`;

const hashidsEncoder = new Hashids(Date.now().toString(), 2);

const generateShortCode = (): string => {
  return hashidsEncoder.encode(Date.now());
};

export const load: PageServerLoad<Shortcut> = (({ params }) => {
  return shortcut;
}) satisfies PageServerLoad<Shortcut>;

export const actions: Actions = {
  default: async ({ request }): Promise<Response> => {
    const formData = await request.formData();
    const url: string = formData.get("url")?.toString() ?? "";

    try {
      new URL(url);
    } catch (_) {
      return errorResponse("Invalid URL", url);
    }

    const shortCode = generateShortCode();

    const { data, error } = await supabase
      .from("shortcuts")
      .insert({ url: url, short_code: shortCode })
      .select();

    if (!data) {
      return errorResponse(error?.message);
    }

    shortcut.url = server + "/" + shortCode;

    return successResponse(url);
  },
};

const errorResponse = (error: string, url?: string | null): Response => {
  return {
    success: false,
    error: error,
    data: {
      url: url ?? null,
    },
  };
};

const successResponse = (url?: string | null): Response => {
  return {
    success: true,
    data: {
      url: url ?? null,
    },
  };
};
