# Random Quote Generator — CI Lab

A small static web application used to demonstrate a basic Continuous Integration workflow.

## Requirements
- Node.js 20 or later
- npm (included with Node.js)
- Git and a GitHub repository for the hosted Actions run

## Run locally
```bash
npm install
npm run build
npm test
```
Open `index.html` in a browser to use the quote generator.

## CI workflow
The workflow at `.github/workflows/ci.yml` runs on pushes and pull requests targeting `main` or `master`, and can also be started manually. It checks out the code, sets up Node.js, installs dependencies, runs a build validation, and runs the automated test suite.

## Deployment and infrastructure assumptions
- The application is a static website; it does not require a server-side database or persistent application server.
- A production deployment can publish `index.html`, `style.css`, and `script.js` to a static hosting provider (for example, GitHub Pages).
- The CI runner is an ephemeral Ubuntu-hosted GitHub Actions runner with Node.js 20.
- Deployment is assumed to occur only after the CI checks pass. This lab workflow intentionally validates but does not automatically deploy.
- Secrets are not required for the build and test steps. If a hosting provider later requires a deployment token, store it in GitHub Actions Secrets and never commit it to source control.

## Monitoring and feedback plan
- **Availability:** check the published page with an uptime monitor; alert on failed checks.
- **Page performance:** monitor page load time and Core Web Vitals (especially LCP and CLS).
- **Client-side errors:** review browser error reports or a privacy-conscious frontend error tracker.
- **CI health:** monitor workflow success rate, failed jobs, and time to complete each run.
- **User feedback:** provide a feedback link or contact method and review reported usability issues.
- **Response:** investigate regressions, create an issue, fix the cause, and verify the fix through a new pull request and passing CI run.

## Evidence note
The included `evidence/` folder contains local command outputs from the build and test checks, including a deliberately failing test run followed by a passing run after the test was corrected. A hosted GitHub Actions run requires pushing this folder to your own GitHub repository; do not present a local run as a hosted Actions run.
