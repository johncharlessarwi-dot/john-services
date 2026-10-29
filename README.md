# JOHN ONLINE SERVICES

A premium Tanzanian digital agency platform for HESLB, university applications, RITA services, and urgent government support.

## Features

- Dynamic service bundles with real-time pricing
- Dark / Light mode toggle
- Local mobile money payment layout
- WhatsApp redirect with preformatted order details
- Admin dashboard with protected access
- Auto-cleanup of uploaded files on completion

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Initialize the SQLite database:
   ```bash
   npm run prepare
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Admin Access

Configure administrator credentials through the application's secure environment or deployment settings. Do not commit passwords, API keys, session secrets, or other credentials to this repository. If a credential has ever been exposed in a public commit, rotate it in the application and remove it from any active configuration.

## Notes

This app stores orders in `database/orders.db` and saves uploaded screenshots into `uploads/`.

## Project maintainer

JOHN ONLINE SERVICES AND APPLICATIONS — Tanzania-based digital services and software solutions.

- **Developer:** [John Charles Sarwi](https://john-charles-sarwi-portfolio.vercel.app/)
- **Portfolio:** https://john-charles-sarwi-portfolio.vercel.app/
- **GitHub:** https://github.com/johncharlessarwi-dot
