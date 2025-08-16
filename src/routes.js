import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { randomUUID } from 'node:crypto';
import { validateText } from "./utils/validate-text.js";

const database = new Database()
export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {

      const tasks = database.select('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {

      const { title, description, } = req.body

      const isTitleValid = validateText(title)
      const isDescriptionValid = validateText(description)


      if (isTitleValid && isDescriptionValid) {
        database.insert('tasks', {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: null
        })
        return res.writeHead(201).end();
      } else {
        const invalidFields = []
        if (!isTitleValid) invalidFields.push("title")
        if (!isDescriptionValid) invalidFields.push("description")
        return res.writeHead(400).end(`The following fields are invalid: ${invalidFields.join(", ")}`)
      }
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const isTitleValid = validateText(title)
      const isDescriptionValid = validateText(description)


      if (isTitleValid && isDescriptionValid) {
        database.update('tasks', id, {
          title,
          description,
          updated_at: new Date().toISOString()
        })
        return res.writeHead(204).end();
      } else {
        const invalidFields = []
        if (!isTitleValid) invalidFields.push("title")
        if (!isDescriptionValid) invalidFields.push("description")
        return res.writeHead(400).end(`The following fields are invalid: ${invalidFields.join(", ")}`)
      }
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params
      const currentDate = new Date().toISOString();
      database.update('tasks', id, {
        completed_at: currentDate,
        updated_at: currentDate
      })

      return res.writeHead(204).end()
    }
  }
]