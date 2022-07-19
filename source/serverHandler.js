const express = require('express')
const cors = require('cors')
const routes = require('./routes.js')
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

// si

app.listen(157, () => {
  console.log(`API is listening on port 157`)
})
