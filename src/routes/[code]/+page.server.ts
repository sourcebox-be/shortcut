import { redirect, error } from '@sveltejs/kit';
import {supabase} from "$lib/supabase-client";

export async function load({ params }) {
    console.log(params);
    const { data, err } = await supabase
        .from('shortcuts')
        .select('url')
        .eq('short_code', params.code)

    if (!data[0]) throw error(404);

    throw redirect(301, data[0].url);
}
