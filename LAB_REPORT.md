# CI/CD Workflow Lab Report
## Random Quote Generator

**Student:** [Your name]  
**Course:** [Course name]  
**Date:** [Submission date]

### 1. Objective
The objective was to create a basic Continuous Integration (CI) workflow that validates the Random Quote Generator whenever code is pushed or a pull request is opened.

### 2. CI workflow configuration
The GitHub Actions workflow is stored at `.github/workflows/ci.yml`. It triggers on pushes to `main` or `master`, pull requests targeting those branches, and manual dispatch. It checks out the repository, configures Node.js 20, installs dependencies, runs the build check, and executes the automated tests. The workflow stops when a step exits with a non-zero status.

### 3. Automated setup and build
The pipeline uses an Ubuntu runner and Node.js 20. The setup step prepares the runtime and npm environment. The build script verifies that the required static application files exist and that the HTML page has the expected title. The successful local output is saved in `evidence/build-success.txt`.

### 4. Automated tests
The project uses Node.js's built-in test runner, so no third-party test framework is required. Tests check that the quote collection has enough entries, deterministic selection at the start and end of the random range, and rejection of an empty quote list. Successful test output is saved in `evidence/test-success.txt`.

### 5. Failure and recovery demonstration
To demonstrate that CI detects defects, a temporary test with an intentionally incorrect expected result was run. The test process returned a non-zero exit code, which would fail the CI job. The temporary broken test was then removed and the correct test suite was rerun successfully. The failure and recovery outputs are saved in `evidence/`. The deliberately broken test is not part of the final source code.

### 6. Deployment and infrastructure assumptions
The application is a static website and does not need a database or backend server. It can be hosted by a static hosting service such as GitHub Pages. CI runs on an ephemeral GitHub-hosted Ubuntu runner with Node.js 20. Deployment is not automated in this lab; the assumption is that deployment happens only after all build and test checks pass. No secrets are needed for validation. Any future deployment credentials must be stored as GitHub Actions Secrets.

### 7. Monitoring and feedback signals
The following signals should be monitored after deployment:
- Availability/uptime: whether the website can be reached.
- Performance: page load time and Core Web Vitals.
- Client-side errors: JavaScript exceptions and failed resource requests.
- CI reliability: workflow pass/fail rate and execution duration.
- User feedback: usability reports and feature requests.

If a signal indicates a problem, create an issue, investigate the cause, fix it in a branch, and require a passing CI run before merging.

### 8. Conclusion
The lab demonstrates a repeatable CI process: setup, build validation, automated testing, failure detection, and recovery. The monitoring plan provides basic signals for evaluating the application after deployment.

### Evidence checklist
- [x] CI workflow configuration included.
- [x] Local build check executed successfully.
- [x] Automated tests executed successfully.
- [x] Deliberately broken test caused a failure.
- [x] Corrected test suite passed.
- [x] Deployment and infrastructure assumptions documented.
- [x] Monitoring and feedback signals defined.

**Important:** Local evidence is included. A real GitHub Actions run still needs to be triggered by pushing the project to a GitHub repository.
