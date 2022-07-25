## How to

1. Choose how you want to run the application - in docker or locally.
2. Make preparing steps according to your choice
3. Go to http://localhost:3000/

## Run in docker

```bash
$ docker build -t simple-calculator . && docker run -d -p3000:3000 simple-calculator
```

## Local installation

```bash
$ npm install
```

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```