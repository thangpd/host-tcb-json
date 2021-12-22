module.exports = {
    apps: [{
        name: "app",
        script: "node ./app.js",
        instances: "max",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            PORT: 80,
            NODE_ENV: "production",
        }
    }]
}