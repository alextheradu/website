import PocketBase from 'pocketbase';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const pb = new PocketBase('https://database.alexradu.co');
    const record = await pb.collection('live_view').getOne('y844g331abe2ugy');
    return {
        data: {
            bool: record.bool
        }
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    toggleBool: async ({ request }) => {
        const pb = new PocketBase('https://database.alexradu.co');
        const record = await pb.collection('live_view').getOne('y844g331abe2ugy');
        const updatedData = {
            bool: !record.bool
        };
        await pb.collection('live_view').update('y844g331abe2ugy', updatedData);
        return json({ success: true, newBool: updatedData.bool });
    }
};
