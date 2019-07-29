const app = require('../app')
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Connection on port :${port} Success !!!`)
})