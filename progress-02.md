# Progress Report 02: UX Design, Prototype & Interactive Functions

**Course:** Web Design (INFO EN)  
**Project:** Futurika Fest (AI & Creative Tech Summit)  
**Deliverable:** Seminar 3 Assignment  
**Team Members:** Team of 4  

---

## 1. List of Proposed Interactive Functions & Relationship to User Needs

In accordance with the Seminar 3 requirements, our interactive prototype introduces **three meaningful client-side interactive functions** specifically mapped to the needs of our target audience (Software Engineers, Digital Artists, and Tech Enthusiasts):

### Function 1: Multi-Criteria Programme Filter (Day & Stage Filtering)
* **What it does:** Allows users to switch seamlessly between Festival Days (Day 1: May 21, Day 2: May 22, Day 3: May 23) and filter sessions by Stage (*Prompt & Vision Hall* vs *Tech & Code Lab*).
* **User Need Addressed:** Solves information overload. With 60 distinct sessions in `data.json`, visitors need to quickly see what is happening right now or plan a specific afternoon without scrolling through the entire 3-day timetable.

### Function 2: Real-Time Live Text Search & Topic Filtering
* **What it does:** An instant, client-side search input that dynamically filters schedule cards and performer names as the user types (e.g., searching "LLM", "Diffusion", "Rust", "Ethics", or specific speaker surnames).
* **User Need Addressed:** Directly serves our technical target group (engineers and ML specialists) who attend the summit with specific technical interests and want to immediately locate relevant deep-dives or workshops without navigating multiple menus.

### Function 3: Personal Schedule & Bookmarking ("My Agenda / Favorites" with LocalStorage)
* **What it does:** Users can click a "⭐ Save to Schedule" button on any talk or workshop. The talk is added to a persistent client-side list with a real-time counter in the navigation bar (`⭐ My Schedule [n]`). The saved state persists across page refreshes via browser `localStorage`. A modal allows viewing the curated personal schedule.
* **User Need Addressed:** Directly satisfies **Key Scenario 1** from our Project Specification. Festival attendees on mobile devices need an offline-capable, friction-free way to bookmark sessions they plan to attend on-site at DOX Prague without creating an account or logging in.

---

## 2. Verification and Testing of the Prototype

To ensure the prototype satisfies usability, accessibility, and architectural standards prior to full-scale HTML/CSS implementation, the team conducted preliminary evaluations:

1. **Scenario Walkthrough Testing:**
   * **Scenario 1 Walkthrough:** Successfully tested finding an edge AI talk (searching "LLM" -> finding Petra Horáková's session -> clicking "⭐ Save to Schedule" -> verifying persistence in My Agenda).
   * **Scenario 2 Walkthrough:** Successfully tested filtering Day 2 for "Prompt & Vision Hall" to inspect afternoon generative art installations.
2. **Mobile-First & Viewport Responsiveness Verification:**
   * Tested viewport scaling across simulated devices in Chromium DevTools (iPhone 14/15, Pixel 7, and Desktop 1440px).
   * Verified that touch targets for filter pills and action buttons maintain a minimum tap size of 44x44 px.
   * Confirmed zero horizontal overflow (`overflow-x: hidden`) on narrow viewports (375 px).
3. **Semantic HTML & WCAG Accessibility Checks:**
   * Verified heading hierarchy ($h1 \rightarrow h2 \rightarrow h3$).
   * Form inputs include descriptive labels / ARIA attributes (`aria-label="Search programme"`).
   * High-contrast color palette compliant with WCAG 2.0 AA color contrast ratios (> 4.5:1).

---

## 3. Use of Generative AI & Output Verification

As mandated by the course guidelines, generative AI tools were used transparently as design and conceptual accelerators, followed by critical human review:

* **AI Tools Utilized:**
  * Claude 3.5 Sonnet / OpenAI GPT-4o for drafting wireframe layouts, generating cohesive talk abstracts, and structuring JSON datasets.
* **Representative Prompts:**
  * *"Generate a clean, mobile-first responsive wireframe layout for a high-tech festival schedule featuring filter tabs for 3 days and 2 stages."*
  * *"Draft realistic keynote and workshop descriptions bridging generative AI and digital arts for 60 distinct international speakers."*
* **Verification and Critical Revisions:**
  * **What we accepted:** The minimalist dark-mode design layout, typographic hierarchy, and the client-side `localStorage` state management logic for session bookmarking.
  * **What we modified/rejected:** Initial AI-suggested UI relied on third-party CDNs (Bootstrap and FontAwesome) and external React components. We strictly rejected these suggestions to conform to the course limitation: **zero external build pipelines, pure vanilla HTML/CSS/JavaScript with zero third-party dependencies**.
  * **Identified limitations:** AI generated duplicate timestamps across stages in the initial draft, which we caught during human review and normalized into consistent 45-minute non-overlapping slots.
  