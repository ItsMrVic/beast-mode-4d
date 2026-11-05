# BEAST MODE 4D v4.30 — Weekly Pattern Intelligence (design and implementation checklist)

**Status: design only; no prediction engine or UI integration yet.** This feature is experimental and must not be described as identifying an operator's secret algorithm or increasing lottery winning odds.

## Event-driven draw workflow

1. Ingest each verified draw with operator, draw date, draw type (`regular` or `special`), complete prize board, and provenance. Preserve leading zeroes and avoid duplicate imports.
2. At each Wednesday draw, snapshot a separate baseline for each operator using only information available at that timestamp.
3. If a Special Draw occurs, update the profile immediately after its verified results are recorded, and retain the prior snapshot and recommendations.
4. After Saturday's verified draw, update Sunday's profile. Never retroactively change predictions for completed draws.
5. Maintain both an adaptive strategy and an unchanged fixed baseline for comparison.

## Pattern families

Position frequencies; overall digit frequencies; odd/even balance; low/high digits; digit sums; repeated digits; digit-pair frequencies; permutation families; sequential digits; recurrence gaps; cross-operator overlap. These are *descriptive statistical features*, not evidence of a lottery algorithm switch.

## Guardrails and acceptance tests

- Each prediction has an immutable creation timestamp, target operator, target draw date, draw type, ranked candidates, strategy version, input-data cutoff, and snapshot identifier.
- Never use target-draw or later results to compute an earlier prediction (prevent look-ahead leakage).
- Distinguish exact matches, permutations, cross-operator observations, and paid-ticket wins.
- When data are insufficient or statistical evidence is weak, display `No reliable pattern detected`.
- Test proposed regime-change signals against simulated independent fair draws, adjusting for multiple testing and selection bias.
- Report out-of-sample results, random-control comparisons, confidence intervals, and number of evaluated draws; do not present historical-fit scores as win probabilities.
- Verify Special Draw chronology, missed draws, repeated imports, device-local persistence, and offline behavior.
- Preserve all v4.29 UI themes and existing prediction history.

## Implementation order

1. Audit current database and prediction-history interfaces.
2. Add a non-destructive draw-event and prediction-snapshot schema.
3. Implement statistical feature extraction and an event-driven regime monitor.
4. Add locked baseline-versus-adaptive backtesting.
5. Integrate the weekly monitor and Special Draw status into the UI, then test before merging.

---
# BEAST MODE 4D v4.20 — History Digit Match Tracker

- History now includes **Deep Learn** and **Random Control** mode filters alongside Oracle, Hot Hand, Cross-Operator Migration, Sniper, Fusion, Dodge and the existing Repeat modes.
- Three separate filters cover prediction mode, prediction operator (Magnum, Toto, Da Ma Cai), and result status (exact, permutation, any digit match, same digits at all three).
- On the **recorded target date only**, the History screen compares every saved four-digit prediction with the complete available prize boards for **each of the three operators**. Matches appear automatically once those results exist in the local or bundled database.
- **Exact** means same number in the same order; **Permutation** means the same four digits in a different order. Repeated digits count correctly (0700 matches 0070 but not 0078). Match detail shows operator, matched number, and prize tier.
- Markers for matches at another operator are **cross-operator observations**, not paid ticket wins. Permutation matches are **not straight-number wins**. Ticket payout depends on betting format and which operator was purchased.
- Entries without a recorded target draw date are never compared retroactively. Results from other dates cannot count.
- Preserves v4.19 algorithms, approximately 2,000 archived draws per operator, local device data, saved checked results and recorded prediction history. Future results still require importing; no real-time online feed was added.
- New PWA cache name: `beast-4d-v420-shell`.

## Verification
Node.js syntax validation and isolated JavaScript rendering tests passed. Tests included 0700 (Magnum), 0007 (Toto), 0070 (Da Ma Cai) across a matching draw date, all-three detection, missing target dates, mode/status/operator filtering, and distinction between exact and permutation results. Full Android UI testing was unavailable; please check the History screen on your phone.

No prediction or permutation pattern has a demonstrated ability to improve winning odds over a fair independent draw.

---

# BEAST MODE v4.19 — 2,000 Draws Per Operator

Automatically adds up to 2,000 verified historical draws per operator on the first load, preserves all existing complete results, predictions, P&L and settings. Repairs partial saved records and falls back to 1,500 or 1,000 per operator if local browser storage is insufficient. The previous 104 learned badge was actually the count of result checks; the badge now displays the number of saved draws and Data reports checks separately. Deep Learn statistical history window increased to 2,000.

