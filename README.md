<img src="https://github.com/damiancipolat/node-bff/blob/master/doc/node.png?raw=true" width="150px" align="right" />

# Special custom middleware for expressjs

## **Detail**:
This project consists of being a collection of middlewares created for expressjs. In order to have a focus on monitoring and traceability designed for production ready api-rest.

## **List of middlewares**:

#### **expressLogger**:
Log all request and response received, inject traceability ids.

#### **restrict**:
Allow a request only if have an authorization header.

#### **tokenDecoder**:
Inject in the context clienId from jwt and in the request object.

#### **traceability**:
Inject in the request and the context the traceability from headers.

### Examples:
In this section you can test the middleware running.

#### **HOME request**:
In this request the header have the "authorization" header and x-correlation-id

##### CURL request:
```console
curl --location --request GET 'http://127.0.0.1:8000/home' \
--header 'x-correlation-id: 1213123213123213213123' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"damian"
}'
```

#### **HEALTH request**:
A request without any metadata in header.

##### CURL request:
```console
curl --location --request GET 'http://127.0.0.1:8000/health' \
--header 'x-correlation-id: 111111'
```
