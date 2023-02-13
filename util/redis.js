// const redis = require("redis")
// const TagService = require("../services/tag.service");
// const tagService = new TagService();

// const client = redis.createClient();

// client.on('error', err => console.log('Redis Client Error', err));
// client.on('connect', () => console.log('Redis Client connect'));

// const a = (async() => {
//   await client.connect()
//   while (true) {
//     const todayTop10 = await tagService.tags()

//     await new Promise((resolve) => {
//       for (let i = 0; i < 10; i++) {
//         client.set("articles_count" + [i], todayTop10[i].name)
//       }
//       setTimeout(resolve, 180000)
//     })
//   }
// })()

// module.exports = {a, client}