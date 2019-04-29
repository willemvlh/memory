module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data:  `@import "@/style/main.scss";`
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/memory' : '/'
}