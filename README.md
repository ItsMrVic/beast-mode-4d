# BEAST MODE 4D v4.16 — Research Edition

This is a revised version of the supplied v4.15 HTML app, not the original app and not a method guaranteed to win the lottery. Preserve your existing installation and exported JSON backup before making changes.

## What changed
- A new historical scoring engine evaluates all 10,000 exact four-digit numbers. A previously restricted set of 625 candidates plus past outcomes was insufficient.
- Uses smoothed position and adjacent-pair frequencies, optionally adjusted for historical weekday, momentum, digit sum and odd/even patterns. The default intentionally activates only position and adjacent pairs.
- Keeps Monte Carlo, entropy, chi-square, repeats, mirror, Markov and cross-operator comparisons out of the voting score unless future testing establishes their value; these remain experimental/diagnostic. Genetic optimization and cold-digit elimination no longer automatically bias or discard numbers.
- Ranking is computed on unrounded scores; the selected shortlist avoids near-identical four-digit combinations. 0-100 indices show HISTORICAL FIT, not odds or calibrated confidence.
- Walk-forward backtest uses only older draws and compares exact-match results with a seeded random control. Permutations are not counted as straight wins.
- No more changing every scoring weight after a lucky outcome or miss. Old preferences are backed up before conservative defaults are applied.
- Predictions now record the specific MYT target draw date. Result checking requires a match to that date and declines to attribute older un-dated predictions to arbitrary draws.
- Treats 0000 as a valid number, validates imported JSON and restores leading zeros in the included data. Data import includes module-setting export.
- Disables unreliable scraping of arbitrary web HTML and removes automatic buy-list stake allocation. Use verified results or JSON imports.
- Removed duplicate DeepSeek function and HTML-escaped external chat output.
- Browser localStorage quota errors now warn rather than silently failing.

## Installation
1. Unzip the archive. Put **index.html**, **manifest.json**, **sw.js**, **icon-192.png**, **icon-512.png** in the same folder. If hosted, back up your current files and replace them on the same hosting origin/path to retain that origin's saved settings.
2. If opening as a new app or local file, existing browser localStorage may not transfer. Export your old app's Data → Export JSON first, then import that backup.
3. Optionally import BEAST_DATA_MAGNUM_latest1000.json, BEAST_DATA_TOTO_latest1000.json and BEAST_DATA_DAMACAI_latest1000.json one at a time via the Data tab to merge the most recent 1000 known draws per operator. The data merges skip existing dates. Toto's uploaded history ends 28 Oct 2026; the other two end 1 Nov 2026. If the 31 Oct / 1 Nov Toto results are available, add them from an official record.
4. Set target weekday, click RUN; results are historical-pattern rankings, not forecast probabilities.
5. Record actual draw results only against the exact saved target date.

## Security & caveats
- This is a browser-only HTML app. Its DeepSeek API key, if supplied, is stored in browser localStorage. Do not use a sensitive reusable key on a shared device or publicly publish your app with a key embedded. API integration depends on browser CORS and service availability; it was not live tested.
- Local browser storage is limited. The optional packs include only the most recent 1000 draws per operator to reduce quota failures. Back up regularly.
- The source retained the original Oracle, Hot Hand, P&L and theme interfaces. These experimental systems are not scientifically verified and do not demonstrate higher future lottery-winning chances.
- Four-digit draw outcomes are treated as independent. Historical scoring has not demonstrated a statistically significant forecasting edge.

## Verification
- JavaScript parsed successfully with Node.js `--check`.
- Automated isolated engine tests verified candidate completeness (10,000), 4D-number handling including 0000, deterministic ranking, correct target date format, immutable scoring weights after outcomes, and non-voting diagnostics.
- The browser integration could not be fully exercised in this environment; test PWA installation, service-worker refresh, and DeepSeek manually on your target device.
- The optional datasets originate from files provided in this conversation, not from a new authoritative independent live check.
