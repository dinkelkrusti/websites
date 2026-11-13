# QA Checklist — ex nihilo

One copy of this table per release. A release ships only when every
manual item is ✅ (or N/A with a reason).

Release / date: ____________ Tester: ____________

## Automated

- [ ] `npx @axe-core/cli` (all 14 URLs) — 0 violations
- [ ] Lighthouse protocol (6.5: /de/, /de/medien/, /en/concerts/) — all ≥ 90
- [ ] Select-String dist checks: no `href="/(de|en)`, no `websitesde`

## Keyboard (Desktop, Chrome + Firefox)

- [ ] Skip link: first Tab on any page shows "Zum Inhalt springen",
      Enter jumps to #main
- [ ] Tab order follows visual order on every page (nav → content → footer)
- [ ] Focus ring (gold) visible on every interactive element —
      including teaser cards and concert "Tickets" buttons
- [ ] Drawer: Enter on burger opens it; focus is inside; Tab cycles
      within drawer (never escapes to background); Esc closes; focus
      returns to the burger; overlay click closes
- [ ] DE|EN switch is reachable and announces as a link to EN/DE
- [ ] Video consent: the consent button is keyboard-reachable;
      after Enter, the iframe title is announced
- [ ] Contact form: every field reachable, honeypot is NOT reachable
      (never appears in Tab order)
- [ ] 404 page: DE/EN links work from keyboard

## Screen reader (NVDA, free on Windows — quick pass, not exhaustive)

- [ ] Home page announces page title and lang (German on /de/)
- [ ] Nav is announced as navigation with its label
- [ ] Drawer open/close is announced (dialog)
- [ ] Video consent button announces its purpose before click
- [ ] Concert list: date + venue + city read sensibly in one item

## Touch & mobile (real Android phone, deployed GitHub Pages URL)

- [ ] Drawer: burger easy to hit, drawer scrolls, links ≥ 44px,
      no accidental overlay-taps while scrolling
- [ ] No horizontal scrolling on any page at 320px width
- [ ] Zoom to 200%: nothing clips or overlaps
- [ ] Consent button comfortable to hit; after tap, video plays
- [ ] Check one page on iOS Safari (friend/BrowserStack)

## Motion & display

- [ ] Windows: Settings → Accessibility → Visual effects →
      Animation effects OFF → page loads show no entrance animations
- [ ] 200% text zoom: fluid type scales, no clipped text
- [ ] Print preview of Impressum + Datenschutz: readable, no dark
      background (print styles from tokens.css)

## Network & privacy (deployed site, DevTools open)

- [ ] Load every page with Network tab open: zero third-party requests
- [ ] No cookies set anywhere (Application → Cookies: empty)
- [ ] Medien: no YouTube request before consent click, on every video
- [ ] Blocked-cookies browser profile: site fully functional
- [ ] mailto button opens the mail client with subject/body intact
      (Umlaute correct — encodeURIComponent path)

## Browsers

- [ ] Chrome (desktop) — full pass
- [ ] Firefox (desktop) — keyboard pass only
- [ ] Edge (desktop) — spot check home + drawer
- [ ] Chrome (Android) — full mobile pass

## Results

axe: ____ violations | Lighthouse: perf __ a11y __ BP __ SEO __
Issues found: ___________________________
