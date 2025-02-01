import PocketBase from 'pocketbase';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const pb = new PocketBase('https://database.alexradu.co');
    return {};
};