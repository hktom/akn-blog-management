
## Blog CMS

**Client:** React, NextJs, Material UI

**API:** JSONPlaceholder

## Install dependencies

To install dependencies, run the following command
```bash
  npm install
```

## Running Tests

To run tests, run the following command
- e2e tests will failed with this command, instead try the section end to end tests section
```bash
  npm run test
```

## Running End to End Tests

To run tests, run the following command after building the app
```bash
  npx playwright test 
```

## Running The App on dev

To run the app, run the following command
set those local env variables :
- NEXT_PUBLIC_DEFAULT_USER_PASSWORD
- NEXT_PUBLIC_API_URL

```bash
  npm run dev
```

## Running The App on prod

To run the app, run the following command
set those local env variables :
- NEXT_PUBLIC_DEFAULT_USER_PASSWORD
- NEXT_PUBLIC_API_URL

To login use those credentials :
- email : Sincere@april.biz
- password : NEXT_PUBLIC_DEFAULT_USER_PASSWORD || erTy3r4t

```bash
  npm run build && npm run start
```