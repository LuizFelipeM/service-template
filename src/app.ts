import express from 'express'
import { serverSideRendering } from './views/serverSideRendering'

const port = process.env.PORT || 3000

// Create http server
const app = express()

app.get("/helloworld", (req, res) => {
  console.log("app", JSON.stringify(req.app))
  res.send({ hello: "world" })
})
serverSideRendering(app)

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})