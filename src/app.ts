import express from 'express'
import { ssrServer } from './views/ssrServer'
import { router } from './router'

const port = process.env.PORT || 5173

// Create http server
const app = express()

app.use("/api", router)
ssrServer(app)

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})