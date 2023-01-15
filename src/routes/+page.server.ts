import type { PageServerLoad, Actions } from "../../.svelte-kit/types/src/routes/$types";
import {supabase} from "$lib/supabase-client";
import {SHORT_URL_DOMAIN} from "$env/static/private";
import Hashids from "hashids";

let short_code: string | null;
let shortcut: Shortcut = {
    url: null
};

interface Response {
    success: string | null,
    error?: string | null,
    data?: {
        url: string | null,
    }
}

const server = 'https://' + SHORT_URL_DOMAIN;

export const load: PageServerLoad<Shortcut> = (({ params }) => {
    return shortcut;
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async<Response> ({request}) => {
        const formData = await request.formData();
        const url = formData.get('url');


        try {
            new URL(url);
        } catch (_) {
            return {
                success: false,
                error: "Invalid URL",
                data: {
                    url: url
                }
            }
        }

        let hashIds = new Hashids(Date.now().toString(), 2)
        short_code = hashIds.encode(Date.now());

        const { data, error } = await supabase
            .from('shortcuts')
            .insert({ url: formData.get('url'), short_code:  short_code})
            .select()

        if (data) {
            shortcut.url = server + '/' + short_code;

            return {
                success: true,
                data: {
                    url: formData.get('url')
                }
            };
        }

        return {
            success: false,
            error: error?.message
        }
    }
};
