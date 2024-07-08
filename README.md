# node-transactions

Sample API for financial transaction management written in Node on an implementation of clean architecture.

## Commands

### `npm install`

Installs application dependencies.

### `npm start`

Starts the server application locally on port `3000`.

### `npm run docker:start`

Starts the server application on Docker on port `3000`.

### `npm test`

Executes all available tests.

### `npm run queue:worker`

Starts a worker on the queues available on port `6379`.

### `npm run queue:producer <queue-name> <json-payload>`

Produces a job to one of the queues available on port `6379`.

## Dependencies

In order to interact with the queues, make sure you are running [Redis](https://redis.io/) either locally or through a Docker container:

```shell
docker run -p 6379:6379 -d redis
```

## Endpoints

#### `GET /account/:id`

Searches for an account with the provided `:id`.

###### response

    {
        "id": 1,
        "documentNumber": "12345678900"
        "balance": 123.45
    }

#### `POST /account`

Creates an account with the provided attributes.

###### request

    {
        "documentNumber": "12345678900"
    }

###### response

    {
        "id": "1",
        "documentNumber": "12345678900"
    }

#### `POST /transaction`

Creates a transaction with the provided attributes.

###### request

    {
        "accountId": 1,
        "amount": 123.45
    }

###### response

    {
        "id": 1,
        "accountId": 1,
        "amount": 123.45,
        "date": "2024-07-12T13:13:13.777Z",
    }
