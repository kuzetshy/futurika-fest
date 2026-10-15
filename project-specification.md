# Project Specification: Futurika Fest (AI & Creative Tech Summit)

## 1. Festival Identity
| Parameter | Description |
| :--- | :--- |
| **Name** | Futurika: AI & Creative Tech Summit |
| **Edition / Year** | 5th Edition / 2027 |
| **Location** | DOX Centre for Contemporary Art & DOX+ Hall, Poupětova 1, Prague 7, Czech Republic |
| **Date Range** | Friday, 21 May 2027 – Sunday, 23 May 2027 (3 Days) |
| **Type / Character** | International festival & tech summit of generative AI, creative coding, digital media arts, and open-source software engineering |
| **Main Genres & Themes** | Generative AI & Digital Art, LLM Systems & Autonomous Agents, Interactive Spatial Audio/Visuals, Edge Computing & Open Weights, AI Ethics & European AI Act |

---

## 2. Purpose of the Website
The website serves as the primary digital touchpoint, schedule manager, and interactive exploration platform for visitors, researchers, developers, and digital creators attending the Futurika Fest.

### Main Objectives
- Provide a clear, comprehensive, and accessible presentation of the 3-day programme across both specialized stages.
- Enable attendees to quickly find speakers, topics, and technical tracks using instant search and multi-criteria filters.
- Allow visitors to curate their own personalized festival agenda (My Schedule / Favorites) that persists offline in local storage.
- Clearly present logistical, travel, accessibility, and ticketing information for attending DOX Prague.
- Deliver an exemplar of modern client-side web standards: fully responsive (mobile-first), semantic HTML5, WCAG 2.0 Level AA accessibility, and zero external build runtime requirements.

### Important User Actions
1. Filter the schedule by day (Day 1, 2, 3), stage, or technical track (*Vision & Creative Tech* vs *Engineering & Core AI*).
2. Instantly search for specific speakers, technologies (e.g., "FastAPI", "Diffusion", "Rust", "Agents"), or presentation titles.
3. Add and remove sessions to/from a personal interactive agenda ("My Schedule / Favorites") stored locally in the browser.
4. Inspect detailed profiles of performers and speakers, including biographies, talk abstracts, and venue locations.
5. Review essential practical information (directions to DOX+, venue accessibility, schedule time slots, FAQ).

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
├── Programme / Schedule (programme.html)
│   ├── Interactive Day Filter Tabs (Day 1 / Day 2 / Day 3)
│   ├── Stage & Track Multi-Filters
│   ├── Dynamic Schedule List (with Add-to-Favorites triggers)
│   └── Real-time Text Search Bar
├── Performers / Speakers (performers.html)
│   ├── Speaker Directory Grid with Track Badges
│   └── Speaker Detail Modal / Dynamic View (Bio, talks, social links)
├── Stages & Venues (stages.html)
│   ├── Stage 1: Prompt & Vision Hall (DOX+)
│   └── Stage 2: Tech & Code Lab (Innovation Hub)
├── Practical Info (practical.html)
│   ├── Venue Directions & Public Transit (Nádraží Holešovice / Ortenovo náměstí)
│   ├── Accessibility & Inclusivity Guidelines (WCAG AA alignment)
│   ├── Code of Conduct
│   └── FAQ Accordion
└── My Schedule / Saved Sessions (Interactive Drawer / Favorites View)
    └── Persistent client-side list of saved sessions with total duration counter
```

### Main Navigation & Interconnections
- **Header Navigation:** Clean persistent navbar linking directly to `Home`, `Programme`, `Performers`, `Stages`, `Practical Info`, and a badge showing the count of saved favorite sessions (`⭐ My Schedule [0]`).
- **Contextual Linking:** Every performer card links directly to their corresponding programme items. Programme items link to venue/stage descriptions and detailed speaker bios.
- **Breadcrumbs:** Provided across subpages to maintain clear structural hierarchy and easy backtracking.

---

## 5. User Scenarios

### Scenario 1: Quick Search and Saving a Tech Workshop on Mobile (Key Scenario 1)
- **User Type:** ML Software Developer attending via smartphone while taking the tram.
- **Goal:** Find an engineering session on local LLM deployment and bookmark it to the personal schedule.
- **Initial Situation:** The user opens the festival website on a mobile browser (`Safari / Chrome`) and lands on the homepage.
- **Path & Expected Outcome:**
  1. The user taps the primary mobile menu or "Explore Programme" CTA.
  2. In the Programme view, the user taps the search bar and types "LLM" or selects the "Engineering & Core AI" track filter.
  3. The list updates instantly, revealing *Petra Horáková's* session: *"Local LLMs on Edge Hardware: Optimizing 7B Models for MacBook Air"*.
  4. The user taps the "⭐ Add to Schedule" button.
  5. The favorites counter increments to `1`, visual confirmation appears, and the session is saved in `localStorage`. When opening "My Schedule", the talk is prominently listed with its exact time slot.

### Scenario 2: Planning an Afternoon of Digital Art Performances (Key Scenario 2)
- **User Type:** Digital Media Artist and Prague tourist visiting on Saturday (Day 2).
- **Goal:** Discover which generative art and visual performances occur in the *Prompt & Vision Hall* on Day 2 between 14:00 and 18:00.
- **Initial Situation:** The user arrives at DOX Prague, navigates to the Programme section on mobile/laptop.
- **Path & Expected Outcome:**
  1. The user selects the **Day 2 (22 May)** tab.
  2. The user toggles the stage filter to **Prompt & Vision Hall**.
  3. The schedule chronologically displays the afternoon sessions (e.g., *Sven Erikson's* robotic sculpting and *Maya Lin-Schumacher's* generative fashion).
  4. The user clicks on the speaker name to preview their bio and visual focus, confirming the hall location in DOX+.

### Scenario 3: Checking Venue Accessibility and Transport Directions (Key Scenario 3)
- **User Type:** Visiting international student attending for the first time.
- **Goal:** Check wheelchair accessibility and the nearest public transit stop to DOX Prague.
- **Initial Situation:** The user is on the home page and needs immediate logistical info.
- **Path & Expected Outcome:**
  1. The user clicks **Practical Info** in the top navigation.
  2. The user reads the transport guidelines (Metro C to Nádraží Holešovice, Tram 6/12 to Dělnická).
  3. The user opens the "Accessibility & Facilities" accordion, verifying step-free access to both DOX+ and the Tech Lab.

---

## 6. Data Foundation Summary
- **Format:** `data.json` (also easily serializable to XML if needed).
- **Festival Scope:**
  - **Days:** 3 Days (21–23 May 2027).
  - **Venues / Stages:** 2 Distinct Stages (`stage-vision` and `stage-tech`).
  - **Performers:** Exactly 60 unique international and local speakers/creators.
  - **Programme Items:** Exactly 60 structured programme items with clean, non-conflicting time slots (10 sessions per stage per day).
- **Data Consistency:** All `performer_id` and `stage_id` references within `programme` strictly match existing records in `performers` and `stages`.