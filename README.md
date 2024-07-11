# node-transactions

Sample API for financial transaction management written in Node on an implementation of clean architecture.

## Commands

The following commands are available:

### `npm install`

Installs application dependencies.

### `npm start`

Starts the server application locally on port `3000`.

### `npm run docker:start`

Starts the server application on Docker on port `3000`.

### `npm test`

Executes all available tests.

## Database

In order to get the app running, you need to run [Postgres](https://www.postgresql.org/) either locally or through a Docker container:

```ts
docker run -d -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=password postgres
```

Access your Postgres instance with the command:

```ts
docker exec -it postgres psql -U postgres
```

And run the following instructions to get the database started:

```ts
CREATE USER "node-transactions-username" WITH PASSWORD 'node-transactions-password';
CREATE DATABASE "node-transactions" OWNER "node-transactions-username";
```

Optionally, you can change the values of the environment variables and update the script above accordingly.

```ts
DB_USERNAME = "node-transactions-username";
DB_PASSWORD = "node-transactions-password";
```

The following commands are available:

### `npm run migrate`

Runs all pending migrations.

### `npm run migrate:rollback`

Reverts performed migrations.

## Queues

In order to interact with the queues, make sure you are running [Redis](https://redis.io/) either locally or through a Docker container:

```ts
docker run -p 6379:6379 -d redis
```

The following commands are available:

### `npm run queue:consumer <queue-name>`

Starts consumer for `<queue-name>` at the Redis server running on port `6379`.

### `npm run queue:producer <queue-name> <json-payload>`

Produces job with `<json-payload>` for `<queue-name>` at the Redis server running on port `6379`.

```ts
npm run queue:producer -- "account-queue" '{"document_number":"12345678900"}'
```

## Endpoints

#### `GET /account/:id`

Searches for an account with the provided `:id`.

###### response

    {
        "id": 1,
        "document_number": "12345678900"
        "balance": 123.45
    }

#### `POST /account`

Creates an account with the provided attributes.

###### request

    {
        "document_number": "12345678900"
    }

###### response

    {
        "id": "1",
        "document_number": "12345678900"
    }

#### `POST /transaction`

Creates a transaction with the provided attributes.

###### request

    {
        "account_id": 1,
        "amount": 123.45
    }

###### response

    {
        "id": 1,
        "account_id": 1,
        "amount": 123.45,
        "timestamp": "2024-07-12T13:13:13.777Z",
    }
