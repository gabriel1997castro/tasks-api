import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()
export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {

      const tasks = database.select('tasks')
      console.log({ tasks })

      return res.end(JSON.stringify(tasks))
    }
  },
  // {
  //   method: "POST",
  //   path: buildRoutePath("/tasks"),
  //   handler: (req, res) => {

  //     const tasks = []

  //     return res.end(JSON.stringify(tasks))
  //   }
  // }
]