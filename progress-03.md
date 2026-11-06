# Progress Report 03: First Functional Implementation

**Project:** Futurika Fest (AI & Creative Tech Summit)
**Deliverable:** Seminar 4 Assignment
**Team:** Abilkhaiyr Albet, Beibarys Askar, Karim Alisher, Iusupov Muzafar

## 1. What Has Been Implemented

The current website is in the `web/` folder. It is built on the Seminar 3 prototype and keeps its design and components. It uses HTML, CSS and JavaScript only, and opens directly from `web/index.html` without any installation.

| Requirement | Implementation |
| :--- | :--- |
| Home page | `index.html` introduces the festival, its dates and venue, keynotes, stages and visit information |
| Page with substantially different content | `programme.html`, `performers.html`, `stages.html`, `practical.html` and `my-schedule.html` |
| Functional main navigation | The same navigation is on every page, with a Menu button on small screens and the current page marked |
| Responsive mobile-first design | Base styles target small screens, and `min-width` queries at 26rem, 768px and 62rem extend the layout |
| Functional interactive features | See the list below |
| Semantic HTML | `header`, `nav`, `main`, `section`, `article`, `footer`, `time`, `address`, lists, a table for ticket prices, and form labels |
| CSS | One stylesheet, `css/styles.css` |
| JavaScript as needed | `js/app.js`, plus `js/data.js`, which is a copy of `data.json` for use in the browser |

Interactive features:

1. **Programme filters:** filter sessions by day, stage and time of day. Active filters appear as removable tags, and the filters stay in the page address.
2. **Programme search:** search titles, performers, descriptions and topics.
3. **My Schedule:** save and remove sessions. The list is stored in `localStorage`, sorted by time, and warns when two saved sessions overlap.
4. **Performer search and filter:** search performers and filter them by track.
5. **Expandable details:** performer profiles and FAQ answers open in place.

## 2. Current Best Practices and Trends in UX and Design

| Practice | How it is implemented |
| :--- | :--- |
| Mobile-first design | Styles start from the smallest layout and grow with `min-width` queries |
| Native HTML components | `details`, `button` and `input` are used, so keyboard support comes from the browser |
| Content in place of popups | Details open within the page, which keeps the user's position and works on small screens |
| Touch-friendly controls | Controls are at least 44 px high (2.75rem) |
| Visible keyboard focus | `:focus-visible` shows a clear outline, and every page has a skip link |
| Status feedback | Result counts use `role="status"`, so screen readers can announce changes |
| Dark interface | The prototype's dark theme is kept, and axe found no contrast violations |

## 3. What Has Changed Compared with the Prototype, and Why

| Change | Reason |
| :--- | :--- |
| Performer and My Schedule popups were removed. Profiles open within the performer card, and My Schedule has its own page. | Instructor feedback: "carefully with popouts such as in Performers View Profile". The popups were also clipped on mobile, and keyboard focus could move behind them. |
| One single-page file was split into separate pages with real links. | Pages now have their own address, and the browser Back button works. |
| The mobile header was rebuilt. | In the prototype, the Menu button sat outside the screen at 390 px because the header was too wide. |
| Sessions are sorted by time across both stages. | The prototype listed all sessions of one stage before the other. |
| The Track filter in the programme was replaced by a Time filter. | Track matched stage exactly, so the filter duplicated the Stage filter. Time of day supports Key Scenario 2. |
| Festival data was rewritten and extended. | Performer biographies and session descriptions came from templates and contained broken sentences. Times, stages and IDs did not change. |
| The "Clear All" browser dialog was replaced by a second click on the same button. | It avoids another popup. |
| The footer no longer claims WCAG compliance, and the PROTOTYPE badge was removed. | The claim was not verified, and the site is no longer a prototype. |
| Stage illustrations were added. | The prototype had no images. |

These corrections also apply to `progress-02.md`, which reported no horizontal overflow, 44 px controls on all elements and cleaned performer texts. A later audit found these statements were not accurate for the prototype.

Planned for the next stage according to `project-specification.md`: dedicated performer detail pages, a search results page, and the session type and topic filters.

## 4. Tests and Checks

All checks ran on the six pages in `web/`, opened from local files in Chromium.

| Check | Method | Result |
| :--- | :--- | :--- |
| Accessibility | axe-core, WCAG 2.0 A and AA rules plus best practices, with `details` open | 0 violations |
| HTML validity | Nu HTML Checker (`vnu-jar` 20.6.30) | 0 errors or warnings |
| Horizontal overflow | Automated check at 320, 360, 390, 768, 900, 991, 992, 1024, 1280 and 1920 px | None |
| Control size | Automated check at 390 px | No control below 44 px; inline links are excluded |
| Links and images | Automated check of all local paths | No broken paths |
| Heading order | Automated check of `h1` to `h4` | One `h1` per page and no skipped levels |
| JavaScript errors | Browser error events during page load and scenarios | None |
| Key Scenario 1 | Automated mobile walkthrough: Menu, Programme, search "LLM", save Petra Horáková's session, open My Schedule | Passed |
| Key Scenario 2 | Automated mobile walkthrough: Day 2, Vision Hall and Afternoon show 6 sessions in time order; selecting a performer opens the profile; the Back button restores the filters | Passed. The profile opens in the performer list, and a dedicated page is planned |
| Key Scenario 3 | Automated mobile walkthrough: Menu, Practical Info, directions, accessibility accordion item | Passed |
| My Schedule | Saved two sessions at the same time, removed one, then cleared the list | Overlap warning shown; removal and clearing work |
| Popups | Checked for dialog and modal elements on the Performers page | None |
| Safari emulation | Safari Responsive Design Mode, iPhone viewport | Working correct |
| Real phone | [Iphone 12 Pro ] | Working Correct  |



## 5. Use of AI and Verification of AI Outputs

- **AI tools:** Claude 3.5 Sonnet and GPT-4o on earlier stages, and Claude Opus 5.5 in Claude Code on this stage.
- **What AI was used for:** auditing the prototype, rewriting festival texts, and writing the HTML, CSS and JavaScript.
- **Example request:** "Check everything against the requirements, look at how the website appears and suggest tasks."
- **How the outputs were checked:** with the automated tests above, a review of screenshots at mobile and desktop widths, and a comparison of `data.json` with `data.xml`. Tram information was checked against public sources.
- **What was accepted:** the page structure, the fixes to the prototype and the rewritten festival texts.
- **What was modified or rejected:**
  - The first AI-built version had 68 generated pages, a site generator, custom fonts and extra SEO files. We rejected it as too complex for this stage.
  - The second version used a new light design. We rejected it and asked for the Seminar 3 prototype to be used as the template, which keeps the design consistent with our earlier submission.
  - The AI used invented affiliations with real institutions and names resembling real people, and these were replaced.
- **Limitations identified:** the AI first produced template-like text, and its earlier verification claims in `progress-02.md` did not hold up when tested in a browser. Automated checks also do not replace testing with real devices and users.
