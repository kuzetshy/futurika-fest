// Futurika Fest: navigation, site search, My Schedule, and the Programme and Performers lists.
const STORAGE_KEY = 'futurika_saved_sessions_2027';
const DAY_DATES = { 1: '21 May', 2: '22 May', 3: '23 May' };
const DAY_NAMES = { 1: 'Friday', 2: 'Saturday', 3: 'Sunday' };
const ROOT = document.documentElement.dataset.root || '';
const filters = { day: 'all', stage: 'all', time: 'all', type: 'all', topic: 'all' };
const SELECT_FILTERS = { type: 'Type', topic: 'Topic' };
let searchQuery = '';
let perfTrackFilter = 'all';
let perfSearchQuery = '';

// Practical content that is not stored in data.json, so that site search can find it.
const SITE_PAGES = [
  { title: 'Tickets', url: 'practical.html#tickets', summary: '3-Day Pass, Day Pass and Student 3-Day Pass prices.', keywords: 'tickets passes prices cost buy day pass student czk' },
  { title: 'Location & Directions', url: 'practical.html#directions', summary: 'DOX Prague, Poupětova 1. Metro C to Nádraží Holešovice, tram 6 and 12 to Ortenovo náměstí.', keywords: 'address location directions getting there transport public transit metro tram prague' },
  { title: 'Accessibility & Inclusivity', url: 'practical.html#accessibility', summary: 'Step-free entrances, elevator to Floor 2, accessible restrooms and a hearing loop.', keywords: 'accessibility wheelchair step-free elevator lift restrooms toilets hearing loop' },
  { title: 'Code of Conduct', url: 'practical.html#conduct', summary: 'Respect for everyone, and where to go if you feel unsafe.', keywords: 'code of conduct rules respect harassment safety' },
  { title: 'Frequently Asked Questions', url: 'practical.html#faq', summary: 'Passes on mobile, My Schedule, power outlets and recordings.', keywords: 'faq questions print pass qr code recording power outlets laptop' },
  { title: 'My Schedule', url: 'my-schedule.html', summary: 'Your saved sessions, sorted by time, with overlap warnings.', keywords: 'my schedule saved sessions personal plan' }
];

function esc(text) {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML.replace(/"/g, '&quot;');
}

function normalize(text) {
  return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function matchesQuery(text, query) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const haystack = normalize(text);
  return words.every(word => haystack.includes(word));
}

function getSavedSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function setSavedSessions(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    // Storage can be blocked; the page keeps working without saving.
  }
  updateBadge();
}

function updateBadge() {
  document.querySelectorAll('[data-schedule-count]').forEach(badge => {
    badge.textContent = getSavedSessions().length;
  });
}

function findSession(id) {
  return festivalData.programme.find(item => item.id === id);
}

function findPerformer(id) {
  return festivalData.performers.find(performer => performer.id === id);
}

function performerUrl(performerId) {
  return `${ROOT}performers/${findPerformer(performerId).slug}.html`;
}

// Prompt & Vision Hall comes first everywhere, matching the column order of the programme timetable.
const STAGE_ORDER = { 'stage-vision': 0, 'stage-tech': 1 };

function bySessionTime(a, b) {
  return (a.date + a.start_time).localeCompare(b.date + b.start_time) || STAGE_ORDER[a.stage_id] - STAGE_ORDER[b.stage_id];
}

function overlaps(a, b) {
  return a.id !== b.id && a.date === b.date && a.start_time < b.end_time && b.start_time < a.end_time;
}

function timeOfDay(item) {
  const hour = Number(item.start_time.slice(0, 2));
  if (hour < 12) return 'morning';
  return hour < 18 ? 'afternoon' : 'evening';
}

function timeRange(item) {
  return `<time datetime="${item.date}T${item.start_time}">${item.start_time}</time>–<time datetime="${item.date}T${item.end_time}">${item.end_time}</time>`;
}

// Clash information is shown on every session card, so overlaps are visible before the user opens My Schedule.
function clashText(item) {
  const savedIds = getSavedSessions();
  const clashes = savedIds.map(findSession).filter(other => other && overlaps(item, other));
  if (!clashes.length) return '';
  const names = clashes.map(other => `${other.title} (${other.stage_name}, ${other.start_time})`).join('; ');
  return savedIds.includes(item.id) ? `Overlaps with another saved session: ${names}` : `Same time as your saved session: ${names}`;
}

