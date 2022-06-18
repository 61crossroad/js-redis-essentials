import { createClient } from 'redis';
import { Queue } from './queue.js'

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

var logsQueue = new Queue("logs", client);
var MAX = 5;
console.log(logsQueue);
for (var i = 0; i < MAX; i++) {
    logsQueue.push("Hello world #" + i);
}
console.log("Created " + MAX + " logs");

client.quit();
