# Working in addapaw

This repository contains a public-site UX review and an independent static homepage proposal for Add a Paw. It is not the source of the live site at https://luna.nodesk.tech/. Do not imply that changes here deploy to that site.

Use the existing checkout. Cloud tasks already run in isolated environments; do not create a Git worktree unless the user explicitly requests one.

## Start the proposal

Python 3 is the only required runtime. From this repository root:

```bash
python3 -m http.server 8001 --bind 127.0.0.1 --directory prototype
```

Keep the process alive in a terminal session. After restoring an environment or starting a new task, restart it when needed; processes do not persist through snapshots. Reuse only verified servers for this checkout and never stop unrelated processes.

Verify HTTP 200 and that the response matches `prototype/index.html`; a running PID alone is insufficient. Site imagery comes from luna.nodesk.tech and needs permitted HTTPS access. No packages, build, credentials, databases, upload service or payment service are required for the static proposal. Keep TLS verification and the inherited external proxy settings.

## Review and scope

- `docs/site-audit.md`: evidence from live-site HTML and prioritized recommendations.
- `docs/browser-review.md`: current-instance browser observations and limits.
- `docs/references.md`: sources actually read; do not claim unmeasured conversion gains.
- `scripts/inspect_page.py`: standard-library HTML baseline collector. It does not render JavaScript or measure Core Web Vitals.
- `reports/`: ignored local generated evidence; absence does not block startup.

The current proposal uses real outbound links to the existing site but does not implement uploads, generation, downloading, checkout or data policies. Do not fabricate prices, shipping promises, customer testimonials or privacy guarantees. Confirm product facts before adapting copy for production. Use browser checks for layout or interaction changes; documentation-only changes need no new test suite.
