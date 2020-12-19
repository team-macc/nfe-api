export const environment = {
    server: {port: process.env.SERVER_PORT || 3001},
    db: {url: process.env.DB_URL || 'mongodb://localhost:27017/order-api?authSource=root',
    options:{user:'root', password:'uFmVY4qzIU',useNewUrlParser: true}},
    security:{saltRounds: process.env.SALT_ROUNDS || 10,
    apiSecret: process.env.API_SECRET || 'secretKet'}    
}