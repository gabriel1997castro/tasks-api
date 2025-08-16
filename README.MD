# Tasks API (Node.js Challenge)

A minimal **Tasks API** built with vanilla Node.js as a challenge from the Rocketseat Node.js fundamentals course.
It implements a lightweight HTTP server, custom routing with regex, a JSON body parser, and file-based persistence—**no frameworks**.

---

## ✨ Features

- **Pure Node.js** (`http`, `fs`) — no Express.
- **File persistence** — tasks are stored in `db.json` at the project root (auto-created).
- **CRUD-ish** flow — create, list, update, and complete tasks.
- **Simple validation** — non-empty `title` and `description` for create/update.
- **ISO timestamps** — `created_at`, `updated_at`, `completed_at`.

---

## 🗂️ Project Structure

```
.
├─ server.js
└─ src/
   ├─ database.js
   ├─ routes.js
   ├─ middlewares/
   │  └─ json.js
   └─ utils/
      ├─ build-route-path.js
      ├─ extract-query-params.js
      └─ validate-text.js
```

---

## 🛠️ Tech & Requirements

- **Node.js ≥ 18** (uses `node --watch`)
- NPM (or PNPM/Yarn if you prefer)

---

## 🚀 Getting Started

```bash
git clone https://github.com/gabriel1997castro/tasks-api.git
cd tasks-api
npm install
npm run dev
```

By default the server listens on **[http://localhost:3000](http://localhost:3000)**.

> The database file (`db.json`) is automatically created on first write at the project root.

---

## 🧱 Data Model

```json
{
  "id": "uuid",
  "title": "Task title",
  "description": "Task description",
  "completed_at": null,
  "created_at": "2025-08-16T00:00:00.000Z",
  "updated_at": null
}
```

- `completed_at` starts as `null` and is set when the task is completed.
- `updated_at` is set on `PUT` and on completion.

---

## 📡 API Reference

Base URL: `http://localhost:3000`

### List tasks

**GET** `/tasks`

Returns all tasks.

```bash
curl http://localhost:3000/tasks
```

**Response (200)**

```json
[
  {
    "id": "a0e7c2b8-...-....",
    "title": "Learn Node.js",
    "description": "Finish Rocketseat challenge",
    "completed_at": null,
    "created_at": "2025-08-16T21:15:11.123Z",
    "updated_at": null
  }
]
```

---

### Create task

**POST** `/tasks`

Body:

```json
{
  "title": "Learn Node.js",
  "description": "Finish Rocketseat challenge"
}
```

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Finish Rocketseat challenge"}'
```

**Success:** `201 Created` (empty body)
**Failure:** `400 Bad Request` with message listing invalid fields.

---

### Update task (full replace of editable fields)

**PUT** `/tasks/:id`

Body:

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

```bash
curl -X PUT http://localhost:3000/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated title","description":"Updated description"}'
```

**Success:** `204 No Content`
**Failure:** `400 Bad Request` with message listing invalid fields.

> Note: As implemented, `PUT` expects **both** `title` and `description`. It sets `updated_at` automatically.

---

### Complete task

**PATCH** `/tasks/:id/complete`

Marks the task as completed by setting:

- `completed_at = now (ISO)`
- `updated_at = now (ISO)`

```bash
curl -X PATCH http://localhost:3000/tasks/<id>/complete
```

**Success:** `204 No Content`

---

## 🧪 Validation Rules

- `title`: non-empty string
- `description`: non-empty string
- `completed_at`: server-controlled via the **complete** endpoint (starts `null`)

On invalid `title`/`description`, the API responds with:

```
400 Bad Request
The following fields are invalid:
title, description
```

---

## 📝 Notes & Design Choices

- **Routing** uses regex via `build-route-path.js` to support path params like `/tasks/:id`.
- **Body parsing** is handled by a small JSON middleware.
- **Persistence** is a simple in-memory object persisted to `db.json` on writes.
- **Error handling** is intentionally minimal for learning purposes.

---

## 🙌 Acknowledgments

Built as part of the **Rocketseat** Node.js course challenge.
