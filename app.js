const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {corsOptions} = require("./config/config")
const a = require("./util/redis.js")
const router = require("./routes/routes")


const app = express()

app.use(express.json(), cookieParser(),cors(corsOptions))

app.use("/api", router)


app.listen(5000,() => console.log(5000,"번 서버 열림"))