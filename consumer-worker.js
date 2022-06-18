import { createClient, commandOptions } from 'redis';
import { Queue } from './queue.js'

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

var logsQueue = new Queue("logs", client);

function logMessages() {
    logsQueue.pop(function(err, replies) {
        var queueName = replies[0];
        var message = replies[1];
        console.log("[consumer] Got log: " + message);

        logsQueue.size(function(err, size) {
            console.log(size + " logs left");
        });

        logMessages();
    });
}

logMessages();

client.quit();