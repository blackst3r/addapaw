# Free portrait redesign

The independent preview opens at `prototype/index.html`. Its first screen pairs the studio kitten with a real portrait downloaded from the live service. The single-pet example is identified as studio work. Customer feedback and delivered-print photos can be added as permissioned material becomes available.

## What works in this repository

- The homepage, all 46 catalog styles, and craft calls to action enter a style-specific, price-free photo step. Search, collection filters and the memorial link share the same catalog. The three homepage card images show distinct catalog references.
- File format, size and decodability checks run on the visitor’s device. A live-studio link preserves the selected style. A local sample demonstrates the comparison and supports downloading its real result.
- The craft page shows preview pricing beside availability, a keyboard-operable slider, and always-visible flat/relief details.
- Use the [pilot guide](pilot/pilot-guide.md) with a **private copy** of the [blank tracker](pilot/pilot-tracker.xlsx). Keep identifiable feedback and signed records in the team’s private store. The shared example is team work, with no buyer claim or star rating.

## Production handoff

The live Next.js application owns visitor sessions, uploaded files, generation limits and original downloads. The standalone version never transfers a visitor’s local file to that service. On the official site, a new free-style link still opens print options; visitors currently press Continue and pick their photo there.

In the production shop entry handler, pass a valid new free-style intent through the existing draft-initialization action currently attached to Continue. Reuse its validation, idempotency, failure recovery and session-owned project redirect. Place the existing upload control at the landing step and keep print configuration available on explicit print intent. Retain resume links to existing projects. Verify duplicate clicks, reload/back navigation, unknown styles, expired sessions, quotas, retries and download before releasing that change. This repository has no live application deploy credentials or source.

## Measurement

The standalone pages expose a local `addapaw:journey` browser event. No analytics requests are sent. The event detail includes the event name, mobile/desktop size class and, when relevant, the catalog style and entry point. It excludes file data, names, contact details, project IDs and raw URLs. The local events cover home views, style selections, successful/failed device photo checks and handoffs to the live studio.

On the production origin, connect a consent-aware analytics subscriber. Emit upload success only after server confirmation, generation failure from a failed job, first preview after a usable result displays, and download on the verified download action. Report distinct eligible homepage visitors who see their first successful preview divided by distinct eligible homepage visitors in the same cohort and observation window. Deduplicate retries and segment by first-entry style and device. Collect the baseline with the same event definitions before rollout. The static site alone cannot measure cross-origin completions or lift.

## Acceptance evidence

Browser checks cover responsive layout, keyboard interaction, style selection, upload validation, and sample download. Live QA separately exercised the ordinary guest flow using the brand's kitten example, including one free refinement and downloading the first generated image. Public imagery and the input/output record are listed in the [asset manifest](../prototype/assets/sources.json). No real-customer pilot or analytics baseline has been collected.
