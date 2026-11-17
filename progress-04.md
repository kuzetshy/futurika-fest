# Progress Report 04: Review-Ready Version

**Project:** Futurika Fest (AI & Creative Tech Summit)
**Deliverable:** Seminar 5 Assignment (Cross-Review)
**Team:** Abilkhaiyr Albet, Beibarys Askar, Karim Alisher, Iusupov Muzafar

The review-ready website is in the `web/` folder. It opens directly from `web/index.html` in a browser, with no installation, build step or server. Please read it together with `project-specification.md`, which lists the key scenarios and all specification changes (section 7).

## 1. Current Status

### Sections

| Section | Page | State |
| :--- | :--- | :--- |
| Home | `index.html` | Hero with dates and ticket call to action, festival figures, lineup by day, a photo band about the session types, the two stages, visit essentials and FAQ |
| Programme | `programme.html` | All 60 sessions in a timetable by day and time slot, with filters, search, overlap warnings and View more |
| Performers, list | `performers.html` | Directory of 60 performers with search, track filter and View more |
| Performers, detail | `performers/<slug>.html` | One page for each of the 60 performers: biography, country, track, stage and full session details |
| Stages & Venues | `stages.html` | Both stages with capacity, equipment and accessibility, linked to the filtered programme |
| Practical Info | `practical.html` | Directions, tickets, accessibility, Code of Conduct and FAQ |
| My Schedule | `my-schedule.html` | The logged-in account's saved sessions sorted by time, total duration, overlap warnings, Remove and Clear All |
| Search results | `search.html` | Results for sessions, performers, stages and visitor information |
| Create account, Log in | `register.html`, `login.html` | Account registration and login that run in the browser only (see section 2) |

Every page has the same header (search field, Tickets, Log in, My Schedule with a counter, main navigation), breadcrumbs on subpages, a page-specific FAQ and a footer with a sitemap and contact address.

### Key scenarios

| Scenario (from the specification) | Path on the website | State |
| :--- | :--- | :--- |
| 1. Find an LLM session on a phone and save it | Menu → Programme → search "LLM" or Topic "LLMs" → Save to Schedule → log in or create an account → back on the same programme view with the session saved → My Schedule | Complete |
| 2. Plan a Saturday afternoon in the Prompt & Vision Hall | Programme → Day 2 → Vision Hall → Afternoon (6 sessions) → performer page → Back keeps the filters | Complete |
| 3. Check accessibility and transport | Practical Info → Location & Directions and Accessibility, or search "tram" or "wheelchair" | Complete |

### Interactive functions

1. **Programme filters:** day, stage and time of day as buttons; session type and topic as select lists. Active filters appear as removable chips, and all filters are kept in the page address, so the Back button restores them.
2. **Programme timetable:** sessions that run at the same time are shown side by side, one column for each stage.
3. **Overlap warnings:** as soon as a session is saved, every card that runs at the same time shows which saved session it overlaps with. The message is also announced to screen readers.
4. **My Schedule:** each account has its own saved sessions in `localStorage`, sorted by time, with total duration and overlap warnings. Selecting Save while logged out opens the login page, and the session is saved right after logging in.
5. **Site search:** a search field in the header of every page and a results page. Search ignores accents, so "horakova" finds Petra Horáková.
6. **Performer search and track filter.**
7. **View more:** the programme and the performer list show 10 items first, and each select of View more adds 10.
8. **Account registration and login,** with a personal greeting in the header and a personal My Schedule.

## 2. Known Shortcomings

| Shortcoming | Impact | Plan |
| :--- | :--- | :--- |
| Portraits exist only for the 8 headliners (keynotes and live performances). The other 52 performers show their initials. | Most performer cards have no photo. | Team decision, to keep the project small; the initials keep the cards consistent. |
| Accounts are stored only in this browser. They are not real accounts: there is no server, and the same account does not work on another device. | Expected for a client-side project, but reviewers should know it. | Kept as it is. Passwords are stored only as a SHA-256 hash, never as plain text. |
| Search uses simple word matching. It has no typo tolerance and no ranking by relevance. | A misspelt word returns no results. | The no-results message suggests checking the spelling. |
| Saved data depends on `localStorage`. If the browser blocks storage, sessions and accounts are not saved. | Rare, but possible in strict privacy modes. | The site keeps working without saving and does not show errors. |
| Structured data (JSON-LD) and the SEO, AEO and GEO work required for the final version are not done yet. | No impact on the scenarios. | Planned after the cross-review. |
| Testing covered two iPhones (Safari) and desktop browsers; screen reader testing used VoiceOver on macOS only. | Problems specific to Android phones or other screen readers (such as NVDA) may remain. | Ask the reviewing team to note the device and browser for every issue they find, and test on an Android phone and with NVDA before the final version. |

