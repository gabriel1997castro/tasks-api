import http from 'node:http'
import { json } from './src/middlewares/json.js'
import { routes } from './src/routes.js'
import { extractQueryParams } from './src/utils/extract-query-params.js'


const PORT = 3000

const server = http.createServer(async (req, res) => {
  await json(req, res)
  const { method, url } = req

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  })

  if (route) {
    const routeParams = url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end();
})


server.listen(PORT)