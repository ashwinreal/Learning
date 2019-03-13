const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://localhost:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashkey = JSON.stringify(options.key || 'default');
    return this;
}

mongoose.Query.prototype.exec = async function(){

    if(!this.useCache){
        return exec.apply(this, arguments);
    }
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));
    const cachedValue = await client.hget(this.hashkey ,key);
    if(cachedValue){
        console.log('CACHED');
        const doc = JSON.parse(cachedValue);
        return  Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc); 
    }
    const result = await exec.apply(this, arguments);
    client.hset(this.hashkey, key, JSON.stringify(result));
    console.log('NOT CACHED');
    return Promise.resolve(result);
}

module.exports = {
    clearHash(hashkey){
        client.del(JSON.stringify(hashkey));
    }
}