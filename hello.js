import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

client.set("my_key", "Hello World using Node.js and Redis!");
client.get("my_key").then((value) => { console.log(value); });
client.quit();
