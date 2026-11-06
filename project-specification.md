# Project Specification: Futurika Fest (AI & Creative Tech Summit)

> Revised for the Seminar 4 implementation. All changes to the original specification and their justification are listed in [section 7](#7-specification-change-log).

## 1. Festival Identity
| Parameter | Description |
| :--- | :--- |
| **Name** | Futurika Fest: AI & Creative Tech Summit |
| **Edition / Year** | 5th Edition / 2027 |
| **Location** | DOX Centre for Contemporary Art & DOX+ Hall, Poupětova 1, Prague 7, Czech Republic |
| **Date Range** | Friday, 21 May 2027 – Sunday, 23 May 2027 (3 days) |
| **Type / Character** | International festival & tech summit of generative AI, creative coding, digital media arts, and open-source software engineering |
| **Main Genres & Themes** | Generative AI & Digital Art, LLM Systems & Autonomous Agents, Interactive Spatial Audio/Visuals, Edge Computing & Open Weights, AI Ethics & European AI Act |

---

## 2. Purpose of the Website
The website serves as the primary digital touchpoint, schedule manager, and interactive exploration platform for visitors, researchers, developers, and digital creators attending the Futurika Fest.

### Main Objectives
- Provide a clear, comprehensive, and accessible presentation of the 3-day programme across both specialized stages.
- Enable attendees to quickly find speakers, topics, and technical tracks using instant search and multi-criteria filters.
- Allow visitors to curate their own personalized festival agenda (My Schedule) that persists in local storage.
- Clearly present logistical, travel, accessibility, and ticketing information for attending DOX Prague.
- Deliver an exemplar of modern client-side web standards: fully responsive (mobile-first), semantic HTML5, WCAG 2.0 Level AA accessibility, and zero external build runtime requirements.

### Important User Actions
1. Filter the schedule by day (Day 1, 2, 3), stage, time of day, session type, or topic (e.g., *LLMs*, *Python*, *Rust*, *RAG & Search*).
2. Instantly search for specific performers, technologies (e.g., "FastAPI", "Diffusion", "Rust", "Agents"), or presentation titles.
3. Add and remove sessions to/from a personal agenda ("My Schedule") stored locally in the browser, and see when two saved sessions overlap.
4. Open a dedicated detail page for each performer, including their biography, session abstract, and venue location.
5. Review essential practical information (tickets, directions to DOX+, venue accessibility, schedule time slots, FAQ).

---

## 3. Target Groups

### Target Group 1: Software Engineers & Data Scientists (Technical Attendee)
- **Profile:** Developers, ML researchers, and CS university students interested in hands-on code, open weights, model deployment, and backend architecture.
- **Needs:** Fast access to technical workshop details, speaker credentials, exact time slots, and prerequisites for coding labs.
- **Expectations:** Crisp technical summaries, clear tag-based filtering by stack (Python, Rust, LLM, RAG), and quick navigation without visual bloat.

### Target Group 2: Digital Creatives & Media Artists (Creative Attendee)
- **Profile:** UI/UX designers, visual jockeys, 3D artists, filmmakers, and digital curators looking for generative inspiration and creative workflows.
- **Needs:** Visual showcase of creative installations, performance descriptions, interactive demo times in the Vision Hall, and speaker backgrounds.
- **Expectations:** Sleek, modern visual identity, rich descriptions of creative themes, and intuitive mobile browsing while walking around the venue.

### Target Group 3: Tech Generalists & Visiting Public (General Attendee / Student)
- **Profile:** University students, tech enthusiasts, and tourists curious about the practical impact of AI on society, design, and culture.
- **Needs:** Practical visitor logistics (venue location, public transport connections, tickets, timetable), beginner-friendly keynote highlights, and FAQ.
- **Expectations:** Simple navigation, crystal-clear mobile view, easily readable typography, and quick answers to logistical questions.

---

## 4. Information Architecture

### Sitemap & Structure
```text
Futurika Website
├── Home Page (index.html)
│   ├── Hero Section (Festival dates, location, core premise)
│   ├── Festival Highlights & Curated Keynotes
│   ├── Stages & Experience Overview
│   └── Quick Logistics & Call to Action
├── Programme (programme.html)
│   ├── Interactive Day Filter Tabs (Day 1 / Day 2 / Day 3)
│   ├── Stage, Time of Day, Session Type & Topic Filters
│   ├── Chronological Schedule List (with Save to My Schedule controls)
│   └── Real-time Text Search Bar
├── Performers (performers.html)
│   ├── Performer Directory Grid with Track Badges and Search
│   └── Performer Detail Pages (performers/<slug>.html, one page for each of the 60 performers)
│       └── Biography, session abstract, level, prerequisites, stage link, Save to My Schedule
├── Stages & Venues (stages.html)
│   ├── Stage 1: Prompt & Vision Hall (DOX+)
│   └── Stage 2: Tech & Code Lab (Innovation Hub)
├── Practical Info (practical.html)
│   ├── Tickets
│   ├── Venue Directions & Public Transit (Nádraží Holešovice / Ortenovo náměstí)
│   ├── Accessibility & Facilities Accordion
│   ├── Code of Conduct
│   └── FAQ Accordion
├── My Schedule (my-schedule.html)
│   └── Persistent client-side list of saved sessions, sorted by time, with total duration counter and overlap warning
└── Search Results (search.html)
    └── Results across sessions and performers for the query entered in the site-wide search field
```

### Purpose of Each Main Section
- **Home Page (`index.html`):** Welcomes visitors and introduces the festival's identity, core theme (Generative AI & Creative Tech), date range, and DOX Prague location. Provides curated keynote highlights, venue sneak peeks, and direct calls-to-action for tickets (`practical.html#tickets`) and programme exploration.
- **Programme (`programme.html`):** The primary schedule management tool. Delivers the complete 3-day chronological agenda (60 items across 2 stages) with multi-criteria filtering by day, stage, time of day, session type, and topic, instant real-time keyword search, and local bookmarking into "My Schedule".
- **Performers (`performers.html`):** A searchable directory of all 60 international and Czech speakers, engineers, and digital artists. Offers track filtering (*Vision & Creative Tech* vs *Engineering & Core AI*) and links to a dedicated detail page for each performer.
- **Performer Detail Pages (`performers/<slug>.html`):** Individual pages with a stable URL presenting the performer's biography, role, country, and full session details, with links back to the programme and to the stage. They work on every device, with the browser Back button, and can be shared or indexed by search engines.
- **Stages & Venues (`stages.html`):** Spatial and technical orientation guide detailing the two distinct festival venues: *Prompt & Vision Hall* (DOX+ Hall, 450 seats) for immersive media and keynotes, and *Tech & Code Lab* (Innovation Hub, 250 seats) for live-coding and agentic workshops.
- **Practical Info (`practical.html`):** Logistical hub providing ticket information, public transit directions (Metro C / Tram stops in Prague 7 Holešovice), wheelchair accessibility standards, attendee code of conduct, and an interactive FAQ accordion.
- **My Schedule (`my-schedule.html`):** Client-side personal itinerary manager powered by `localStorage`. Allows visitors to curate and reference their custom session lineup on-site without needing an account, sorted by time and with a warning when two saved sessions overlap.
- **Search Results (`search.html`):** Displays matching sessions and performers for the query submitted through the site-wide search field, with links to the relevant detail content.

### Main Navigation & Interconnections
- **Header Navigation:** Clean persistent navbar linking directly to `Home`, `Programme`, `Performers`, `Stages`, `Practical Info`, a site-wide search field, and a link to `My Schedule` with a badge showing the count of saved sessions (`My Schedule [0]`).
- **Contextual Linking:** Every performer card links to the performer's detail page, which shows their programme item. Programme items link to stage descriptions and performer detail pages.
- **Breadcrumbs:** Provided across subpages to maintain clear structural hierarchy and easy backtracking.
- **Terminology:** The interface consistently uses *Performer* (never Speaker or Artist as a section label), *Session* (a programme item), and *My Schedule* (never Agenda or Favorites).

---

## 5. User Scenarios

### Scenario 1: Quick Search and Saving a Tech Workshop on Mobile (Key Scenario 1)
- **User Type:** ML Software Developer attending via smartphone while taking the tram.
- **Goal:** Find an engineering session on local LLM deployment and bookmark it to the personal schedule.
- **Initial Situation:** The user opens the festival website on a mobile browser (`Safari / Chrome`) and lands on the homepage.
- **Path & Expected Outcome:**
  1. The user taps the primary mobile menu or "Explore Programme" CTA.
  2. In the Programme view, the user taps the search bar and types "LLM" or selects the "LLMs" topic filter.
  3. The list updates instantly, revealing *Petra Horáková's* session: *"Local LLMs on Edge Hardware: Optimizing 7B Models for MacBook Air"*.
  4. The user taps the "Save to My Schedule" button.
  5. The My Schedule counter increments to `1`, visual confirmation appears, and the session is saved in `localStorage`. When opening "My Schedule", the session is prominently listed with its exact time slot.

### Scenario 2: Planning an Afternoon of Digital Art Performances (Key Scenario 2)
- **User Type:** Digital Media Artist and Prague tourist visiting on Saturday (Day 2).
- **Goal:** Discover which generative art and visual performances occur in the *Prompt & Vision Hall* on Day 2 between 14:00 and 18:00.
- **Initial Situation:** The user arrives at DOX Prague, navigates to the Programme section on mobile/laptop.
- **Path & Expected Outcome:**
  1. The user selects the **Day 2 (22 May)** tab.
  2. The user toggles the stage filter to **Prompt & Vision Hall**.
  3. The user selects the **Afternoon** time filter, and the schedule chronologically displays the afternoon sessions, including four that start between 14:00 and 18:00 (e.g., *Maya Lin-Schumacher's* generative fashion at 14:30 and *David Miller's* co-creation performance at 15:30).
  4. The user clicks on the performer's name to open their detail page, reads the biography and session abstract, confirms the hall location in DOX+, and returns to the filtered programme with the browser Back button.

### Scenario 3: Checking Venue Accessibility and Transport Directions (Key Scenario 3)
- **User Type:** Visiting international student attending for the first time.
- **Goal:** Check wheelchair accessibility and the nearest public transit stop to DOX Prague.
- **Initial Situation:** The user is on the home page and needs immediate logistical info.
- **Path & Expected Outcome:**
  1. The user clicks **Practical Info** in the top navigation.
  2. The user reads the transport guidelines (Metro C to Nádraží Holešovice, Tram 6/12 to Ortenovo náměstí).
  3. The user opens the "Accessibility & Facilities" accordion, verifying step-free access to both DOX+ and the Tech Lab.

---

## 6. Data Foundation Summary
- **Format:** Both `data.json` and `data.xml` are provided in the project root directory.
- **Festival Scope:**
  - **Days:** 3 Days (21–23 May 2027).
  - **Venues / Stages:** 2 Distinct Stages (`stage-vision` and `stage-tech`).
  - **Performers:** Exactly 60 unique international and local speakers/creators.
  - **Programme Items:** Exactly 60 structured programme items with clean, non-conflicting time slots (10 sessions per stage per day).
- **Session Attributes:** Each programme item has a `type` (Keynote, Talk, Performance, Demo, Workshop, Live Coding), a `level` (Beginner, Intermediate, Advanced), one to three `topics`, and `prerequisites` (specific to Workshop and Live Coding sessions, otherwise `None`).
- **Performer Attributes:** Each performer has a unique `slug` used for the detail page URL (`performers/<slug>.html`), and a `country`.
- **Data Consistency:** All `performer_id` and `stage_id` references within `programme` strictly match existing records in `performers` and `stages`.

---

## 7. Specification Change Log
The original structure, target groups, festival identity, schedule, and key scenarios remain in place. The changes below are limited and were made after instructor feedback and an audit of the submitted prototype.

| # | Change | Reason | Basis |
| :--- | :--- | :--- | :--- |
| 1 | Performer detail modal replaced by dedicated pages (`performers/<slug>.html`) | The course requires performer detail pages. The modal was clipped on mobile, had no URL, and did not keep keyboard focus. | Instructor feedback on the Seminar 3 submission ("carefully with popouts such as in Performers View Profile"); browser audit |
| 2 | My Schedule moved from a modal/drawer to a dedicated page (`my-schedule.html`), with an overlap warning | Same popup problems as change 1. Two stages run in parallel, so saved sessions can overlap. | Instructor feedback; browser audit |
| 3 | Search Results page (`search.html`) and site-wide search field added | Required for the final website. | Course requirements |
| 4 | Tickets section added to Practical Info | The Home page promises a ticket call to action, but no destination existed. | Specification review |
| 5 | Programme Track filter replaced by Time of Day, Session Type, and Topic filters; Track filter stays on the Performers page | Track, stage, and type matched one to one, so the Track filter duplicated the Stage filter and some combinations returned nothing. Topic filtering delivers the tag-based filtering expected by Target Group 1. | Data audit |
| 6 | Data enriched: unique performer biographies and session abstracts, real countries, `slug`, `type`, `level`, `topics`, `prerequisites` | The previous texts came from templates and contained broken sentences. Session IDs, performer IDs, stages, days, and times are unchanged. | Data audit |
| 7 | Three performers renamed; ten fictional affiliations and one session title adjusted | Names resembled real people, and fictional performers were attached to real institutions and products. | Content review |
| 8 | Scenario details corrected (afternoon example, tram stop, button labels, terminology) | Scenario 2 cited a session that mostly falls outside the stated 14:00–18:00 window. The tram stop was checked against public sources. | Scenario walkthrough; fact check |
