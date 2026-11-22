# BEAST MODE 4D v4.42 — Optional AI Prediction Review (22 Nov 2026)

- New **AI Prediction Review** toggle, displayed in the main **Predict** and **Oracle / Hot Hand / Deep Learn** screens, with an optional secure backend URL and a separate AI access token. The UI stays **English-only**.
- When enabled and configured, the app generates the original candidates with the existing algorithms and then asks the secure \`/review\` endpoint to select **0–5 provisional research picks** per operator/mode/date before showing the candidate list. Only the returned candidate IDs appear in the reviewed list. No numbers are fabricated by AI.
- If the API is not connected, fails or times out, reviewed lists remain **hidden**, with a clear error; users can turn the toggle **OFF** to view originals. This feature defaults to OFF until deliberately enabled. The token is held in memory and must be re-entered after reopening the page.
- Original outputs, score data, History and Random Control remain unmodified for comparisons; individual reviewed decisions and excluded candidates are saved locally under \`b4d-ai-review-history-v1\`. Rejected numbers are **not deleted**. Cross-operator sniper banners, conviction buys, fusion and dodge/cross-op experimental picks are hidden while strict review is on, to avoid exposing unreviewed alternatives.
- This is a screen-level research filter, **not** a payout/probability model. LLM opinions and historical-fit scores cannot validate increased odds in a genuinely independent draw. It does not place or block purchases on external betting websites. OpenAI's API and the deployed backend are required for actual AI selection. No model has demonstrated a reliable positive expectation on Malaysian 4D.
- The existing AI Brain chat remains a separate feature. Backend code in \`ai-backend/worker.js\` now supports a strictly validated \`POST /review\` endpoint using Structured Outputs, and requires the same private Worker authentication as chat.
- See \`ai-backend/README.md\` for deployment and token setup. Deployment/live Android testing remain unverified.

---

# BEAST MODE 4D v4.41 — AI Brain (22 Nov 2026)

- A new **AI Brain** link in the existing Coverage Lab opens \`ai-brain.html\`; the 715 iBOX checker also links directly to it. All labels, prompts, status messages and AI backend instructions are English-only.
- AI Brain provides a read-only summary of local 715 iBOX hit-history plus checked bundled results, selected by operator and available history window. It offers an explicit context preview so users can inspect what will be sent.
- The separate chat page does not connect to the current ChatGPT account or its memory. Users must deploy the personal Cloudflare Worker in \`ai-backend/worker.js\` with their **own OpenAI API key stored as a Worker secret**, set an additional independent access token and the permitted app origin, and configure that Worker URL on the AI Brain page. API billing is independent of ChatGPT.
- The UI does not send draw data automatically: it transmits a capped context only after the user clicks Send. The Worker validates requests, requires an access token, allows only one configured HTTPS Origin, bounds request size, uses the Responses API with \`store:false\` and never returns internal error details or API keys. The browser never stores the backend access token persistently.
- This is an assistant for historical research and payoff explanations, **not** a trading or betting agent. It cannot buy tickets or establish an edge over independently random draws. The existing 16 prediction methods, saved tickets, results and archive remain unchanged.
- **Important:** The code is committed to GitHub, but live AI is not connected until the user deploys their own secure backend and configures its secrets and endpoint. Android/iPhone browser testing and external hosting deployment are unverified. See \`ai-backend/README.md\`.

---

# BEAST MODE 4D v4.40 — Historical 715 iBOX Hit-Frequency Archive (22 Nov 2026)

- **New research section within the 715 iBOX Checker:** each complete operator-draw is normalized into the 23 prize positions, converted to sorted-digit group keys, and saved once per draw date + operator in the device's local storage. Duplicate refreshes do not inflate the totals; corrected complete results replace earlier data for the same operator and date.
- **Historical high-frequency and below-cutoff lists:** for a selected set of operators, study end date and trailing 30 / 100 / 300 / all available draw dates, display each group's count of matching operator-draws, 23-prize-position total and retrospective match percentage. Set a historical cutoff (20% default) and browse the top 20 most frequent historical groups, above-cutoff groups, below-cutoff groups, ever-matched sets or all 715. A saved research watchlist is checked against the next selected complete draw and reports its winning and non-winning sets without claiming predictive performance. At least 30 complete operator-draw observations are required before forming the shortlist.
- **Research watchlist:** save the currently selected above-cutoff group keys and their historical statistics as a snapshot for future non-monetary tracking. A CSV export includes all 715 groups with historical hit rates and fair-draw reference rates.
- **Separate saved archive:** \`b4d-ibox715-hit-history-v1\` stores unique complete operator-draw signatures; \`b4d-ibox715-watchlist-v1\` stores the optional research watchlist. Historic draws from the main device database, bundled checked results, imports and checked live results all feed the same archive. The app never places bets.
- **Interpretation:** historical frequency is not the probability of a future win. A 24-way group has a 5.52% per-operator-draw reference match rate (23 distinct uniformly random prize positions) versus 0.92% for a 4-way group. Past popularity does not create a proven edge in an independent random draw. Data quantity and source validity still matter.
- **Limitations:** app data remains stored locally on the same browser origin; phone deployment and actual results retrieval must be verified. The analysis cannot include older historical results that are not available in device storage or imported from a compatible backup.

---

# BEAST MODE 4D v4.39 — 715 iBOX Coverage Checker (22 Nov 2026)

- The existing **Coverage Lab** now links to a dedicated **715 iBOX Checker** (`ibox-715.html`). This is a new simulation view and does **not** change the 16 prediction methods, History, stored bets, or earlier Coverage Lab.
- Generates all 715 unique sorted-digit families locally (705 groups with >1 permutation and 10 identical-digit straight groups). Validates that each group is unique and all groups collectively cover 10,000 ordered 4-digit numbers, including leading zeros.
- Draw-date / operator aware: reads saved same-origin BEAST MODE results, bundled checked history, optionally imports JSON backups, and queries the existing 4dlivetoday checked-result endpoint while open/on return. No result is fabricated. A group without a matching prize stays **pending** until every selected operator has a complete 23-prize board.
- Green **Winning** groups list matching prize number(s), tier(s), operator(s), permutations and gross hypothetical payout. **No prize** is shown only when all selected results are complete; all groups are individually searchable and paginated.
- Defaults are the user-supplied iLotto4D BIG rates RM3800 / RM1250 / RM750 / RM210 / RM70 per RM1 straight stake. iBOX estimates divide by the group's permutation count and multiply by selected stake; identical-digit groups are treated as 1-way straight entries. Optional 5% rebate is **off by default** because BK8/iBOX eligibility is unconfirmed. Results show aggregate gross, stake and net only when every selected result is complete.
- Regression tests: `node scripts/check-ibox715.mjs` verifies all 715 groups and 10,000 ordered numbers, the five permutation counts, and the combined 18/21 Nov 2026 payouts from the checked archive. GitHub Actions also runs it when related files change.
- This screen does not place bets. Full coverage is not a prediction and cannot ensure a profit; results, platform rounding and ticket eligibility must be confirmed with the provider. Android/PWA device testing remains necessary.

---

# BEAST MODE 4D v4.38 — Coverage Lab (15 Nov 2026)

- New **Coverage Lab** button on the app home screen opens `coverage-mode.html` as a separate phone-friendly read-only mode; original prediction algorithms, history and ticket ledger remain unchanged.
- Frozen filtered number selections from **14 Nov 2026**: **Top 5,000**, **Top 6,000**, **Top 8,000** and **Top 9,500**. One shared list across Magnum, Sports Toto and Da Ma Cai; each larger set contains the smaller sets. Four-digit numbers retain leading zeros. The 370 triple-/quadruple-digit patterns intentionally excluded by the user are available in a separate browsing filter.
- Browse selected numbers in ascending order (200 per page), search by digits, and check exact prize-tier hits and same-digits permutations separately.
- Choose draw date/operator (or all three). The screen reads compatible complete draw boards saved in same-origin browser storage and the local Coverage Lab cache; it can import the main app's JSON backup without uploading it. It also tries the existing `4dlivetoday.com` checked-results API when online and refreshes while open/when resumed. An unavailable/unpublished draw remains visibly pending instead of being fabricated.
- Separate **hypothetical BK8 RM1 Big** payout and net result per operator and set (1st 3500, 2nd 1200, 3rd 600, Special 250, Consolation 80). These figures simulate straight bets, not purchased tickets. Permutations and cross-operator results are not counted as straight wins.
- Updated offline PWA shell and manifest; when hosted, close and re-open/refresh the existing site and relaunch the installed PWA to receive the new cached files.
- **Limitations:** Prior historical backtests did not establish an advantage over random selection. Excluding repeated-digit combinations is a user preference, not a validated forecast. A 9,500-number RM1 Big set cannot profit at the stated rates, even with all 23 prizes hit. Online API access and real-device display depend on deployment, browser support and source availability.

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
