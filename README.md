# prerequisite

Any computer equipped with the following should able to run the test.

- docker (tested engine version: 19.03.8)
- node (tested version: v10.20.1)

## Step1 - Prepare your mysql database instance using Docker

```bash
docker run --name mysql --rm -it -e MYSQL_ROOT_PASSWORD=mysql -e MYSQL_DATABASE=dataapi -e MYSQL_USER=dataapi -e MYSQL_PASSWORD=dataapi -p 3306:3306 mysql:5.7.29
```

## To run automated end to end test

In your project root folder

```bash
npm install
npm run migration:run
npm run test:e2e
```

## To run api server in your local machine and test API with CURL (Linux/Mac OS Only)

In your project root folder

```bash
npm install
npm run migration:run
npn run start:dev
```

Test API Using CURL

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Apple", "valid": true, "count": 1}' http://localhost:3000/data -v
curl -X GET "http://localhost:3000/data?name=Apple"
```