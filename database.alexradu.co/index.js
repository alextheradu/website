document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Authenticate admin credentials
        const authResponse = await fetch("http://database.alexradu.co/api/admins/auth-with-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!authResponse.ok) {
            throw new Error("Invalid credentials! Please check your email or password.");
        }

        const authData = await authResponse.json();
        const adminToken = authData.token;

        alert("Login successful!");

        // Show the blog post form
        document.getElementById("blogForm").style.display = "block";

        // Store the admin token (you can use it to create posts later)
        sessionStorage.setItem("adminToken", adminToken);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

document.getElementById("blogForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const date = document.getElementById("date").value;
    const adminToken = sessionStorage.getItem("adminToken");

    if (!adminToken) {
        alert("You must log in first.");
        return;
    }

    try {
        // Create the blog post using the admin token
        const postResponse = await fetch("http://database.alexradu.co/api/collections/posts/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({ title, body, date }),
        });

        if (!postResponse.ok) {
            throw new Error("Failed to create blog post!");
        }

        const postData = await postResponse.json();
        alert("Blog post created successfully!");

        // Clear the form
        document.getElementById("blogForm").reset();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});
