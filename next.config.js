const withImages = require('next-images');

module.exports = {    
    images: {
        domains: ['localhost'],
        loader: 'imgix',
        path: 'http://localhost:1337/',
    },
    withImages()
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