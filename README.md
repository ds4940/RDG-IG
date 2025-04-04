This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Requirements
- Node.js 18.18 or later


## Running app

First, install dependencies:
```bash
npm install
```

To run app (with live reload)
```bash
npm run dev
```

## Running Playwright Tests

The Playwright tests can be run with the following commands:
```bash
test:playwright:ui-service
```

```bash
test:playwright:e2e
```

## Running API Tests

The API tests can be run with the following commands:
```bash
test:newman
```

Alternatively, the [Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) can be used. Tests should appear in the Test Explorer.

## OpenAPI Specification/Swagger UI
- OpenAPI specification is automatically generated and available at http://localhost:3000/api/doc
- Swagger UI pointing at the API spec is available at http://localhost:3000/swagger-ui.html

