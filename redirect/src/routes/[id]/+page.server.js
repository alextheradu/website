export async function load({ params }) {
    try {
      const req = await fetch("https://database.alexradu.co/api/collections/redirect/records");
      const res = await req.json();
  
      // Find the blog by ID
      const redirect = res.items.find(item => item.id === params.id);
  
      if (redirect) {
        return { redirect }; // Return the found blog
      } else {
        return { redirect: { id: "Not Found", url: "The requested blog was not found." } }; // Informative error message
      }
    } catch (error) {
      console.error("Error loading blog:", error);
      return { redirect: { id: "Error", url: "An error occurred while loading the blog." } }; // Generic error handling
    }
  }