function clashNote(item) {
  const text = clashText(item);
  return `<p class="clash-note" data-clash-for="${item.id}"${text ? '' : ' hidden'}>${esc(text)}</p>`;
}

function saveLabel(saved) {
  return saved ? 'Saved to Schedule' : 'Save to Schedule';
}

function saveButton(item) {
  const saved = getSavedSessions().includes(item.id);
  return `<button class="btn-fav${saved ? ' saved' : ''}" type="button" data-save="${item.id}" aria-pressed="${saved}" aria-label="Save to Schedule: ${esc(item.title)}">${saveLabel(saved)}</button>`;
}

function sessionCard(item, options = {}) {
  const heading = options.heading || 'h3';
  const inTimetable = options.inTimetable === true;
  const stageClass = item.stage_id === 'stage-vision' ? 'vision' : 'tech';
  return `
    <article class="item-card stage-col-${stageClass}" id="${item.id}">
      <div>
        <div class="card-top">
          ${inTimetable ? '' : `<p class="time-slot">Day ${item.day} (${DAY_DATES[item.day]}) · ${timeRange(item)}</p>`}
          <span class="track-pill track-${stageClass}">${esc(item.type)}</span>
        </div>
        <${heading} class="item-title">${esc(item.title)}</${heading}>
        <p class="item-performer"><a class="speaker-btn" href="${performerUrl(item.performer_id)}">${esc(item.performer_name)}</a></p>
        <p class="item-desc">${esc(item.description)}</p>
        <p class="session-meta">${esc(item.level)} · ${esc(item.topics.join(', '))}</p>
      </div>
      ${clashNote(item)}
      <div class="card-footer">
        <a class="stage-badge" href="${ROOT}stages.html#${item.stage_id}">${esc(item.stage_name)}</a>
        ${saveButton(item)}
      </div>
    </article>`;
}

function refreshSaveState() {
  const savedIds = getSavedSessions();
  document.querySelectorAll('[data-save]').forEach(button => {
    const saved = savedIds.includes(button.dataset.save);
    button.classList.toggle('saved', saved);
    button.setAttribute('aria-pressed', saved);
    button.textContent = saveLabel(saved);
  });
  document.querySelectorAll('[data-clash-for]').forEach(note => {
    const text = clashText(findSession(note.dataset.clashFor));
    note.textContent = text;
    note.hidden = !text;
  });
}

function announce(message) {
  let status = document.getElementById('saveStatus');
  if (!status) {
    status = document.createElement('p');
    status.id = 'saveStatus';
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    document.body.appendChild(status);
  }
  status.textContent = message;
}

function toggleSaved(id) {
  const saved = getSavedSessions();
  const nowSaved = !saved.includes(id);
  setSavedSessions(nowSaved ? saved.concat(id) : saved.filter(item => item !== id));
  refreshSaveState();
  const item = findSession(id);
  const clash = nowSaved ? clashText(item) : '';
  announce(nowSaved ? `Saved to My Schedule: ${item.title}.${clash ? ' ' + clash + '.' : ''}` : `Removed from My Schedule: ${item.title}.`);
}

function renderHomeHighlights() {
  const grid = document.getElementById('homeHighlightsGrid');
  if (!grid) return;
  grid.innerHTML = festivalData.programme.filter(item => item.type === 'Keynote').sort(bySessionTime).map(item => sessionCard(item)).join('');
}

/* Programme */

function updateProgrammeUrl() {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(name => {
    if (filters[name] !== 'all') params.set(name, filters[name]);
  });
  if (searchQuery) params.set('q', searchQuery);
  const query = params.toString();
  history.replaceState(null, '', location.pathname + (query ? '?' + query : ''));
}

function filterLabel(name) {
  if (SELECT_FILTERS[name]) {
    const option = document.querySelector(`[data-filter-select="${name}"] option[value="${CSS.escape(filters[name])}"]`);
    return `${SELECT_FILTERS[name]}: ${option.textContent}`;
  }
  return document.querySelector(`[data-filter="${name}"][data-value="${CSS.escape(filters[name])}"]`).textContent;
}

function isValidFilter(name, value) {
  if (value === 'all') return true;
  if (SELECT_FILTERS[name]) return !!document.querySelector(`[data-filter-select="${name}"] option[value="${CSS.escape(value)}"]`);
  return !!document.querySelector(`[data-filter="${name}"][data-value="${CSS.escape(value)}"]`);
}