These are archived results through 1 November 2026, not an automatic feed for new draws. Historical frequency modeling does not demonstrate better winning odds. Localized Node and Chromium tests passed for the corresponding upgrade.

---

# BEAST MODE 4D v4.18 — Research Engine Upgrade

- **Oracle:** deterministic scoring across 10,000 candidates, larger non-overlapping windows, smoothed position/pair frequencies, optional weekday comparison, and no compulsory sum-zone elimination. Unsupported Operator Dodge betting suggestions disabled.
- **Brainstorm:** Chi-Square now uses all ten digits in the original sample and reports distribution deviation, not future win confidence.
- **Hot Hand:** separates Magnum, Toto and Da Ma Cai selection, keeps pooled data as research-only, uses all 10,000 candidates without cold-digit or digit-sum cutoffs, and records the selected target weekday without duplicates.
- **Deep Learn:** explicit statistical model (not a neural network); scores all 10,000 outcomes using smoothed historical position and pair counts; standardized historical-fit indices instead of inflated Top 5 scores; distinct target-day selector; duplicates prevented; straight and permutation evaluation separated from randomized controls.
- **Compatibility:** Preserves the v4.17 repaired offline database lookup, archived results, previous saved history schemas and overall UI. Updates PWA cache version to v418.

## Verification and caveats

JavaScript syntax and three-operator regression tests passed, including duplicate-free target-date history saves, deterministic Oracle, complete Chi-Square samples, and engine UI template rendering in a stub DOM. A full Android/PWA browser run was unavailable. On device, confirm the v4.18 badge and check the 1 November draw archive.

Bundled results end 1 November 2026; no automatic live draw downloads were added. No demonstrated lottery forecasting advantage over random selection. A /100 pattern-fit score is not a win percentage. Device-local data remains on the same website origin; export JSON before changing hosting origins.

---

# BEAST MODE 4D v4.17 — Results Lookup Fix

This version repairs the **Live** and **Check & Learn → Auto-fill** lookups in the available v4.16 HTML source. It is an offline historical archive, **not a real-time online results service**. Results later than 2026-11-01 must be imported manually from a checked source.

## What was wrong
- Live Fetch searched unrelated HTML webpages and guessed prize numbers from raw text. This can fail on CORS/HTML changes and could silently show unrelated numbers as prizes.
- Auto-fill searched only the app's stored draws, which were outdated on many installations. It didn't use the historical packs.
- All three operators could say 'No results found' even though valid historical results existed.

## Improvements
- Both screens now call `findStoredDraw(operator, date)` and prefer complete saved draws, falling back to complete bundled records. The bundled archive includes 1000 recent draws per operator, ending 2026-11-01, including Sports Toto 2026-10-31 and 2026-11-01.
- The Live tab clearly labels saved vs bundled results and does not falsely claim a web feed.
- `Auto-fill` retains four-digit strings such as 0700 and 0992 and handles partially populated results.
- Optional **Import bundled history into prediction database** adds only missing records and repairs incomplete ones, without removing existing complete records or predictions. It checks storage success before committing.
- Changing the Live date resets the previous result display, and the default date uses Malaysia time.
- Service worker cache renamed to v4.17 for update refresh.

## Install / update
1. **Export your existing backup** from the Data tab before updating. Keep a copy of your old app.
2. For a hosted PWA, replace the same-origin files `index.html`, `manifest.json`, `sw.js`, icons from this ZIP. Keep the same URL/origin to preserve localStorage. Refresh or restart the PWA after installation. Do not clear browser data unless a backup exists.
3. For a standalone Android HTML viewer, open `BEAST_MODE_4D_v4.17_FIXED.html`. A standalone file may have a different storage origin, so import your previous app's backup if needed.
4. Open **Live**, select **2026-11-01**, then **Check DB**. You should see Magnum 5060/8133/3762, Toto 2270/9276/4275, Da Ma Cai 4863/0700/5201.
5. Open **Check & Learn**, choose a saved target date/operator, then **Auto-fill**. To train on the historical archive, use the Live tab's **Import bundled history** button. Loading an actual result does not itself prove a prediction was made for that draw date.

## Limitations
- This release fixes historical lookup; it **does not fetch new draws from the internet** and does not claim to improve lottery odds.
- Your custom live API/backend is not represented in the HTML source we inspected. Integrating a real API will require the API endpoint/schema and code, then validation against trusted sources.
- Browser rendering and persistence on your particular phone/host must still be confirmed. JavaScript syntax and isolated lookup/autofill tests are included in this delivery.
- Bundled historical data came from the provided archives; only the newest draws were separately cross-checked. Verify against operator sources before relying on prize information.
