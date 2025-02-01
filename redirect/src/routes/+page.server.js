export async function load({ params }) {
    try {
        let req = await fetch("https://database.alexradu.co/api/collections/redirect/records");
        if (!req.ok) {
            throw new Error(`Network response was not ok: ${req.statusText}`);
        }
        let res = await req.json();
        return { redirections: res.items };
    } catch (error) {
        console.error('Fetch error:', error.message);
        console.error('Error details:', error);
        return { redirections: [] };
    }
}