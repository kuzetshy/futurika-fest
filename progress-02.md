# Progress Report 02: UX Design, Prototype & Interactive Functions

**Course:** Web Design (INFO EN)  
**Project:** Futurika Fest (AI & Creative Tech Summit)  
**Deliverable:** Seminar 3 Assignment  
**Team Members:** Team of 4  

---

## 1. List of Proposed Interactive Functions & Relationship to User Needs

In accordance with the Seminar 3 requirements, our interactive prototype introduces **five meaningful client-side interactive functions** specifically mapped to the needs of our target audience (Software Engineers, Digital Artists, and Tech Enthusiasts):

### Function 1: Multi-Criteria Programme Filter (Day, Stage & Track Filtering)
* **What it does:** Allows users to switch seamlessly between Festival Days (Day 1: May 21, Day 2: May 22, Day 3: May 23), filter sessions by Stage (*Prompt & Vision Hall* vs *Tech & Code Lab*), and narrow down by Track (*Vision & Creative Tech* vs *Core AI & Engineering*).
* **User Need Addressed:** Solves information overload. With 60 distinct sessions in `data.json`, visitors need to quickly see what is happening right now or plan a specific afternoon without scrolling through the entire 3-day timetable.

### Function 2: Real-Time Live Text Search & Topic Filtering
* **What it does:** An instant, client-side search input that dynamically filters schedule cards and performer names as the user types (e.g., searching "LLM", "Diffusion", "Rust", "Ethics", or specific speaker surnames). Operates with zero page reload.
* **User Need Addressed:** Directly serves our technical target group (engineers and ML specialists) who attend the summit with specific technical interests and want to immediately locate relevant deep-dives or workshops without navigating multiple menus.

### Function 3: Personal Schedule & Bookmarking ("My Agenda / Favorites" with LocalStorage)
* **What it does:** Users can click a "☆ Save to Schedule" button on any talk or workshop. The talk is added to a persistent client-side list with a real-time counter in the navigation bar (`⭐ My Schedule [n]`). The saved state persists across page refreshes and browser restarts via `localStorage`. A modal allows viewing the curated personal schedule with total session count and easy removal.
* **User Need Addressed:** Directly satisfies **Key Scenario 1** from our Project Specification. Festival attendees on mobile devices need an offline-capable, friction-free way to bookmark sessions they plan to attend on-site at DOX Prague without creating an account or logging in.

### Function 4: Contextual Performer Profile & Talk Abstract Inspector Modal
* **What it does:** Clicking on any speaker name in the schedule or browsing the Performers directory opens a detailed modal profile containing the speaker's photo avatar, professional role, complete biography, and a linked list of all sessions they are delivering at the summit with one-click bookmarking.
* **User Need Addressed:** Directly satisfies **Key Scenario 2** from our Project Specification. Allows digital artists and attendees to research speaker credentials, understand artistic or technical contexts, and confirm venue details without losing their place in the schedule.

### Function 5: Single-Page Information Architecture Navigation & Interactive FAQ Accordion
* **What it does:** A responsive persistent top navigation bar (with mobile hamburger drawer) connecting all key parts of the website (Home, Programme, Performers, Stages, Practical Info) as fluid client-side views. The Practical Info view features an interactive FAQ accordion with smooth open/collapse interactions.
* **User Need Addressed:** Fulfills the requirement to "address navigation and the basic information hierarchy" and directly satisfies **Key Scenario 3** (accessing transportation, venue accessibility, and logistical FAQs).

---

## 2. Verification and Testing of the Prototype

To ensure the prototype satisfies usability, accessibility, and architectural standards prior to full-scale HTML/CSS implementation, the team conducted structured evaluations:

1. **Scenario Walkthrough Testing:**
   * **Key Scenario 1 Walkthrough (Developer Bookmarking):** Successfully tested finding an edge AI talk (searching "LLM" $\rightarrow$ finding Petra Horáková's session $\rightarrow$ clicking "☆ Save to Schedule" $\rightarrow$ verifying persistent badge increment and appearance in My Agenda modal across browser reloads).
   * **Key Scenario 2 Walkthrough (Artist Exploring Day 2 Afternoon):** Successfully tested filtering Day 2 for "Prompt & Vision Hall" to inspect afternoon generative art sessions $\rightarrow$ clicking speaker name $\rightarrow$ inspecting speaker bio and confirming DOX+ auditorium location in the modal.
   * **Key Scenario 3 Walkthrough (Student Logistical Check):** Successfully tested navigating to "Practical Info" $\rightarrow$ checking transit routes from Metro C Holešovice $\rightarrow$ toggling the FAQ accordion to check badge check-in and power outlet availability.

2. **Mobile-First & Viewport Responsiveness Verification:**
   * Tested viewport scaling across simulated mobile and desktop screens in Chromium DevTools (iPhone 14/15 at 390px, Pixel 7 at 412px, Tablet at 768px, and Desktop at 1200px+).
   * Verified that all touch targets for filter pills, navigation items, and action buttons strictly maintain a minimum tap size of **44x44 px** (WCAG 2.1 Success Criterion 2.5.5 / 2.5.8).
   * Confirmed zero horizontal overflow (`overflow-x: hidden`) on narrow mobile viewports.

3. **Semantic HTML & WCAG Accessibility Checks:**
   * Validated heading hierarchy ($h1 \rightarrow h2 \rightarrow h3$) across all modular views.
   * Form inputs include descriptive labels and `aria-label` attributes (`aria-label="Search programme by title, speaker or description"`).
   * Modals include `role="dialog"`, `aria-modal="true"`, accessible close buttons, and keyboard support (pressing <kbd>Escape</kbd> closes open modals).
   * High-contrast dark theme compliant with WCAG 2.0 AA contrast ratios (> 4.5:1 for normal text, > 3:1 for large text and UI components).
   * Added a functional skip-to-content link for keyboard screen-reader navigation.

---

## 3. Use of Generative AI & Output Verification

As mandated by the course guidelines, generative AI tools were used transparently as design and conceptual accelerators, followed by critical human engineering review:

* **AI Tools Utilized:**
  * Claude 3.5 Sonnet / OpenAI GPT-4o for drafting responsive layout wireframes, generating varied speaker profiles and talk abstracts, and structuring JSON datasets.
* **Representative Prompts:**
  * *"Generate a clean, mobile-first responsive wireframe layout for a high-tech festival schedule featuring filter tabs for 3 days and 2 stages."*
  * *"Draft realistic keynote and workshop descriptions bridging generative AI and digital arts for 60 distinct international speakers with non-conflicting time slots."*
* **Verification and Critical Revisions:**
  * **What we accepted:** The sleek dark-mode aesthetic, modular card layout, typographic scale, and the client-side `localStorage` state management logic for session bookmarking.
  * **What we modified/rejected:** Initial AI suggestions included external CDN scripts (Bootstrap, Tailwind CDN, and FontAwesome icons) and heavy React bundles. We strictly rejected these suggestions to conform to the course limitation: **zero external build pipelines, zero runtime package managers, pure vanilla HTML/CSS/JavaScript with zero third-party dependencies**.
  * **Identified limitations:** The raw AI generation produced identical template bio strings for several speakers and overlapping timestamps across stages. We manually reviewed and normalized all 60 programme items into structured, non-conflicting 45-minute slots across the two stages, and validated data integrity using automated consistency checks.