export async function load({ params }) {
    try {
        let req = await fetch("https://database.alexradu.co/api/collections/blogs/records");
        if (!req.ok) {
            throw new Error(`Network response was not ok: ${req.statusText}`);
        }
        let res = await req.json();
        return { blogs: res.items };
    } catch (error) {
        console.error('Fetch error:', error.message);
        console.error('Error details:', error);
        return { blogs: [] };
    }
}