function chip(label, name) {
  return `<span class="filter-chip">${esc(label)} <button class="chip-remove-btn" type="button" data-remove="${name}" aria-label="Remove filter: ${esc(label)}">×</button></span>`;
}

function updateActiveFiltersBar() {
  const chips = [];
  Object.keys(filters).forEach(name => {
    if (filters[name] !== 'all') chips.push(chip(filterLabel(name), name));
  });
  if (searchQuery) chips.push(chip(`Search: "${searchQuery}"`, 'search'));
  document.getElementById('activeTagsContainer').innerHTML = chips.join('');
  document.getElementById('activeFiltersBar').hidden = chips.length === 0;
}

function programmeDay(day, sessions) {
  const slots = [];
  sessions.forEach(item => {
    const last = slots[slots.length - 1];
    if (last && last[0].start_time === item.start_time) last.push(item);
    else slots.push([item]);
  });
  const singleStage = filters.stage !== 'all';
  const date = sessions[0].date;
  return `
    <section class="day-block${singleStage ? ' single-stage' : ''}" aria-labelledby="day-${day}-title">
      <h2 class="day-title" id="day-${day}-title">Day ${day} <span class="day-date">${DAY_NAMES[day]}, <time datetime="${date}">${DAY_DATES[day]} 2027</time></span></h2>
      ${singleStage ? '' : '<div class="stage-heads" aria-hidden="true"><span>Time</span><span>Prompt &amp; Vision Hall</span><span>Tech &amp; Code Lab</span></div>'}
      <ol class="slot-list">
        ${slots.map(slot => `
        <li class="slot">
          <p class="slot-time">${timeRange(slot[0])}</p>
          ${slot.map(item => sessionCard(item, { inTimetable: true })).join('')}
        </li>`).join('')}
      </ol>
    </section>`;
}

function renderProgramme() {
  const grid = document.getElementById('programmeGrid');
  if (!grid) return;
  const sessions = festivalData.programme.filter(item => {
    const text = [item.title, item.performer_name, item.description, item.type, item.topics.join(' ')].join(' ');
    return (filters.day === 'all' || String(item.day) === filters.day) &&
      (filters.stage === 'all' || item.stage_id === filters.stage) &&
      (filters.time === 'all' || timeOfDay(item) === filters.time) &&
      (filters.type === 'all' || item.type === filters.type) &&
      (filters.topic === 'all' || item.topics.includes(filters.topic)) &&
      matchesQuery(text, searchQuery);
  }).sort(bySessionTime);

  document.querySelectorAll('[data-filter]').forEach(button => {
    const active = filters[button.dataset.filter] === button.dataset.value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  document.querySelectorAll('[data-filter-select]').forEach(select => {
    select.value = filters[select.dataset.filterSelect];
  });
  document.getElementById('clearSearchBtn').hidden = !searchQuery;
  document.getElementById('programmeCount').textContent = `Showing ${sessions.length} of ${festivalData.programme.length} sessions`;
  updateActiveFiltersBar();
  updateProgrammeUrl();

  if (!sessions.length) {
    grid.innerHTML = '<div class="no-results"><h2>No sessions found</h2><p>Try a different keyword or clear the filters.</p></div>';
    return;
  }
  grid.innerHTML = [1, 2, 3].map(day => {
    const daySessions = sessions.filter(item => item.day === day);
    return daySessions.length ? programmeDay(day, daySessions) : '';
  }).join('');
}

function fillSelect(name, values) {
  const select = document.querySelector(`[data-filter-select="${name}"]`);
  values.forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function setupProgramme() {
  if (!document.getElementById('programmeGrid')) return;
  const input = document.getElementById('searchInput');
  fillSelect('type', [...new Set(festivalData.programme.map(item => item.type))].sort());
  fillSelect('topic', [...new Set(festivalData.programme.flatMap(item => item.topics))].sort());

  const params = new URLSearchParams(location.search);
  Object.keys(filters).forEach(name => {
    if (params.has(name) && isValidFilter(name, params.get(name))) filters[name] = params.get(name);
  });
  searchQuery = (params.get('q') || '').trim();
  input.value = searchQuery;

  const clearSearch = () => {
    input.value = '';
    searchQuery = '';
  };
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      filters[button.dataset.filter] = button.dataset.value;
      renderProgramme();
    });
  });
  document.querySelectorAll('[data-filter-select]').forEach(select => {
    select.addEventListener('change', () => {
      filters[select.dataset.filterSelect] = select.value;
      renderProgramme();
    });
  });
  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    renderProgramme();
  });
  document.getElementById('clearSearchBtn').addEventListener('click', () => {
    clearSearch();
    renderProgramme();
    input.focus();
  });
  document.getElementById('activeTagsContainer').addEventListener('click', event => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    if (button.dataset.remove === 'search') clearSearch();
    else filters[button.dataset.remove] = 'all';
    renderProgramme();
    input.focus();
  });
  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    Object.keys(filters).forEach(name => { filters[name] = 'all'; });
    clearSearch();
    renderProgramme();
    input.focus();
  });
  renderProgramme();
}

