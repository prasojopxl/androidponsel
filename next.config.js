const withOptimizedImages = require('next-optimized-images')

module.exports = {
    images: {
        domains: ['http://stagingaja.com:1337'],
        loader: 'imgix',
        path: 'http://stagingaja.com:1337/',
    },
}



