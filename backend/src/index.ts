import express from "express"
import bodyParser from "body-parser"
import http from "http"
import { createAndConnectToServer } from "./db"
import { searchMiddleware, recipeMiddleware } from "./routes"

const appStartup = async (): Promise<void> => {
  await createAndConnectToServer()
  const app = express()
  // add parsers for the body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  // create our routes
  app.post("/api/search", searchMiddleware)
  // create a server
  app.get("/api/recipe/:id", recipeMiddleware)
  const httpServer = new http.Server(app)
  httpServer.listen(4000, "0.0.0.0", () => {
    console.log("now running on 4000")
  })
}

appStartup()
