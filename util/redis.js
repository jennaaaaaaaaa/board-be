// const { resolve } = require("bluebird");
// const redis = require("redis")
// const ArticleRepository = require("../repository/article")
// const articleRepository = new ArticleRepository();

// const client = redis.createClient();

// client.on('error', err => console.log('Redis Client Error', err));
// client.on('connect', () => console.log('Redis Client connect'));

// const a = (async() => {
//   await client.connect()
//   while (true) {
//     const count = await articleRepository.allCountPage()

//     await new Promise((resolve) => {
//       client.set("articles_count", count)
//       setTimeout(resolve, 180000)
//     })
//   }
// })()

// module.exports = {a, client}