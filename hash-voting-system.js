import { createClient } from "redis";

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

function saveLink(id, author, title, link) {
    client.hSet("link:" + id, { author: author, title: title, link: link, score: 0 });
}

function upVote(id) {
    client.hIncrBy("link:" + id, "score", 1);
}

function downVote(id) {
    client.hIncrBy("link:" + id, "score", -1);
}

function showDetails(id) {
    client.hGetAll("link:" + id).then(res => {
        console.log("Title: ", res['title']);
    console.log("Author: ", res['author']);
    console.log("Link: ", res['link']);
    console.log("Score: ", res['score']);
    console.log("------------------------------");
    });
}

saveLink(123, "61crossroad", "61crossroad's GitHub Page", "https://github.com/61crossroad");
upVote(123);
upVote(123);
downVote(123);
upVote(123);
showDetails(123);

client.quit();