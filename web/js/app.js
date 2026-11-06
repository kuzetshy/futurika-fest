// Futurika Fest: navigation, My Schedule, and the Programme and Performers lists.
const STORAGE_KEY = 'futurika_saved_sessions_2027';
const DAY_DATES = { 1: '21 May', 2: '22 May', 3: '23 May' };
const filters = { day: 'all', stage: 'all', time: 'all' };
let searchQuery = '';
let perfTrackFilter = 'all';
let perfSearchQuery = '';

function esc(text) {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML.replace(/"/g, '&quot;');
}

function getSavedSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function setSavedSessions(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  updateBadge();
}

function updateBadge() {
  document.querySelectorAll('[data-schedule-count]').forEach(badge => {
    badge.textContent = getSavedSessions().length;
  });
}

function bySessionTime(a, b) {
  return (a.date + a.start_time + a.stage_id).localeCompare(b.date + b.start_time + b.stage_id);
}

function timeOfDay(item) {
  const hour = Number(item.start_time.slice(0, 2));
  if (hour < 12) return 'morning';
  return hour < 18 ? 'afternoon' : 'evening';
}

function timeRange(item) {
  return `<time datetime="${item.date}T${item.start_time}">${item.start_time}</time> - <time datetime="${item.date}T${item.end_time}">${item.end_time}</time>`;
}

function saveButton(item) {
  const saved = getSavedSessions().includes(item.id);
  return `<button class="btn-fav ${saved ? 'saved' : ''}" type="button" data-save="${item.id}" aria-pressed="${saved}" aria-label="Save to Schedule: ${esc(item.title)}">${saved ? '★ Saved to Schedule' : '☆ Save to Schedule'}</button>`;
}

function sessionCard(item, heading) {
  const isVision = item.stage_id === 'stage-vision';
  return `
    <article class="item-card">
      <div>
        <div class="card-top">
          <span class="time-slot"><span aria-hidden="true">📅</span> Day ${item.day} (${DAY_DATES[item.day]}) • ${timeRange(item)}</span>
          <span class="track-pill ${isVision ? 'track-vision' : 'track-tech'}">${esc(item.type)}</span>
        </div>
        <${heading} class="item-title">${esc(item.title)}</${heading}>
        <a class="speaker-btn" href="performers.html#${item.performer_id}"><span aria-hidden="true">👤</span> <strong>${esc(item.performer_name)}</strong> <span style="font-size: 0.75rem; opacity: 0.75;">(View Bio)</span></a>
        <p class="item-desc">${esc(item.description)}</p>
      </div>
      <div class="card-footer">
        <span class="stage-badge"><span aria-hidden="true">📍</span> ${esc(item.stage_name)}</span>
        ${saveButton(item)}
      </div>
    </article>`;
}

function renderHomeHighlights() {
  const grid = document.getElementById('homeHighlightsGrid');
  if (!grid) return;
  grid.innerHTML = festivalData.programme.filter(item => item.type === 'Keynote').sort(bySessionTime).map(item => sessionCard(item, 'h3')).join('');
}

function updateProgrammeUrl() {
  const params = new URLSearchParams();
  Object.keys(filters).forEach(name => {
    if (filters[name] !== 'all') params.set(name, filters[name]);
  });
  if (searchQuery) params.set('q', searchQuery);
  const query = params.toString();
  history.replaceState(null, '', location.pathname + (query ? '?' + query : ''));
}

function chip(label, name) {
  return `<span class="filter-chip">${esc(label)} <button class="chip-remove-btn" type="button" data-remove="${name}" aria-label="Remove filter: ${esc(label)}">×</button></span>`;
}

function updateActiveFiltersBar() {
  const bar = document.getElementById('activeFiltersBar');
  const chips = [];
  Object.keys(filters).forEach(name => {
    if (filters[name] === 'all') return;
    chips.push(chip(document.querySelector(`[data-filter="${name}"][data-value="${filters[name]}"]`).textContent, name));
  });
  if (searchQuery) chips.push(chip(`Search: "${searchQuery}"`, 'search'));
  document.getElementById('activeTagsContainer').innerHTML = chips.join('');
  bar.style.display = chips.length ? 'flex' : 'none';
}

function renderProgramme() {
  const grid = document.getElementById('programmeGrid');
  if (!grid) return;
  const query = searchQuery.toLowerCase();
  const sessions = festivalData.programme.filter(item => {
    const text = [item.title, item.performer_name, item.description, item.topics.join(' ')].join(' ').toLowerCase();
    return (filters.day === 'all' || String(item.day) === filters.day) &&
      (filters.stage === 'all' || item.stage_id === filters.stage) &&
      (filters.time === 'all' || timeOfDay(item) === filters.time) &&
      text.includes(query);
  }).sort(bySessionTime);

  document.querySelectorAll('[data-filter]').forEach(button => {
    const active = filters[button.dataset.filter] === button.dataset.value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  document.getElementById('clearSearchBtn').style.display = searchQuery ? 'flex' : 'none';
  document.getElementById('programmeCount').textContent = `Showing ${sessions.length} of ${festivalData.programme.length} sessions`;
  updateActiveFiltersBar();
  updateProgrammeUrl();

  grid.innerHTML = sessions.length ? sessions.map(item => sessionCard(item, 'h2')).join('') :
    '<div class="no-results"><h2 style="font-size: 1.25rem; color: #fff; margin-bottom: 6px;">No sessions found</h2><p>Try a different keyword or clear the filters.</p></div>';
}

function setupProgramme() {
  if (!document.getElementById('programmeGrid')) return;
  const input = document.getElementById('searchInput');
  const params = new URLSearchParams(location.search);
  Object.keys(filters).forEach(name => {
    if (params.has(name)) filters[name] = params.get(name);
  });
  searchQuery = params.get('q') || '';
  input.value = searchQuery;

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      filters[button.dataset.filter] = button.dataset.value;
      renderProgramme();
    });
  });
  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    renderProgramme();
  });
  document.getElementById('clearSearchBtn').addEventListener('click', () => {
    input.value = '';
    searchQuery = '';
    renderProgramme();
    input.focus();
  });
  document.getElementById('activeTagsContainer').addEventListener('click', event => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    if (button.dataset.remove === 'search') {
      input.value = '';
      searchQuery = '';
    } else {
      filters[button.dataset.remove] = 'all';
    }
    renderProgramme();
    input.focus();
  });
  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    Object.keys(filters).forEach(name => { filters[name] = 'all'; });
    input.value = '';
    searchQuery = '';
    renderProgramme();
    input.focus();
  });
  renderProgramme();
}

