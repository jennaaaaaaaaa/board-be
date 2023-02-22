const jwtConfig = {
  secretKey : "a",
  options: {
    algorithm: "HS256",
    issuer: "wnalstjr",
    expiresIn: '1d',
  }
}

const corsOptions = {
  origin: 'http://localhost:5100',
  credentials: true
}

module.exports = {jwtConfig,corsOptions}