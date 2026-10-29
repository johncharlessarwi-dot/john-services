# Customer Order Data Privacy and Handling

This guide sets minimum operational safeguards for customer details, service requests and uploaded payment evidence handled by JOHN ONLINE SERVICES.

## Data minimisation

Collect only information needed to fulfil the requested service. Explain why sensitive documents are required before asking a customer to upload them. Do not request passwords, one-time verification codes, PINs or full payment-card credentials.

## Access and handling

- Restrict order and upload access to staff who need it for their assigned work.
- Use individual accounts; do not share administrator credentials.
- Keep production credentials, session secrets and API keys in deployment secrets, never in source files or commits.
- Avoid copying customer documents into personal devices, chat groups or public issue trackers.
- Use encrypted transport and secure storage configured by the deployment environment.
- Do not expose uploaded file paths or direct storage identifiers in public pages.

## Upload safety

1. Accept only file types required for the service.
2. Enforce file-size limits on the server, not only in the browser.
3. Generate server-side filenames rather than trusting user-supplied paths.
4. Store uploads outside publicly executable directories.
5. Check authorization on every download or preview request.
6. Delete temporary files when the service workflow no longer requires them, subject to applicable legal or business retention obligations.

## Order lifecycle

| Stage | Handling expectation |
| --- | --- |
| Request received | Collect minimum required fields and provide a reference |
| In progress | Limit access to assigned staff; record status changes |
| Completed | Notify the customer without exposing another customer's data |
| Retention period ended | Securely delete or anonymise data according to the approved policy |
| Suspected incident | Restrict access, preserve relevant logs and escalate promptly |

## Customer communications

- Verify the recipient before sending documents or status details.
- Keep email and WhatsApp messages limited to the relevant order.
- Never include internal credentials, private notes or another customer's information.
- Do not claim a payment is confirmed solely because a screenshot was uploaded; reconcile it against the payment provider or account record.

## Incident response checklist

- [ ] Restrict the affected account, endpoint or file access.
- [ ] Preserve relevant timestamps and audit logs without spreading the exposed data.
- [ ] Identify the data and customers potentially affected.
- [ ] Rotate exposed credentials and revoke compromised sessions.
- [ ] Notify the responsible business owner and follow applicable legal requirements.
- [ ] Record remediation and prevention actions.

## Release checklist

- [ ] No secrets or customer documents are committed to Git.
- [ ] Admin and file endpoints enforce server-side authentication and authorization.
- [ ] Upload type and size checks are enforced server-side.
- [ ] Temporary upload cleanup and retention behavior are documented.
- [ ] Error responses do not disclose filesystem paths, stack traces or private records.

This document is operational guidance, not a substitute for a formal legal review or a jurisdiction-specific retention policy.
