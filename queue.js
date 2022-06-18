function Queue(queueName, redisClient) {
    this.queueName = queueName;
    this.redisClient = redisClient;
    this.queueKey = 'queues:' + queueName;
    this.timeout = 0;
}

Queue.prototype.size = function() {
    return this.redisClient.lLen(this.queueKey);
}

Queue.prototype.push = function(data) {
    this.redisClient.lPush(this.queueKey, data);
}

Queue.prototype.pop = function() {
    return this.redisClient.brPop(this.queueKey, this.timeout);
}

export {Queue};