There are no known blocking errors.

## 3. What We Tested and How

### Automated checks
All checks ran on all 69 HTML pages in `web/` (9 main pages and 60 performer pages), opened from local files.

| Check | Tool and method | Result |
| :--- | :--- | :--- |
| HTML validity | Nu HTML Checker (`vnu-jar` 20.6.30) | 0 errors |
| Accessibility | axe-core 4.10, WCAG 2.0 A and AA rules plus best practices, at 390 px | 0 violations |
| Horizontal overflow | Chromium at 320, 390, 768, 1024, 1280 and 1920 px (main pages) and at 320 and 1280 px (performer pages) | None |
| Control size | Every visible button, input, select and button-style link measured at 390 px | None below 44 px |
| Links and anchors | Every local link and `#anchor` checked against the files | No broken links |
| Headings | One `h1` per page and no skipped levels | Passed |
| JavaScript errors | Browser error and console events during every page load and scenario | None |
| Key Scenario 1 | Automated mobile walkthrough: Menu, Programme, search "LLM", Topic "LLMs", save, My Schedule | Passed |
| Key Scenario 2 | Day 2 + Vision Hall + Afternoon returns 6 sessions; the performer page opens; Back keeps the filters | Passed |
| Key Scenario 3 | Header search "tram" finds Location & Directions on a phone-sized screen | Passed |
| Overlap warning | Saved two sessions in the same slot | The warning appears on both cards at once; My Schedule shows 2 warnings |
| Accounts | Register, mismatching passwords, existing email, log out, wrong password, correct password, return to the original page | All messages and redirects work; the password is not stored as plain text |
| My Schedule with accounts | Save while logged out → login page → create an account → back on the filtered programme; a second account; log out; Save from a performer page | The session is saved automatically and announced; each account sees only its own sessions; after logging out the counter shows 0 and My Schedule asks to log in |
| Unsafe return address | `login.html?from=https://evil.example/...` | Ignored; the page returns to `index.html` |
| View more | 10 items, then 20; the address keeps `show=20` after reload; a new filter resets to 10 | Passed |
| Reduced motion | System setting "reduce motion" emulated | All animations are switched off |
| Data consistency | `js/data.js` compared with `data.json` and `data.xml`; performer pages generated from `data.json` | Identical |

### Manual checks
| Check | Who | Device and browser | Result |
| :--- | :--- | :--- | :--- |
| Screenshots of every page at mobile, tablet and desktop width | Abilkhaiyr Albet with AI | Chromium | Found and fixed: timetable columns in the wrong rows, repeated time on cards, an unclear schedule button on small screens, header wrapping at 320 px, a missing space in the lineup |
| Mobile layout, menu and header search | Abilkhaiyr Albet | Safari, Responsive Design Mode | Everything fits well |
| Real phone | Beibarys Askar | iPhone 14, Safari | Menu, filters, saving and login work |
| Other browser | Karim Alisher | Firefox | Menu, filters, saving and login work |
| Keyboard only | Iusupov Muzafar | Chrome | Menu, filters, saving and login work |
| Real phone, current version (opened through GitHub Pages) | Abilkhaiyr Albet | iPhone 13, Safari | All three key scenarios, login, saving, overlap warnings and portraits work; no layout problems |
| Screen reader | Karim Alisher | VoiceOver on macOS, Safari | Key Scenario 1, login and registration errors, saving, My Schedule, menu and FAQ announced as expected |


## 4. Current UX Practices and Their Sources

In response to the instructor's feedback on Seminar 4 ("no source links or documented research"), each practice below names its source and what we took from it.

