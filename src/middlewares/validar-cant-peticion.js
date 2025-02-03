  import rateLimit from 'express-rate-limit'

  const limiter = rateLimit({
    window : 15 * 60 * 1000,
    max : 100
  })

  export default limiter;