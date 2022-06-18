import { commandOptions } from 'redis';

function Queue(queueName, redisClient) {
    this.queueName = queueName;
    this.redisClient = redisClient;
    this.queueKey = 'queues:' + queueName;
    this.timeout = 0;
}

Queue.prototype.size = function(callback) {
    this.redisClient.llen(this.queueKey, callback);
}

Queue.prototype.push = function(data) {
    this.redisClient.lPush(this.queueKey, data);
}

Queue.prototype.pop = function(callback) {
    this.redisClient.brPop(this.queueKey, this.timeout, callback);
    // this.redisClient.brPop(commandOptions({ isolated: true}), this.queueKey, this.timeout, callback);
}

export {Queue};