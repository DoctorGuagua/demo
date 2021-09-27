module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/prod_env.js')
        })
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/dev_env.js')
        })
    }
}