function performerCard(performer) {
  const isVision = performer.track === 'Vision & Creative Tech';
  const sessions = festivalData.programme.filter(item => item.performer_id === performer.id);
  const sessionDetails = sessions.map(item => `
    <h3>Session</h3>
    <p><strong>${esc(item.title)}</strong></p>
    <p>${esc(item.description)}</p>
    <p>Day ${item.day} (${DAY_DATES[item.day]}) • ${timeRange(item)} • ${esc(item.stage_name)}</p>
    ${saveButton(item)}`).join('');
  return `
    <article class="performer-card" id="${performer.id}">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div class="performer-avatar" aria-hidden="true">👤</div>
          <span class="track-pill ${isVision ? 'track-vision' : 'track-tech'}">${isVision ? 'Vision' : 'Core AI'}</span>
        </div>
        <h2 class="performer-name">${esc(performer.name)}</h2>
        <div class="performer-role">${esc(performer.role)}</div>
        <p class="performer-topic"><strong>Topic:</strong> ${esc(performer.headline_topic)}</p>
      </div>
      <details class="performer-profile">
        <summary class="btn-secondary">View Profile &amp; Talk Abstract →</summary>
        <div class="profile-body">
          <h3>Biography</h3>
          <p>${esc(performer.bio)}</p>
          ${sessionDetails}
        </div>
      </details>
    </article>`;
}

