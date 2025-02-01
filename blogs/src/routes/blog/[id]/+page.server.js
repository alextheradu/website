// export async function load( {params} ) {
//     let req = await fetch("http://127.0.0.1:8090/api/collections/blogs/records");

//     let res = await req.json();

//     // console.log(res.items)
//     console.log(res.items)

//     for(let blog of things) {
//         console.log(blog);


//         if(blog.id === params.id) return { blog: blog };

//         return { blog: {title: "fail", body: "fail"}}

//     }

// }


export async function load({ params }) {
    try {
      const req = await fetch("https://database.alexradu.co/api/collections/blogs/records");
      const res = await req.json();
  
      // Find the blog by ID
      const blog = res.items.find(item => item.id === params.id);
  
      if (blog) {
        return { blog }; // Return the found blog
      } else {
        return { blog: { title: "Not Found", body: "The requested blog was not found." } }; // Informative error message
      }
    } catch (error) {
      console.error("Error loading blog:", error);
      return { blog: { title: "Error", body: "An error occurred while loading the blog." } }; // Generic error handling
    }
  }