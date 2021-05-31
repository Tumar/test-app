# Steps to Launch App

1. Execute `cp .env.example .env`
2. Run `docker-compose up`. Add `--build` option to build images
3. Run `docker exec -it test-app_app_1 yarn knex migrate:latest`
4. Either open GraphqlPlayground http://localhost:4000/graphql/playground, paste this snippet and execute

```
query {
  estimateOrder(input: {
    productsList: ["CC", "PC", "CC", "CC"]
  }) {
    total
  }
}
```

Or run cURL statement

```
curl 'http://localhost:4000/graphql/playground' \
  -H 'content-type: application/json' \
  --data-raw '{"operationName":null,"variables":{},"query":"{\n  estimateOrder(input: {productsList: [\"CC\", \"PC\", \"CC\", \"CC\"]}) {\n    total\n  }\n}\n"}' \
  --compressed
```

# Tests

1. Run `docker-compose --file docker-compose.test.yml up --build --abort-on-container-exit`
