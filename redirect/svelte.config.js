import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter({
      // Configure adapter options here (if necessary)
      pages: 'build', // Set the output folder for static assets
      assets: 'build',
      fallback: 'index.html',
    }),
  },
};