| Practice | Source | How we applied it |
| :--- | :--- | :--- |
| Festival website structure | [coachella.com](https://www.coachella.com/)| We adopted the patterns, not the design: dates next to the logo, one main ticket call to action in the header, a lineup grouped by day with headliners in larger type, three visit cards (icon-free in our version), FAQ reachable from several places, and a footer sitemap. We did not adopt its drop-down menus, social media links or legal pages. |
| No modal dialogs for content | [NN/g: Modal & Nonmodal Dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/) | Performer profiles are full pages and My Schedule is a page, not a pop-up. This also answers the instructor's feedback on Seminar 3. |
| Load more instead of one endless list | [NN/g: Infinite Scrolling](https://www.nngroup.com/articles/infinite-scrolling-tips/) | View more shows 10 items at a time, so the FAQ and footer stay reachable, and focus moves to the first new card. |
| Visible applied filters | [NN/g: Applying Filters](https://www.nngroup.com/articles/applying-filters/) | Filters apply instantly, and every active filter appears as a chip that can be removed on its own. |
| Visible search on every page | [NN/g: Search, Visible and Simple](https://www.nngroup.com/articles/search-visible-and-simple/) | The search field is in the header of every page; on phones it is the first item in the menu. |
| Breadcrumbs | [NN/g: Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/) | Every subpage shows its place in the hierarchy; the current page is not a link. |
| Accordion FAQ | [NN/g: Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/), [MDN: details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) | Short questions open in place with the native `details` element, which works with the keyboard and without JavaScript. |
| Clear form errors | [NN/g: Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/), [WCAG: Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html) | Login and registration errors are written in text, say what to do next, and move focus to the field to fix. |
| Mobile-first layout | [web.dev: Responsive web design basics](https://web.dev/articles/responsive-web-design-basics) | Base styles target phones; `min-width` queries add the timetable columns and the desktop header. |
| Touch target size | [WCAG: Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html) | Buttons, inputs and button-style links are at least 44 px high. |
| Status messages for screen readers | [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) | Result counts, saves and overlap warnings are announced. |
| Motion that respects user settings | [WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html), [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | Scroll and entrance animations are short and decorative, and they are switched off when the user asks for reduced motion. |
| Information not by colour alone | [WCAG: Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html) | Overlap warnings, stages and saved states are always written in text as well as coloured. |
| No plain-text passwords | [OWASP: Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) | Passwords are hashed with SHA-256 before they are stored. A real service would also need a server, salting and a slow hash, which is outside this client-side project. |

## 5. Changes Since Seminar 4 and Why

| Change | Reason |
| :--- | :--- |
| Programme shown as a timetable, with overlap warnings on the cards | Instructor feedback: "Programme layout! Overlaps (too late in My Schedule)" |
| All emoji removed from the interface, without replacement icons | Instructor feedback: "Try to avoid emoticons" |
| Performer detail pages, site search, session type and topic filters | Planned in the specification (change log items 1, 3 and 5) and required for the final website |
| New home page, header and footer, FAQ on every page, animations, images | Instructor feedback: "Still prototype"; research of festival websites (section 4) |
| Account registration and login | Team decision after comparing other teams' presentations at the seminars; approved by the instructor by email (specification change 12) |
| My Schedule linked to the account, with Save leading to the login page when logged out | Team decision after adding accounts; approved by the instructor by email (specification change 13) |
| View more on the programme and performer list | Team review of the new version: a list of 60 cards was too long to scroll, especially on a phone |

## 6. Use of AI and Verification of AI Outputs

- **AI tools:** Claude Opus 5.5 in Claude Code and Google Gemini (all images). Earlier stages used Claude 3.5 Sonnet and GPT-4o.
- **What AI was used for:** writing the HTML, CSS and JavaScript; generating the 60 performer pages from `data.json` with a small Python script (the website itself needs no build step); writing FAQ answers from facts already on the site; finding UX sources; generating images.
- **Example requests**:
  - "Make it like coachella.com: don't copy it, but use the same patterns, and don't move far from our current theme."
  - "First create an account, then log in. The greeting should show the name we entered, not the email."
  - "Show about ten programme items first, then a View more button."
  - Image prompt (Gemini): "photorealistic professional headshot… plain very dark navy background, thin emerald green rim light… fictional people only."
- **How we checked the outputs:** the automated tests in section 3, which we ran again after every change; screenshots at several widths; a manual walkthrough of the scenarios; every link in section 4 was opened; FAQ answers were compared with the facts on the site.
- **What we accepted:** the timetable layout, overlap warnings, performer pages, site search, View more and the account forms.
- **What we modified or rejected:**
  - AI suggested replacing emoji with SVG icons. We rejected it and removed the emoji without replacement.
  - AI suggested drop-down menus like Coachella. We kept a flat menu, because drop-down panels are the kind of pop-out the instructor warned about.
  - AI first advised against a login, because there is no server. The team decided to add it, and AI then added hashing and clear error messages. The instructor approved it and noted that a simulated login would be enough; we kept the working password check.
  - AI added a "Demo only" note to the login page. We removed it from the site and describe the limitation in this report instead.
  - Page transition animations (View Transitions) were removed after testing, because they caused JavaScript errors when the site is opened from local files.
  - Two AI portraits looked almost identical to other portraits and were regenerated with clearer differences (age, glasses, beard, hair).
  - The image prompts left the gender open where a biography does not state it; we chose it ourselves in Gemini.
- **Errors and limitations we found:**
  - In the first version of the timetable, Vision Hall sessions appeared one row too low because the stages were sorted alphabetically.
  - The programme repeated each time twice.
  - Removing the emoji left the schedule button with only a number on small screens.
  - Automated tests cannot judge how the images look or whether texts read naturally, so these were checked by people.
