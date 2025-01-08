// src/hooks.server.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
    target: 'http://localhost:3000', // Replace with your Node.js app's address and port
    changeOrigin: true, // Recommended for most cases
    // You might need to use these options if your backend isn't set up to handle /redirect
    pathRewrite: {
      '^/blog': '', // removes '/redirect' from the path that is forwarded to the backend
    }
});

export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith('/redirect')) {
    return new Promise((resolve) => {
      proxy(event.request, {
        setHeader: (header, value) => {
          resolve(new Response(header, {status:value.statusCode, headers: value.headers}));
        },
      }, resolve);
    });
  }

  //If not '/redirect' request, resolve as normal
  const response = await resolve(event);
  return response;
}