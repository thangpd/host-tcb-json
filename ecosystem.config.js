module.exports = {
    apps: [{
        name: "app",
        script: "node ./app.js",
        instances: "max",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}