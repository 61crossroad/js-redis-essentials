import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

function upVote(id) {
    var key = "article:" + id + ":votes";
    client.incr(key);
}

function downVote(id) {
    var key = "article:" + id + ":votes";
    client.decr(key);
}

async function showResults(id) {
    var headlineKey = "article:" + id + ":headline";
    var voteKey = "article:" + id + ":votes";
    // client.mGet([headlineKey, voteKey], function(err, replies) {
        // console.log('The article "' + replies[0] + '" has ' + replies[1] + ' votes');
    // });
    const replies = await client.mGet([headlineKey, voteKey]);
    console.log('The article "' + replies[0] + '" has ' + replies[1] + ' votes');
}

upVote(12345);
upVote(12345);
upVote(12345);
upVote(10001);
downVote(10001);
upVote(60056);

showResults(12345);
showResults(10001);
showResults(60056);

client.quit();