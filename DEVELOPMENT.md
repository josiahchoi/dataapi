# Development Notes

## Installation

```bash
$ npm install
```

## Running the app

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
# e2e tests
$ npm run test:e2e
```

## Setup database

```bash
docker run --rm -it -e MYSQL_ROOT_PASSWORD=mysql -e MYSQL_DATABASE=dataapi -e MYSQL_USER=dataapi -e MYSQL_PASSWORD=dataapi -p 3306:3306 mysql:5.7.29
```

## Test End to End

```bash
npm run test:e2e
```

## Test End to End without logging

```bash
npm run test:e2e -- --silent
```

## To add new module

```bash
nest g module users
nest g service users
nest g controller users
nest g class users/user.entity
```

## Genearte Migration

```bash
npm run typeorm:cli -- migration:generate -n Init
```

## Create Migration

```bash
npm run typeorm:cli -- migration:create -n NAME
```