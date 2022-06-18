var redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect().then(() => {
    client.set("my_key", "Hello World using Node.js and Redis");
    client.get("my_key", redis.print);
    client.quit();
});
