import { createClient, commandOptions } from 'redis';
import { Queue } from './queue.js'

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

var logsQueue = new Queue("logs", client);

function logMessages() {
    logsQueue.pop().then(function(res) {
        console.log("[consumer] Got log: " + res['key'] + " > " + res['element']);

        logsQueue.size().then(function(size) {
            console.log(size + " logs left");
        });

        logMessages();
    })
}

logMessages();