# node-transactions

Sample API for financial transaction management written in Node on an implementation of clean architecture.

## Commands

### `npm start`
Starts the server application locally on port `3000`.

### `npm test`                    
Executes all available tests.

## Endpoints

#### `GET /accounts/:accountId` 
Searches for an account with the provided `:accountId`.
###### response 
    {
        "account_id": 1,
        "document_number": "12345678900"
    }

#### `POST /accounts` 
Creates an account with the provided attributes.
###### request 
    {
        "document_number": "12345678900"
    }
###### response 
    {
        "account_id": "1",
        "document_number": "12345678900"
    }

#### `POST /transactions` 
Creates a transaction with the provided attributes.
###### request
    {
        "account_id": 1,
        "operation_type_id": 4,
        "amount": 123.45
    }
###### response
    {
        "transaction_id": 1,
        "account_id": 1,
        "operation_type_id": 4,
        "amount": 123.45,
        "event_date": "2020-01-05T09:34:18.5893223"
    }