/* Performers */

function performerCard(performer, heading = 'h2') {
  const isVision = performer.track === 'Vision & Creative Tech';
  return `
    <article class="performer-card">
      <div>
        <div class="performer-top">
          <span class="track-pill ${isVision ? 'track-vision' : 'track-tech'}">${isVision ? 'Vision' : 'Core AI'}</span>
          <span class="performer-country">${esc(performer.country)}</span>
        </div>
        <${heading} class="performer-name">${esc(performer.name)}</${heading}>
        <p class="performer-role">${esc(performer.role)}</p>
        <p class="performer-topic"><strong>Session:</strong> ${esc(performer.headline_topic)}</p>
      </div>
      <a class="btn-secondary" href="${ROOT}performers/${performer.slug}.html">View profile<span class="visually-hidden">: ${esc(performer.name)}</span></a>
    </article>`;
}

function renderPerformers() {
  const grid = document.getElementById('performersGrid');
  if (!grid) return;
  const performers = festivalData.performers.filter(performer => {
    const text = [performer.name, performer.role, performer.country, performer.headline_topic, performer.bio].join(' ');
    return (perfTrackFilter === 'all' || performer.track === perfTrackFilter) && matchesQuery(text, perfSearchQuery);
  });
  document.querySelectorAll('[data-perf-track]').forEach(button => {
    const active = button.dataset.perfTrack === perfTrackFilter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  document.getElementById('performerCount').textContent = `Showing ${performers.length} of ${festivalData.performers.length} performers`;
  grid.innerHTML = performers.length ? performers.map(performer => performerCard(performer)).join('') :
    '<div class="no-results"><h2>No performers found</h2><p>Try a different keyword or reset the track filter.</p></div>';
}

function setupPerformers() {
  if (!document.getElementById('performersGrid')) return;
  document.querySelectorAll('[data-perf-track]').forEach(button => {
    button.addEventListener('click', () => {
      perfTrackFilter = button.dataset.perfTrack;
      renderPerformers();
    });
  });
  document.getElementById('searchPerformerInput').addEventListener('input', event => {
    perfSearchQuery = event.target.value.trim();
    renderPerformers();
  });
  renderPerformers();
}

/* Site search */

function renderSearch(query) {
  const results = document.getElementById('searchResults');
  const status = document.getElementById('searchStatus');
  if (!query) {
    status.textContent = 'Enter a word to search sessions, performers, stages and visitor information.';
    results.innerHTML = '';
    document.getElementById('searchSuggestions').hidden = false;
    return;
  }
  document.getElementById('searchSuggestions').hidden = true;
  const sessions = festivalData.programme.filter(item =>
    matchesQuery([item.title, item.performer_name, item.description, item.type, item.level, item.topics.join(' '), item.stage_name].join(' '), query)).sort(bySessionTime);
  const performers = festivalData.performers.filter(performer =>
    matchesQuery([performer.name, performer.role, performer.country, performer.track, performer.headline_topic, performer.bio].join(' '), query));
  const stages = festivalData.stages.filter(stage => matchesQuery([stage.name, stage.type, stage.location].join(' '), query));
  const pages = SITE_PAGES.filter(page => matchesQuery([page.title, page.summary, page.keywords].join(' '), query));
  const total = sessions.length + performers.length + stages.length + pages.length;

  status.textContent = `${total} result${total === 1 ? '' : 's'} for "${query}"`;
  const group = (title, id, items, html) => items.length ? `
    <section class="search-group" aria-labelledby="${id}">
      <h2 id="${id}">${title} <span class="search-count">(${items.length})</span></h2>
      <div class="grid-container">${items.map(html).join('')}</div>
    </section>` : '';
  const linkCard = (title, url, text) => `
    <article class="info-box search-link-card">
      <h3><a href="${url}">${esc(title)}</a></h3>
      <p>${esc(text)}</p>
    </article>`;

  results.innerHTML = total ? [
    group('Sessions', 'results-sessions', sessions, item => sessionCard(item)),
    group('Performers', 'results-performers', performers, performer => performerCard(performer, 'h3')),
    group('Stages', 'results-stages', stages, stage => linkCard(stage.name, `stages.html#${stage.id}`, `${stage.location}. ${stage.type}.`)),
    group('Visitor information', 'results-pages', pages, page => linkCard(page.title, page.url, page.summary))
  ].join('') : '<div class="no-results"><h2>No results found</h2><p>Check the spelling, try a shorter word, or browse the <a href="programme.html">programme</a>.</p></div>';
}

function setupSearch() {
  const input = document.getElementById('searchPageInput');
  if (!input) return;
  const query = (new URLSearchParams(location.search).get('q') || '').trim();
  input.value = query;
  input.addEventListener('input', () => {
    const value = input.value.trim();
    history.replaceState(null, '', location.pathname + (value ? '?q=' + encodeURIComponent(value) : ''));
    renderSearch(value);
  });
  renderSearch(query);
}

/* My Schedule */

function renderSchedule() {
  const list = document.getElementById('agendaList');
  if (!list) return;
  const ids = getSavedSessions();
  const sessions = festivalData.programme.filter(item => ids.includes(item.id)).sort(bySessionTime);
  document.getElementById('clearAgendaBtn').hidden = sessions.length === 0;
  document.getElementById('agendaTotalText').textContent = sessions.length ?
    `${sessions.length} session${sessions.length > 1 ? 's' : ''} saved, ${sessions.length * 45} minutes in total` : '0 sessions saved';
  if (!sessions.length) {
    list.innerHTML = '<p class="agenda-empty">No sessions saved yet.<br><br><a href="programme.html">Browse the programme</a> and select <strong>Save to Schedule</strong> on a session.</p>';
    return;
  }
  list.innerHTML = sessions.map(item => {
    const clashes = sessions.filter(other => overlaps(item, other));
    return `
      <article class="agenda-item">
        <div>
          <p class="agenda-time">Day ${item.day} · ${timeRange(item)} (${esc(item.stage_name)})</p>
          <h2 class="agenda-title">${esc(item.title)}</h2>
          <p class="agenda-name"><a href="${performerUrl(item.performer_id)}">${esc(item.performer_name)}</a></p>
        </div>
        <button class="btn-fav saved" type="button" data-remove-session="${item.id}" aria-label="Remove from schedule: ${esc(item.title)}">Remove</button>
        ${clashes.length ? `<p class="agenda-warning">Overlaps with: ${esc(clashes.map(other => other.title).join('; '))}</p>` : ''}
      </article>`;
  }).join('');
}

function setupSchedule() {
  const list = document.getElementById('agendaList');
  if (!list) return;
  const clearButton = document.getElementById('clearAgendaBtn');
  const heading = document.querySelector('.section-header h1');
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-session]');
    if (!button) return;
    setSavedSessions(getSavedSessions().filter(id => id !== button.dataset.removeSession));
    renderSchedule();
    heading.focus();
  });
  clearButton.addEventListener('click', () => {
    if (clearButton.dataset.confirm === 'true') {
      setSavedSessions([]);
      clearButton.dataset.confirm = 'false';
      clearButton.textContent = 'Clear All';
      renderSchedule();
      return;
    }
    clearButton.dataset.confirm = 'true';
    clearButton.textContent = 'Select again to confirm';
  });
  heading.tabIndex = -1;
  renderSchedule();
}

/* Shared */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileMenuToggle');
  const header = document.querySelector('header');
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const open = button.parentElement.classList.toggle('open');
      button.setAttribute('aria-expanded', open);
      button.querySelector('.faq-sign').textContent = open ? '−' : '+';
    });
  });

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-save]');
    if (button) toggleSaved(button.dataset.save);
  });

  updateBadge();
  renderHomeHighlights();
  setupProgramme();
  setupPerformers();
  setupSearch();
  setupSchedule();
  refreshSaveState();
});
