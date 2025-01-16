import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
/** @type {import('./$types').RequestHandler} */
export async function POST({url}) {
    const pb = new PocketBase('https://database.alexradu.co');
    const record = await pb.collection('live_view').getOne('y844g331abe2ugy');
    const updatedData = {
        bool: !record.bool
    };
    await pb.collection('live_view').update('y844g331abe2ugy', updatedData);
    return json("");
};