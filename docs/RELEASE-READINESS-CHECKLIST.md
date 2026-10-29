# JOHN ONLINE SERVICES — Release Readiness Checklist

Use this checklist before deploying a change that handles service requests, customer contact details, uploaded documents or payment evidence.

## 1. Build and application checks

- [ ] Install dependencies from the lockfile with `npm ci`.
- [ ] Run `npm run lint` and resolve relevant lint errors.
- [ ] Run `npm run build` and confirm the production build completes.
- [ ] Start the production server in a staging environment and verify the main service-request journey.
- [ ] Confirm error pages do not expose stack traces, filesystem paths or environment values.

## 2. Authentication and authorization

- [ ] Administrator routes require server-side authentication.
- [ ] Every order read, update, download and status change checks the current user's authorization.
- [ ] Staff accounts have only the permissions required for their work.
- [ ] Sessions are invalidated appropriately after logout, password changes or account restriction.
- [ ] Rate limits or equivalent abuse controls protect login and sensitive request endpoints.

## 3. Customer data and uploads

- [ ] Collect only fields needed to fulfil the selected service.
- [ ] Explain why a document is required before asking the customer to upload it.
- [ ] Never request passwords, one-time codes, PINs or full payment-card credentials.
- [ ] Enforce file type and file size limits on the server.
- [ ] Generate server-side filenames and prevent path traversal.
- [ ] Require authorization for every private file preview or download.
- [ ] Store uploads outside publicly executable directories or behind an authenticated storage layer.
- [ ] Confirm temporary-file cleanup and retention behavior match the approved business policy.
- [ ] Do not include customer documents or personal data in logs, analytics events, screenshots or Git commits.

## 4. Payment and order status

- [ ] A screenshot or customer statement alone does not mark a payment as confirmed.
- [ ] Reconcile payment status against the provider or trusted account record.
- [ ] Verify webhook signatures where supported.
- [ ] Make webhook handling safe against duplicate delivery.
- [ ] Record order status changes with an appropriate audit trail.
- [ ] Customer notifications contain only information relevant to that customer's order.

## 5. Configuration and deployment

- [ ] Production secrets are stored in the deployment secret manager, not in source code.
- [ ] `.env` and local data files are excluded from version control.
- [ ] Administrator credentials are unique and strong.
- [ ] HTTPS is enabled for production traffic.
- [ ] Database and file-storage backups are configured and a restore procedure is documented.
- [ ] A rollback plan exists for the release.
- [ ] Staging and production use separate credentials and data.

## 6. Final sign-off

Record the release version, deployment date, person responsible, checks performed, known limitations and rollback reference.

Do not mark a checklist item complete unless it has actually been verified. This checklist is operational guidance and should be reviewed against applicable Tanzanian data-protection, consumer and payment-provider requirements before production use.

Related guidance: [Customer Order Data Privacy and Handling](ORDER-DATA-PRIVACY.md).
