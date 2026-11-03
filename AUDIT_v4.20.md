# BEAST MODE 4D v4.20 — Audit and v4.21 repair plan

Source: uploaded 12,003-line v4.20 `index.html` reviewed 2026-11-03. The original `main` application is intentionally unchanged.

## Confirmed defects
1. **H-01: Unassigned Sniper predictions appear under all operator filters.** `historyMatchesOperator` returns true for `SNIPER`/`ORACLE_SNIPER` without `subOperator`. Fix: use a separate unassigned/cross-operator filter.
2. **H-02: Sniper cross-operator observations can be displayed as wins.** `checkResults` pools results from three operators and stores them as `entry.hits`. Do not equate this with ticket wins; record operator/date and actual bet type separately.
3. **H-03: Partial prize boards can be marked checked.** `checkResults` only requires top-three prizes. Require a complete board before final evaluation, or save explicitly partial status and allow rechecks.
4. **H-04: Full-backup import drops saved engine settings.** `importData` resets `moduleWeights`, `moduleToggles`, and `moduleTogglesPerOp` to defaults despite exporting them. Validate and restore these values.
5. **M-05: Persistence errors are not propagated.** `saveAll()` does not report failure, and some callers still report success.
6. **M-06: History matching accepts incomplete boards.** Display 'partial/unknown' rather than a definitive no-match when prizes are missing.

## Additional limitations
- Bundled historical data ends 2026-11-01; there is no real-time result feed.
- DeepSeek API keys are stored in localStorage; a secured backend is preferable for production.
- Android/PWA UI and storage behavior have not been verified.
- Lottery prediction scores are statistical descriptions, not demonstrated improvements over fair-draw odds.

## Required regression cases
- `0700` matches `0007` and `0070`, but not `0078`.
- Exact and permutation matches remain distinct.
- A result on a different date must never count.
- Unassigned Sniper must not be categorized as Magnum, Toto, or Da Ma Cai.
- Partial prize boards must not be counted as final misses.
- Full backup round-trip must preserve weights and toggles.
- Simulated storage quota failure must produce a visible failure.
- Cross-operator observations must not become paid ticket wins.

## Deployment gate
**Do not merge this audit branch as a v4.21 release.** This branch documents defects and test expectations; it does not yet modify the production `index.html`. Apply fixes, run unit/browser tests, and review the resulting app before release.
