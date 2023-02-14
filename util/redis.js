const redis = require("redis")
const TagService = require("../services/tag.service");
const tagService = new TagService();

const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client connect'));


const a = (async() => {
  await client.connect()
  while (true) {
    const todayTop10 = await tagService.tags()

    await new Promise((resolve) => {
      for (let i = 0; i < todayTop10.length; i++) {
        client.set(`${i}`, todayTop10[i].name)
      }
      setTimeout(resolve, 86400000)
    })
  }
})()

module.exports = client