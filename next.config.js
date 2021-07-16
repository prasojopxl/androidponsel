// const withImages = require('next-images');


module.exports = {
    images: {
      domains: ['images.unsplash.com', 'localhost'],
    },
    // async redirects() {
    //   return [
    //     {
    //       source: '/',
    //       destination: '/home',
    //       permanent: true,
    //     },
    //   ]
    // },    
  }


// const withOptimizedImages = require('next-optimized-images')
// module.exports = withOptimizedImages({})

// const withImages = require('next-images')

// module.exports = {
//     reactStrictMode: false,
//     images: {
//         domains: ['localhost'],
//         loader: 'imgix',
//         path: 'http://localhost:1337/',
//     },
// }

// module.exports = withImages()