function renderPerformers() {
  const grid = document.getElementById('performersGrid');
  if (!grid) return;
  const query = perfSearchQuery.toLowerCase();
  const performers = festivalData.performers.filter(performer => {
    const text = [performer.name, performer.role, performer.headline_topic, performer.bio].join(' ').toLowerCase();
    return (perfTrackFilter === 'all' || performer.track === perfTrackFilter) && text.includes(query);
  });
  document.querySelectorAll('[data-perf-track]').forEach(button => {
    const active = button.dataset.perfTrack === perfTrackFilter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active);
  });
  document.getElementById('performerCount').textContent = `Showing ${performers.length} of ${festivalData.performers.length} performers`;
  grid.innerHTML = performers.length ? performers.map(performerCard).join('') :
    '<div class="no-results"><h2 style="font-size: 1.25rem; color: #fff; margin-bottom: 6px;">No performers found</h2><p>Try a different keyword or reset the track filter.</p></div>';
}

function openPerformerFromHash() {
  const card = location.hash && document.getElementById(location.hash.slice(1));
  if (!card) return;
  card.querySelector('details').open = true;
  card.scrollIntoView();
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
  openPerformerFromHash();
  window.addEventListener('hashchange', openPerformerFromHash);
}

function renderSchedule() {
  const list = document.getElementById('agendaList');
  if (!list) return;
  const ids = getSavedSessions();
  const sessions = festivalData.programme.filter(item => ids.includes(item.id)).sort(bySessionTime);
  document.getElementById('clearAgendaBtn').hidden = sessions.length === 0;
  document.getElementById('agendaTotalText').textContent = sessions.length ?
    `${sessions.length} session${sessions.length > 1 ? 's' : ''} saved, ${sessions.length * 45} minutes in total` : '0 sessions saved';
  if (!sessions.length) {
    list.innerHTML = '<p style="color: #9ca3af; text-align: center; padding: 30px 10px;">No sessions saved yet.<br><br><a href="programme.html">Browse the programme</a> and select <strong>☆ Save to Schedule</strong> on a session.</p>';
    return;
  }
  list.innerHTML = sessions.map(item => {
    const overlap = sessions.find(other => other.id !== item.id && other.date === item.date &&
      other.start_time < item.end_time && item.start_time < other.end_time);
    return `
      <article class="agenda-item">
        <div>
          <div class="agenda-time">Day ${item.day} • ${timeRange(item)} (${esc(item.stage_name)})</div>
          <h2 style="font-size: 0.95rem; color: #fff;">${esc(item.title)}</h2>
          <div class="agenda-name"><span aria-hidden="true">👤</span> ${esc(item.performer_name)}</div>
        </div>
        <button class="btn-fav saved" type="button" data-remove-session="${item.id}" aria-label="Remove from schedule: ${esc(item.title)}">Remove</button>
        ${overlap ? `<p class="agenda-warning">Overlaps with: ${esc(overlap.title)}</p>` : ''}
      </article>`;
  }).join('');
}

function setupSchedule() {
  const list = document.getElementById('agendaList');
  if (!list) return;
  const clearButton = document.getElementById('clearAgendaBtn');
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-session]');
    if (!button) return;
    setSavedSessions(getSavedSessions().filter(id => id !== button.dataset.removeSession));
    renderSchedule();
    document.querySelector('.section-header h1').focus();
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
  document.querySelector('.section-header h1').tabIndex = -1;
  renderSchedule();
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const open = button.parentElement.classList.toggle('open');
      button.setAttribute('aria-expanded', open);
      button.querySelector('span:last-child').textContent = open ? '▲' : '▼';
    });
  });

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-save]');
    if (!button) return;
    const id = button.dataset.save;
    const saved = getSavedSessions();
    setSavedSessions(saved.includes(id) ? saved.filter(item => item !== id) : saved.concat(id));
    const isSaved = getSavedSessions().includes(id);
    document.querySelectorAll(`[data-save="${id}"]`).forEach(match => {
      match.classList.toggle('saved', isSaved);
      match.setAttribute('aria-pressed', isSaved);
      match.textContent = isSaved ? '★ Saved to Schedule' : '☆ Save to Schedule';
    });
  });

  updateBadge();
  renderHomeHighlights();
  setupProgramme();
  setupPerformers();
  setupSchedule();
});
