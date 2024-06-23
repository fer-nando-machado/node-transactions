# node-transactions

Sample API for financial transaction management written in Node on an implementation of clean architecture.

## Commands

### `npm start`

Starts the server application locally on port `3000`.

### `npm test`

Executes all available tests.

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
