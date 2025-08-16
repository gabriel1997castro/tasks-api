import { buildRoutePath } from "./utils/build-route-path.js"

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {

      const tasks = []

      return res.end(JSON.stringify(tasks))
    }
  }
]