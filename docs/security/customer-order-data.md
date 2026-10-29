# Customer order data protection guide

Order enquiries may contain names, phone numbers, email addresses, service choices, and supporting documents. Handle them as private customer information.

## Collection and validation

- Collect only details required to deliver the requested service.
- Validate inputs on the server; do not rely only on browser-side checks.
- Reject unexpected file types and enforce documented upload size limits.

## Access and sharing

- Restrict order access to staff assigned to the service or support task.
- Avoid exposing sequential or guessable order references as authorization.
- Require authorization for every order read, update, export, and attachment download.
- Do not forward customer details to third parties without an approved purpose.

## Retention and audit

- Define retention periods for completed and abandoned orders.
- Avoid logging full message bodies, identity documents, or credentials.
- Record sensitive access and status changes with actor and timestamp.
- Provide a process to correct or remove data when policy permits.